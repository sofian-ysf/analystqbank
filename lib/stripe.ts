import Stripe from 'stripe';

// Server-side Stripe client - only use in API routes/server components
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// Price IDs - to be set after creating products in Stripe Dashboard
export const STRIPE_PRICES = {
  '2month': process.env.STRIPE_2MONTH_PRICE_ID!,
  '6month': process.env.STRIPE_6MONTH_PRICE_ID!,
  lifetime: process.env.STRIPE_LIFETIME_PRICE_ID!,
};

// Re-export plan limits for server-side use
export { PLAN_LIMITS, type PlanType } from './plans';
