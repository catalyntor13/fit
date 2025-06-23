import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js script and initialize with your publishable key
let stripePromise: Promise<unknown>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};