"use client"

import { Suspense } from 'react'
import AccountConfirm from '@/app/confirm/account-confirm-component'
import { Card, CardContent } from "@/components/ui/card"

function AccountConfirmFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p className="text-gray-500">Please wait a moment.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AccountConfirmWrapper() {
  return (
    <Suspense fallback={<AccountConfirmFallback />}>
      <AccountConfirm />
    </Suspense>
  )
}