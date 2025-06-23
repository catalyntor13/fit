'use client'

import { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { useSearchParams } from 'next/navigation';


export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const subscriptionInactive = searchParams.get('subscriptionInactive') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  const handleCheckout = async () => {

    try {
      setIsLoading(true);
      const { url } = await createCheckoutSession();
      window.location.href = url;
    } catch (error) {
      console.error('Error during checkout:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Subscription Required</h1>
        
        {subscriptionInactive && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
            You need an active subscription to access this content.
          </div>
        )}
        
        {canceled && (
          <div className="mb-4 p-3 bg-orange-100 text-orange-800 rounded">
            Your payment was canceled. Please try again when you&quot;re ready.
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Premium Subscription</h2>
          <p className="text-gray-600 mb-2">Get access to all premium features with our subscription plan.</p>
          <ul className="list-disc pl-5 mb-4 text-gray-600">
            <li>Unlimited access to all content</li>
            <li>Priority support</li>
            <li>Advanced features</li>
            <li>Monthly updates</li>
          </ul>
          <p className="font-bold text-lg">$9.99/month</p>
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          {isLoading ? 'Processing...' : 'Subscribe Now'}
        </button>
      </div>
    </div>
  );
}