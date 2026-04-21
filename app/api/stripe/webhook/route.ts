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

        console.log('=== Checkout Session Completed ===');
        console.log('Full session object:', JSON.stringify(session, null, 2));
        console.log('Session metadata:', JSON.stringify(session.metadata));
        console.log('Checkout completed - userId:', userId, 'plan:', plan);
        console.log('Session customer:', session.customer);
        console.log('Session payment_status:', session.payment_status);

        if (userId && plan) {
          console.log('Updating user profile for user:', userId);
          console.log('Setting subscription_plan:', plan, 'subscription_status: lifetime');

          const { data: existingProfile } = await supabase
            .from('user_profiles')
            .select('id, subscription_plan, subscription_status')
            .eq('id', userId)
            .single();

          console.log('Existing profile check:', existingProfile ? JSON.stringify(existingProfile) : 'NOT FOUND');

          // Always update the profile - set subscription fields
          console.log('Updating profile with:', {
            subscription_plan: plan,
            subscription_status: 'lifetime',
            stripe_customer_id: session.customer
          });

          const { data, error } = await supabase
            .from('user_profiles')
            .update({
              subscription_plan: plan,
              subscription_status: 'lifetime',
              stripe_customer_id: session.customer as string,
              current_period_end: null,
              cancel_at: null,
            })
            .eq('id', userId)
            .select();

          if (error) {
            console.error('Error updating user profile:', error);
            console.error('Error details:', JSON.stringify(error));
          } else {
            console.log('User profile updated successfully:', JSON.stringify(data));
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
