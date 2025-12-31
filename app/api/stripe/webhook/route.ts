import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
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

    const supabase = createAdminClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const plan = session.metadata?.plan;

        if (userId && plan) {
          // Get subscription details to get the current period end
          let currentPeriodEnd = null;
          if (session.subscription) {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string, {
              expand: ['items.data'],
            });
            // In Stripe SDK v20, current_period_end is on subscription items
            const firstItem = subscription.items?.data?.[0];
            if (firstItem?.current_period_end) {
              currentPeriodEnd = new Date(firstItem.current_period_end * 1000).toISOString();
            }
          }

          await supabase
            .from('user_profiles')
            .update({
              subscription_plan: plan,
              subscription_status: 'active',
              stripe_customer_id: session.customer as string,
              current_period_end: currentPeriodEnd,
              cancel_at: null,
            })
            .eq('id', userId);

          console.log(`Subscription activated for user ${userId}: ${plan}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get user by Stripe customer ID
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          const status = subscription.status;
          let subscriptionStatus = 'active';

          if (status === 'past_due' || status === 'unpaid') {
            subscriptionStatus = 'past_due';
          } else if (status === 'canceled' || status === 'incomplete_expired') {
            subscriptionStatus = 'canceled';
          } else if (status === 'trialing') {
            subscriptionStatus = 'trialing';
          }

          // Get period end and cancel_at dates
          // In Stripe SDK v20, current_period_end is on subscription items
          const firstItem = subscription.items?.data?.[0];
          const currentPeriodEnd = firstItem?.current_period_end
            ? new Date(firstItem.current_period_end * 1000).toISOString()
            : null;
          const cancelAt = subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000).toISOString()
            : null;

          await supabase
            .from('user_profiles')
            .update({
              subscription_status: subscriptionStatus,
              current_period_end: currentPeriodEnd,
              cancel_at: cancelAt,
            })
            .eq('id', profile.id);

          console.log(`Subscription updated for user ${profile.id}: ${subscriptionStatus}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get user by Stripe customer ID
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          // Downgrade to trial/expired
          await supabase
            .from('user_profiles')
            .update({
              subscription_plan: 'trial',
              subscription_status: 'expired',
            })
            .eq('id', profile.id);

          console.log(`Subscription canceled for user ${profile.id}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Get user by Stripe customer ID
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabase
            .from('user_profiles')
            .update({ subscription_status: 'past_due' })
            .eq('id', profile.id);

          console.log(`Payment failed for user ${profile.id}`);
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
