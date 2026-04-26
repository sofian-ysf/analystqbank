import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  console.log('=== Stripe Webhook START ===');
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    console.log('Webhook event type:', event.type);

    const supabase = createAdminClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const plan = session.metadata?.plan;
        const customerId = session.customer as string;

        console.log('=== Checkout Session Completed ===');
        console.log('Full session object:', JSON.stringify(session, null, 2));
        console.log('Session metadata:', JSON.stringify(session.metadata));
        console.log('Checkout completed - userId:', userId, 'plan:', plan);
        console.log('Session customer:', session.customer);
        console.log('Session payment_status:', session.payment_status);

        if (userId && plan) {
          console.log('Updating user profile for user:', userId);

          // Build the update object explicitly
          const updateData = {
            subscription_plan: plan,
            subscription_status: 'lifetime',
            stripe_customer_id: customerId,
            current_period_end: null,
            cancel_at: null,
          };

          console.log('Update data:', JSON.stringify(updateData));

          // First try updating by user ID
          let { data, error } = await supabase
            .from('user_profiles')
            .update(updateData)
            .eq('id', userId)
            .select();

          // If no rows updated, try finding by email (in case user_id doesn't match)
          if ((!data || data.length === 0) && session.customer_details?.email) {
            console.log('No profile found by userId, trying email lookup...');
            const { data: profileByEmail } = await supabase
              .from('user_profiles')
              .select('id')
              .eq('email', session.customer_details.email)
              .single();

            if (profileByEmail) {
              console.log('Found profile by email:', profileByEmail.id);
              const result = await supabase
                .from('user_profiles')
                .update(updateData)
                .eq('id', profileByEmail.id)
                .select();
              data = result.data;
              error = result.error;
            }
          }

          // If still no match, try by stripe_customer_id
          if ((!data || data.length === 0) && customerId) {
            console.log('No profile found by email, trying stripe_customer_id lookup...');
            const { data: profileByStripe } = await supabase
              .from('user_profiles')
              .select('id')
              .eq('stripe_customer_id', customerId)
              .single();

            if (profileByStripe) {
              console.log('Found profile by stripe_customer_id:', profileByStripe.id);
              const result = await supabase
                .from('user_profiles')
                .update(updateData)
                .eq('id', profileByStripe.id)
                .select();
              data = result.data;
              error = result.error;
            }
          }

          // If profile still doesn't exist, create it
          if ((!data || data.length === 0)) {
            console.log('No existing profile found - creating new profile for user:', userId);
            const { data: newProfile, error: createError } = await supabase
              .from('user_profiles')
              .insert({
                id: userId,
                email: session.customer_details?.email || '',
                full_name: session.customer_details?.name || '',
                subscription_plan: plan,
                subscription_status: 'lifetime',
                stripe_customer_id: customerId,
              })
              .select();

            if (createError) {
              console.error('Error creating user profile:', createError.message);
            } else {
              console.log('=== NEW PROFILE CREATED ===');
              console.log('New profile:', JSON.stringify(newProfile?.[0]));
              data = newProfile;
              error = createError;
            }
          }

          if (error) {
            console.error('Error updating user profile:', error.message);
            console.error('Error code:', error.code);
            console.error('Error details:', JSON.stringify(error));
          } else if (data && data.length > 0) {
            console.log('=== PROFILE UPDATE SUCCESS ===');
            console.log('Updated profile:', JSON.stringify(data[0]));
            console.log('subscription_plan:', data[0].subscription_plan);
            console.log('subscription_status:', data[0].subscription_status);
            console.log('stripe_customer_id:', data[0].stripe_customer_id);
          } else {
            console.error('No data returned from update - profile may not exist');
            console.error('Searched for userId:', userId);
            console.error('Searched for email:', session.customer_details?.email);
          }

          console.log(`Lifetime access activated for user ${userId}: ${plan}`);
        } else {
          console.log('Missing userId or plan in session metadata!');
        }
        break;
      }

      // Keep these handlers in case of refunds or disputes
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const customerId = charge.customer as string;

        if (customerId) {
          // Get user by Stripe customer ID
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single();

          if (profile) {
            // Downgrade to free on refund
            await supabase
              .from('user_profiles')
              .update({
                subscription_plan: 'free',
                subscription_status: 'refunded',
              })
              .eq('id', profile.id);

            console.log(`Access revoked for user ${profile.id} due to refund`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
