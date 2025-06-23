'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { handleSubscriptionSuccess } from '@/app/actions/stripe';

export default function SuccessPageContent() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found');
      setIsProcessing(false);
      return;
    }

    const processSubscription = async () => {
      try {
        await handleSubscriptionSuccess(sessionId);
        // If we reach here, it means the redirect didn't happen (shouldn't occur)
        setSuccess(true);
        setIsProcessing(false);
      } catch (err) {
        console.error('Processing error:', err);
        
        // Check if it's a redirect error (which means success)
        if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
          // This is actually a success - the redirect is happening
          setSuccess(true);
          setIsProcessing(false);
          // The redirect will happen automatically
          return;
        }
        
        // Only set error for actual errors
        setError('Failed to process subscription');
        setIsProcessing(false);
      }
    };

    processSubscription();
  }, [sessionId, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-bl">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          {success ? 'Subscription Activated!' : 'Processing Your Subscription'}
        </h1>
        
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p>Please wait while we activate your subscription...</p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-center text-green-800 mb-4">
              Your subscription has been successfully activated! Redirecting you to your dashboard...
            </p>
          </div>
        ) : error ? (
          <div className="p-3 bg-red-100 text-red-800 rounded">
            <p>{error}</p>
            <button 
              onClick={() => router.push('/payment')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}