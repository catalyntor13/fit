import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  const { userId, email } = await req.json()

  // Creează customer în Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: { supabase_uid: userId },
  })

  // Update în Supabase
  await supabase
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId)

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
