import Stripe from 'stripe';

// Server-side Stripe client - only use in API routes/server components
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// Price IDs - to be set after creating products in Stripe Dashboard
export const STRIPE_PRICES = {
  basic: process.env.STRIPE_BASIC_PRICE_ID!,
  premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
};

// Re-export plan limits for server-side use
export { PLAN_LIMITS, type PlanType } from './plans';
