'use server'


import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Define your product/price IDs
const PRICE_ID = 'price_1RbwyUG7Yj7TKVmmK1pCC6cp';

export async function createCheckoutSession() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get user profile to check if they already have a Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();
    
    let customerId = profile?.stripe_customer_id;
    
    // If no customer ID exists, create a new customer
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_id: user.id,
        },
      });
      
      customerId = customer.id;
      
      // Update the user profile with the new customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment?canceled=true`,
      metadata: {
        userId: user.id,
      },
    });
    
    if (!session.url) {
      throw new Error('Failed to create checkout session');
    }
    
    return { url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function handleSubscriptionSuccess(sessionId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Retrieve the checkout session to get subscription details
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.subscription) {
      // Get subscription ID and fetch full subscription
      const subscriptionId = typeof session.subscription === 'string' 
        ? session.subscription 
        : session.subscription.id;
      
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      // Get current_period_end from the first subscription item (not from main subscription object)
      const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
      
      if (currentPeriodEnd) {
        // Update the user profile with subscription information
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
            subscription_expires_at: new Date(currentPeriodEnd * 1000).toISOString(),
          })
          .eq('id', user.id);
        
        revalidatePath('/', 'layout');
        redirect('/welcome');
      }
    }
  } catch (error) {
    // Check if it's a redirect error (which is expected)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error; // Re-throw redirect errors
    }
    
    console.error('Error handling subscription success:', error);
    throw error;
  }
}