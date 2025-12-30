"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Link href="/" className="inline-block mb-8">
          <Image src="/logo.png" alt="AnalystTrainer" width={200} height={45} className="h-10 w-auto mx-auto" />
        </Link>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#EAEEEF]">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-[#13343B] mb-4">
            Payment Successful!
          </h1>

          <p className="text-[#5f6368] mb-6">
            Thank you for subscribing to AnalystTrainer. Your account has been upgraded and you now have full access to all features.
          </p>

          <div className="bg-[#1FB8CD]/10 border border-[#1FB8CD]/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-[#1A6872]">
              Your subscription is now active. Start preparing for your CFA exam with our comprehensive question bank and mock exams.
            </p>
          </div>

          <p className="text-sm text-[#9aa0a6] mb-4">
            Redirecting to dashboard in {countdown} seconds...
          </p>

          <Link
            href="/dashboard"
            className="inline-block w-full bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
          >
            Go to Dashboard Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1FB8CD]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
