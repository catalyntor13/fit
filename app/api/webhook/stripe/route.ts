import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabaseServer';
import Stripe from 'stripe';

// This is your Stripe webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;
    
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed.`, err);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }
    
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const supabase = await createClient();
  
  // Get the customer ID from the subscription
  const customerId = subscription.customer as string;
  
  // Find the user with this customer ID
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId);
  
  if (!profiles || profiles.length === 0) {
    console.error('No user found with customer ID:', customerId);
    return;
  }
  
  const userId = profiles[0].id;
  
  // Get current_period_end from the first subscription item
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
  
  // Update the user's subscription status
  await supabase
    .from('profiles')
    .update({
      stripe_subscription_status: subscription.status === 'active' ? 'active' : 'inactive',
      stripe_subscription_expires_at: currentPeriodEnd 
        ? new Date(currentPeriodEnd * 1000).toISOString()
        : null,
    })
    .eq('id', userId);
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  const supabase = await createClient();
  
  // Get the customer ID from the subscription
  const customerId = subscription.customer as string;
  
  // Find the user with this customer ID
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId);
  
  if (!profiles || profiles.length === 0) {
    console.error('No user found with customer ID:', customerId);
    return;
  }
  
  const userId = profiles[0].id;
  
  // Update the user's subscription status
  await supabase
    .from('profiles')
    .update({
      subscription_status: 'inactive',
      subscription_expires_at: null,
    })
    .eq('id', userId);
}