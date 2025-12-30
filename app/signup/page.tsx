"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { PLAN_LIMITS, PlanType } from "@/lib/plans";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') as PlanType | null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Get plan details
  const selectedPlan = planParam && ['trial', 'basic', 'premium'].includes(planParam)
    ? planParam
    : 'trial';
  const planDetails = PLAN_LIMITS[selectedPlan];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Include plan in the redirect URL so auth callback can handle it
    const redirectUrl = selectedPlan === 'basic' || selectedPlan === 'premium'
      ? `${window.location.origin}/auth/callback?plan=${selectedPlan}`
      : `${window.location.origin}/auth/callback`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || email.split('@')[0],
          selected_plan: selectedPlan,
        }
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      // Calculate trial end time (24 hours from now)
      const trialEndsAt = new Date();
      trialEndsAt.setHours(trialEndsAt.getHours() + 24);

      // Update user profile with trial info
      await supabase
        .from('user_profiles')
        .update({
          subscription_plan: 'free',
          subscription_status: 'trialing',
          trial_ends_at: trialEndsAt.toISOString(),
          full_name: fullName || email.split('@')[0],
        })
        .eq('id', data.user.id);

      // Send Discord notification
      try {
        await fetch('/api/notify-discord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            type: 'new_user',
            plan: selectedPlan,
          }),
        });
      } catch (notificationError) {
        console.error('Failed to send Discord notification:', notificationError);
      }

      // Redirect immediately based on plan
      if (selectedPlan === 'basic' || selectedPlan === 'premium') {
        // Redirect to Stripe checkout
        router.push(`/api/stripe/create-checkout?plan=${selectedPlan}`);
      } else {
        // Free trial - go to dashboard
        router.push("/dashboard");
      }
      return; // Don't setLoading(false) since we're redirecting
    }

    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?plan=${selectedPlan}`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/logo.png" alt="AnalystTrainer" width={200} height={45} className="h-10 w-auto mx-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-[#13343B]">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[#5f6368]">
            Start your journey to exam success
          </p>
        </div>

        {/* Selected Plan Banner */}
        {selectedPlan && (
          <div className="mb-6 bg-[#1FB8CD]/10 border border-[#1FB8CD]/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#13343B]">Selected Plan</p>
                <p className="text-lg font-bold text-[#1FB8CD]">{planDetails.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#13343B]">
                  {planDetails.price === 0 ? 'Free' : `£${planDetails.price}`}
                </p>
                {planDetails.price > 0 && (
                  <p className="text-sm text-[#5f6368]">/month</p>
                )}
              </div>
            </div>
            {selectedPlan === 'trial' && (
              <p className="mt-2 text-xs text-[#5f6368]">
                24-hour free trial. No credit card required.
              </p>
            )}
            {selectedPlan !== 'trial' && (
              <p className="mt-2 text-xs text-[#5f6368]">
                You&apos;ll be redirected to payment after signup.
              </p>
            )}
            <Link href="/#pricing" className="text-xs text-[#1FB8CD] hover:underline mt-1 inline-block">
              Change plan
            </Link>
          </div>
        )}

        {/* Sign Up Form */}
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form onSubmit={handleSignUp} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1FB8CD] focus:border-[#1FB8CD]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1FB8CD] focus:border-[#1FB8CD]"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1FB8CD] focus:border-[#1FB8CD]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1FB8CD] focus:border-[#1FB8CD]"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#13343B] focus:ring-[#1FB8CD] border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <Link href="/terms" className="text-gray-900 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-900 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1FB8CD] hover:bg-[#1A6872] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FB8CD] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating account..." : selectedPlan === 'trial' ? "Start Free Trial" : "Sign up & Continue to Payment"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#9aa0a6]">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-[#5f6368] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20">
                  <path d="M19.998 10.223c0-.696-.063-1.369-.178-2.017H10.2v3.818h5.51a4.708 4.708 0 01-2.044 3.093v2.57h3.31c1.936-1.782 3.052-4.408 3.052-7.464z" fill="#4285F4"/>
                  <path d="M10.2 20c2.764 0 5.08-.917 6.774-2.48l-3.31-2.57c-.917.614-2.089.976-3.464.976-2.665 0-4.921-1.8-5.725-4.218H1.052v2.653A9.995 9.995 0 0010.2 20z" fill="#34A853"/>
                  <path d="M4.475 11.708a6.005 6.005 0 01-.313-1.906c0-.662.114-1.305.313-1.906V5.243H1.052A9.995 9.995 0 000 10.002c0 1.613.388 3.139 1.052 4.48l3.423-2.653z" fill="#FBBC05"/>
                  <path d="M10.2 3.977c1.502 0 2.85.516 3.91 1.53l2.934-2.934C15.277.981 12.963 0 10.2 0A9.995 9.995 0 001.052 5.243l3.423 2.653c.804-2.418 3.06-4.218 5.725-4.218z" fill="#EA4335"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-[#5f6368]">Already have an account?</span>{" "}
            <Link href="/login" className="font-medium text-[#1FB8CD] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1FB8CD]"></div>
      </div>
    }>
      <SignUpForm />
    </Suspense>
  );
}
