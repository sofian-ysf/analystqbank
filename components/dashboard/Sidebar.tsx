"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  House,
  Books,
  Cards,
  Exam,
  Gear,
  SignOut,
  Lightning,
  X,
  List,
} from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface SidebarProps {
  user: User;
  onSignOut: () => void;
}

export default function Sidebar({ user, onSignOut }: SidebarProps) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Determine flashcard href based on login status
  const flashcardHref = user ? "/flashcards/study/ethics" : "/flashcards";

  const navItems = [
    { href: "/dashboard", icon: House, label: "Dashboard" },
    { href: "/question-bank", icon: Books, label: "Question Bank" },
    { href: flashcardHref, icon: Cards, label: "Flashcards", badge: "FREE" },
    { href: "/practice/mock-exam", icon: Exam, label: "Mock Exams" },
    { href: "/settings", icon: Gear, label: "Settings" },
  ];
    const supabase = createClient();
    await supabase.auth.signOut();
    onSignOut();
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        aria-label="Open menu"
      >
        <List size={24} className="text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200
          flex flex-col h-screen
          transform transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="AnalystTrainer" width={140} height={32} className="h-7 w-auto" />
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pt-16 pb-8">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = typeof window !== "undefined" && window.location.pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                      transition-colors
                      ${isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon size={20} weight={isActive ? "fill" : "regular"} />
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pro Upgrade CTA */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-xl p-4 text-gray-900">
            <div className="flex items-center gap-2 mb-2">
              <Lightning size={20} weight="fill" className="text-gray-900" />
              <span className="font-semibold text-sm">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Unlock all questions, mock exams & analytics</p>
            <Link
              href="/pricing"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full bg-[#1FB8CD] text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-[#1A6872] hover:shadow-md transition-all"
            >
              View Plans
            </Link>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <SignOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}