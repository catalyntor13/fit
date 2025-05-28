"use client"

import { Suspense } from 'react'
import ResetPassword from '@/app/(auth)/reset-password/reset-password-component'

function ResetPasswordFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPassword />
    </Suspense>
  )
}