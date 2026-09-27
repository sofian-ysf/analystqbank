import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase';
import Stripe from 'stripe';
import { sendDiscordNotification, createCheckoutCompleteNotification } from '@/lib/discord';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Add calendar months, clamping to the last day of the target month when it has
// fewer days (e.g. Aug 31 + 6 months -> Feb 28, not Mar 3).
function addMonthsClamped(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  const originalDay = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const lastDayOfMonth = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(originalDay, lastDayOfMonth));
  return result;
}

// Map a purchased plan to the subscription fields stored on user_profiles.
// Time-limited plans get status 'active' with an expiry; lifetime keeps
// status 'lifetime' with no period end.
function getPlanSubscriptionFields(plan: PlanType, purchasedAt: Date) {
  const limits = PLAN_LIMITS[plan];
  const durationMonths: number | null = limits.isLifetime ? null : limits.durationMonths;
  if (durationMonths === null) {
    return {
      subscription_plan: plan,
      subscription_status: 'lifetime',
      current_period_end: null,
      cancel_at: null,
    };
  }
  return {
    subscription_plan: plan,
    subscription_status: 'active',
    current_period_end: addMonthsClamped(purchasedAt, durationMonths).toISOString(),
    cancel_at: null,
  };
}

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

          if (!(plan in PLAN_LIMITS)) {
            console.error('Unknown plan in session metadata, skipping profile update:', plan);
            break;
          }

          // Purchase time from the Stripe session, so expiry is anchored to
          // when the customer actually paid.
          const purchasedAt = new Date(session.created * 1000);

          // Build the update object explicitly: status and expiry depend on
          // the purchased plan (2month/6month expire, lifetime does not).
          const planFields = getPlanSubscriptionFields(plan as PlanType, purchasedAt);
          const updateData = {
            ...planFields,
            stripe_customer_id: customerId,
          };

          console.log('Update data:', JSON.stringify(updateData));

          // First check if profile exists
          console.log('Checking if profile exists for userId:', userId);
          const { data: existingProfile } = await supabase
            .from('user_profiles')
            .select('id, email, subscription_plan, subscription_status')
            .eq('id', userId)
            .single();

          console.log('Existing profile check result:', existingProfile);

          if (!existingProfile) {
            console.log('Profile does NOT exist for userId:', userId);
            console.log('Attempting to create profile...');

            const { data: newProfile, error: createError } = await supabase
              .from('user_profiles')
              .insert({
                id: userId,
                email: session.customer_details?.email || '',
                full_name: session.customer_details?.name || '',
                ...planFields,
                stripe_customer_id: customerId,
              })
              .select();

            if (createError) {
              console.error('Error creating user profile:', createError.message);
              console.error('Create error details:', JSON.stringify(createError));
            } else {
              console.log('=== NEW PROFILE CREATED ===');
              console.log('New profile:', JSON.stringify(newProfile?.[0]));

              // Send checkout complete notification to Discord
              if (!process.env.DISCORD_WEBHOOK_URL) {
                console.error('DISCORD_WEBHOOK_URL is not set!');
              } else {
                console.log('Sending Discord notification...');
                const discordPayload = createCheckoutCompleteNotification(
                  session.customer_details?.email || '',
                  userId,
                  session.customer_details?.name || '',
                  plan,
                  session.amount_total || 0,
                  session.currency?.toUpperCase() || 'GBP'
                );
                sendDiscordNotification(process.env.DISCORD_WEBHOOK_URL, discordPayload)
                  .then((success) => {
                    if (success) {
                      console.log('Discord checkout complete notification sent');
                    } else {
                      console.error('Discord notification failed - check webhook URL');
                    }
                  })
                  .catch(err => console.error('Failed to send Discord notification:', err));
              }
            }
          } else {
            console.log('Profile exists, updating...');
            console.log('Current profile values:', existingProfile);

            const { data, error } = await supabase
              .from('user_profiles')
              .update(updateData)
              .eq('id', userId)
              .select();

            if (error) {
              console.error('Error updating user profile:', error.message);
              console.error('Error code:', error.code);
              console.error('Error details:', JSON.stringify(error));
            } else if (data && data.length > 0) {
              console.log('=== PROFILE UPDATE SUCCESS ===');
              console.log('Updated profile:', JSON.stringify(data[0]));

              // Send checkout complete notification to Discord
              if (!process.env.DISCORD_WEBHOOK_URL) {
                console.error('DISCORD_WEBHOOK_URL is not set!');
              } else {
                console.log('Sending Discord notification...');
                const discordPayload = createCheckoutCompleteNotification(
                  session.customer_details?.email || '',
                  userId,
                  session.customer_details?.name || '',
                  plan,
                  session.amount_total || 0,
                  session.currency?.toUpperCase() || 'GBP'
                );
                sendDiscordNotification(process.env.DISCORD_WEBHOOK_URL, discordPayload)
                  .then((success) => {
                    if (success) {
                      console.log('Discord checkout complete notification sent');
                    } else {
                      console.error('Discord notification failed - check webhook URL');
                    }
                  })
                  .catch(err => console.error('Failed to send Discord notification:', err));
              }
            } else {
              console.log('Update returned no data - forcing update...');
              const rawUpdate = await supabase
                .from('user_profiles')
                .update(updateData)
                .eq('id', userId);
              console.log('Force update result:', JSON.stringify(rawUpdate));
              if (!rawUpdate.error) {
                console.log('=== PROFILE UPDATE SUCCESS (forced) ===');

                // Send checkout complete notification to Discord
                const discordPayload = createCheckoutCompleteNotification(
                  session.customer_details?.email || '',
                  userId,
                  session.customer_details?.name || '',
                  plan,
                  session.amount_total || 0,
                  session.currency?.toUpperCase() || 'GBP'
                );
                sendDiscordNotification(process.env.DISCORD_WEBHOOK_URL!, discordPayload)
                  .then(() => console.log('Discord checkout complete notification sent'))
                  .catch(err => console.error('Failed to send Discord notification:', err));
              }
            }
          }

          console.log(`Access activated for user ${userId}: ${plan} (status=${updateData.subscription_status}, period_end=${updateData.current_period_end})`);
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
