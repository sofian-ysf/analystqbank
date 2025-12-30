"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Suspense } from "react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Authenticating...");
  const supabase = createClient();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const plan = searchParams.get("plan");
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        console.log("Auth callback params:", { plan, hasCode: !!code, error });

        // Check for errors from Supabase
        if (error) {
          console.error("Auth error:", error, errorDescription);
          router.push(`/login?message=${encodeURIComponent(errorDescription || error)}`);
          return;
        }

        // Check for hash fragment (tokens from implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        console.log("Hash params:", { hasAccessToken: !!accessToken, hasRefreshToken: !!refreshToken });

        if (accessToken) {
          // Set session from hash tokens
          setStatus("Setting up your session...");
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });

          if (sessionError) {
            console.error("Session error:", sessionError);
            router.push(`/login?message=${encodeURIComponent(sessionError.message)}`);
            return;
          }

          if (data.user) {
            await setupUserProfile(data.user.id, data.user.email, data.user.user_metadata?.full_name, plan);
            return;
          }
        }

        // Handle code flow (PKCE)
        if (code) {
          setStatus("Exchanging code for session...");
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error("Code exchange error:", exchangeError);
            router.push(`/login?message=${encodeURIComponent(exchangeError.message)}`);
            return;
          }

          if (data.user) {
            await setupUserProfile(data.user.id, data.user.email, data.user.user_metadata?.full_name, plan);
            return;
          }
        }

        // No auth params found, check if already authenticated
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const plan = searchParams.get("plan");
          await setupUserProfile(user.id, user.email, user.user_metadata?.full_name, plan);
          return;
        }

        // No authentication found
        router.push("/login?message=Could not authenticate. Please try again.");
      } catch (err) {
        console.error("Auth callback error:", err);
        router.push("/login?message=Authentication failed. Please try again.");
      }
    };

    const setupUserProfile = async (
      userId: string,
      email: string | undefined,
      fullName: string | undefined,
      plan: string | null
    ) => {
      setStatus("Setting up your account...");

      // Calculate trial end time (24 hours from now)
      const trialEndsAt = new Date();
      trialEndsAt.setHours(trialEndsAt.getHours() + 24);

      // Update user profile with trial info
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          subscription_plan: "free",
          subscription_status: "trialing",
          trial_ends_at: trialEndsAt.toISOString(),
          full_name: fullName || email?.split("@")[0],
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Profile update error:", updateError);
        // Continue anyway - profile might not exist yet or have different schema
      }

      // Redirect based on plan selection
      if (plan === "basic" || plan === "premium") {
        setStatus("Redirecting to checkout...");
        router.push(`/api/stripe/create-checkout?plan=${plan}`);
      } else {
        setStatus("Redirecting to dashboard...");
        router.push("/dashboard");
      }
    };

    handleAuth();
  }, [router, searchParams, supabase]);

  return (
    <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB8CD] mx-auto mb-4"></div>
        <p className="text-[#13343B] font-medium">{status}</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB8CD]"></div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
