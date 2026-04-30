import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { stripe, STRIPE_PRICES } from '@/lib/stripe';
import { createClient } from '@/lib/supabase';

// Handle GET request (redirect from auth callback)
export async function GET(request: NextRequest) {
  console.log('=== GET /api/stripe/create-checkout START ===');
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('User agent:', request.headers.get('user-agent'));
  console.log('Cookies:', request.cookies.getAll());

  try {
    const cookieStore = await cookies();

    console.log('Creating Supabase server client...');

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore errors from Server Components
            }
          },
        },
      }
    );

    console.log('Getting user from session...');
    const { data: { user } } = await supabase.auth.getUser();

    console.log('User from session:', user ? user.id : 'NONE');

    if (!user) {
      console.log('No user found, redirecting to login');
      return NextResponse.redirect(new URL('/login?message=Please log in to continue', request.url));
    }

    const plan = request.nextUrl.searchParams.get('plan');
    const discountCode = request.nextUrl.searchParams.get('code');
    console.log('Plan from URL:', plan, 'Discount code:', discountCode);

    if (!plan || !['2month', '6month', 'lifetime'].includes(plan)) {
      return NextResponse.redirect(new URL('/signup?plan=6month&error=Invalid plan', request.url));
    }

    const priceId = plan === '2month' ? STRIPE_PRICES['2month'] : plan === '6month' ? STRIPE_PRICES['6month'] : STRIPE_PRICES.lifetime;

    if (!priceId) {
      console.error('Missing price ID for plan:', plan, 'Available:', {
        '2month': STRIPE_PRICES['2month'] ? 'SET' : 'UNSET',
        '6month': STRIPE_PRICES['6month'] ? 'SET' : 'UNSET',
        lifetime: STRIPE_PRICES.lifetime ? 'SET' : 'UNSET',
      });
      return NextResponse.redirect(new URL('/signup?plan=6month&error=Price not configured', request.url));
    }

    console.log('Creating checkout for plan:', plan, 'priceId:', priceId);

    // Check if user already has a Stripe customer ID
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_customer_id, id')
      .eq('id', user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    // Create Stripe customer if not exists
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;

      // Save customer ID to profile, creating if necessary
      if (!profile) {
        console.log('No profile exists, creating one with customer ID');
        await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email,
            stripe_customer_id: customerId,
            subscription_plan: 'free',
            subscription_status: null
          });
      } else {
        await supabase
          .from('user_profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', user.id);
      }
    }

    const origin = request.headers.get('origin') || request.nextUrl.origin;

    console.log('Creating checkout for plan:', plan, 'priceId:', priceId);

    // Validate discount code if provided
    let validatedDiscountCode: string | undefined;
    if (discountCode) {
      try {
        const coupon = await stripe.coupons.retrieve(discountCode);
        if (coupon) {
          validatedDiscountCode = discountCode;
          console.log('Discount code validated:', discountCode);
        }
      } catch (e) {
        console.log('Invalid coupon code:', discountCode);
      }
    }

    // Build line items with optional discount
    const lineItems: any[] = [{
      price: priceId,
      quantity: 1,
    }];
    if (validatedDiscountCode) {
      lineItems[0].discount = { coupon: validatedDiscountCode };
    }

    // Create Stripe Checkout Session for one-time payment
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card', 'klarna'],
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        supabase_user_id: user.id,
        plan: plan,
      },
    });

    console.log('Checkout session created:', session.id);

    if (session.url) {
      return NextResponse.redirect(session.url);
    }

    return NextResponse.redirect(new URL('/signup?plan=6month&error=Failed to create checkout', request.url));
  } catch (error) {
    const stripeError = error as any;
    console.error('Stripe checkout error:', stripeError?.message);
    console.error('Stripe error type:', stripeError?.type);
    console.error('Stripe error code:', stripeError?.code);
    console.error('Stripe error param:', stripeError?.param);
    console.error('Full error object:', JSON.stringify(stripeError, null, 2));
    return NextResponse.redirect(new URL('/signup?plan=6month&error=Checkout failed', request.url));
  }
}

// Handle POST request (from frontend)
export async function POST(request: NextRequest) {
  try {
    const { plan, userId, email, discountCode } = await request.json();

    console.log('POST /api/stripe/create-checkout - plan:', plan, 'userId:', userId, 'email:', email, 'discountCode:', discountCode);

    // Validate inputs
    if (!plan || !['2month', '6month', 'lifetime'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      );
    }

    const priceId = plan === '2month' ? STRIPE_PRICES['2month'] : plan === '6month' ? STRIPE_PRICES['6month'] : STRIPE_PRICES.lifetime;

    console.log('Price ID for', plan, ':', priceId);

    if (!priceId) {
      console.error('Missing price ID for plan:', plan, 'Available:', {
        '2month': STRIPE_PRICES['2month'] ? 'SET' : 'UNSET',
        '6month': STRIPE_PRICES['6month'] ? 'SET' : 'UNSET',
        lifetime: STRIPE_PRICES.lifetime ? 'SET' : 'UNSET',
      });
      return NextResponse.json(
        { error: 'Price not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const supabase = createClient();

    // Check if user already has a Stripe customer ID
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_customer_id, id')
      .eq('id', userId)
      .single();

    console.log('Profile stripe_customer_id:', profile?.stripe_customer_id);

    let customerId = profile?.stripe_customer_id;

    // Create Stripe customer if not exists
    if (!customerId) {
      console.log('Creating new Stripe customer for:', email);
      const customer = await stripe.customers.create({
        email: email,
        metadata: {
          supabase_user_id: userId,
        },
      });
      customerId = customer.id;
      console.log('New Stripe customer created:', customerId);

      // Save customer ID to profile, creating if necessary
      if (!profile) {
        console.log('No profile exists, creating one with customer ID');
        await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            email: email,
            stripe_customer_id: customerId,
            subscription_plan: 'free',
            subscription_status: null
          });
      } else {
        await supabase
          .from('user_profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', userId);
      }
      console.log('Customer ID saved to profile');
    }

    const origin = request.headers.get('origin') || request.nextUrl.origin;

    console.log('Creating checkout session for customer:', customerId, 'with price:', priceId);
    console.log('Success URL:', `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
    console.log('Cancel URL:', `${origin}/checkout/cancel`);

    // Validate discount code if provided
    let validatedDiscountCode: string | undefined;
    if (discountCode) {
      try {
        const coupon = await stripe.coupons.retrieve(discountCode);
        if (coupon) {
          validatedDiscountCode = discountCode;
          console.log('Discount code validated:', discountCode);
        }
      } catch (e) {
        console.log('Invalid coupon code:', discountCode);
      }
    }

    // Build line items with optional discount
    const lineItems: any[] = [{
      price: priceId,
      quantity: 1,
    }];
    if (validatedDiscountCode) {
      lineItems[0].discount = { coupon: validatedDiscountCode };
    }

    // Create Stripe Checkout Session for one-time payment
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card', 'klarna'],
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        supabase_user_id: userId,
        plan: plan,
      },
    });

    console.log('Checkout session created:', session.id, 'url:', session.url);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const stripeError = error as any;
    console.error('Stripe checkout error:', stripeError?.message);
    console.error('Stripe error type:', stripeError?.type);
    console.error('Stripe error code:', stripeError?.code);
    console.error('Stripe error param:', stripeError?.param);
    console.error('Stripe error response:', stripeError?.response);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: stripeError?.message },
      { status: 500 }
    );
  }
}
