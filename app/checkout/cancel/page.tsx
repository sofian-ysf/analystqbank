"use client";

import Link from "next/link";
import Image from "next/image";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Link href="/" className="inline-block mb-8">
          <Image src="/logo.png" alt="AnalystTrainer" width={200} height={45} className="h-10 w-auto mx-auto" />
        </Link>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#EAEEEF]">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
            <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-[#13343B] mb-4">
            Payment Cancelled
          </h1>

          <p className="text-[#5f6368] mb-6">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          <p className="text-sm text-[#5f6368] mb-6">
            You can still continue using your free trial or choose a plan whenever you&apos;re ready.
          </p>

          <div className="space-y-3">
            <Link
              href="/#pricing"
              className="block w-full bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
            >
              View Plans
            </Link>

            <Link
              href="/dashboard"
              className="block w-full border border-[#EAEEEF] text-[#13343B] px-6 py-3 rounded-lg font-medium hover:bg-[#F3F3EE] transition-colors"
            >
              Continue with Free Trial
            </Link>
          </div>

          <p className="mt-6 text-xs text-[#9aa0a6]">
            Need help? <Link href="/contact" className="text-[#1FB8CD] hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
