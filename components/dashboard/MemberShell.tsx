"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Sidebar from "@/components/dashboard/Sidebar";

/**
 * Shared logged-in shell: Sidebar + content. Fetches the user client-side and
 * owns sign-out, so server components can wrap their content with it.
 */
export default function MemberShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] lg:flex">
      <Sidebar user={user} onSignOut={() => router.push("/")} />
      <main className="flex-1 p-6 lg:p-10 pt-16 lg:pt-10">{children}</main>
    </div>
  );
}
