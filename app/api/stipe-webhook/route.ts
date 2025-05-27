import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const data = event.data.object as any

  switch (event.type) {
    case 'checkout.session.completed':
    case 'invoice.paid':
      // subscription activated/renewed
      await supabase
        .from('profiles')
        .update({
          subscription_status: 'active',
          subscription_expires_at: new Date(data.current_period_end * 1000).toISOString(),
        })
        .eq('stripe_customer_id', data.customer)
      break

    case 'customer.subscription.deleted':
      await supabase
        .from('profiles')
        .update({
          subscription_status: 'canceled',
          subscription_expires_at: null,
        })
        .eq('stripe_customer_id', data.customer)
      break
  }

  return new Response('OK', { status: 200 })
}
