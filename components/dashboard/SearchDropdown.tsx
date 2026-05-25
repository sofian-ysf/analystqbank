"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  House,
  Books,
  Cards,
  Exam,
  Gear,
  ChartLineUp,
  Settings,
  User,
  Lightning,
  Scales,
  ChartBar,
  Globe,
  ClipboardText,
  Buildings,
  Bank,
  ArrowsClockwise,
  Hammer,
  Briefcase,
} from "@phosphor-icons/react";
import { cfaLevel1Curriculum } from "@/lib/curriculum";

// Map topic IDs to icons
const topicIcons: { [key: string]: typeof Scales } = {
  "ethical-professional-standards": Scales,
  "quantitative-methods": ChartBar,
  "economics": Globe,
  "financial-statement-analysis": ClipboardText,
  "corporate-issuers": Buildings,
  "equity-investments": ChartLineUp,
  "fixed-income": Bank,
  "derivatives": ArrowsClockwise,
  "alternative-investments": Hammer,
  "portfolio-management": Briefcase,
};

// Navigation items
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: House },
  { label: "Question Bank", href: "/question-bank", icon: Books },
  { label: "Flashcards", href: "/flashcards", icon: Cards },
  { label: "Mock Exams", href: "/mock-exam", icon: Exam },
  { label: "Settings", href: "/settings", icon: Gear },
];

interface SearchDropdownProps {
  className?: string;
}

export default function SearchDropdown({ className }: SearchDropdownProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build suggestions from curriculum (topics and subtopics)
  const allSuggestions: { label: string; type: string; href: string; icon: typeof Scales }[] = [
    // Navigation items
    ...navItems.map((item) => ({
      label: item.label,
      type: "Navigation",
      href: item.href,
      icon: item.icon,
    })),
    // Main topics
    ...cfaLevel1Curriculum.map((topic) => ({
      label: topic.name,
      type: "Topic",
      href: `/question-bank?topic=${topic.id}`,
      icon: topicIcons[topic.id] || Scales,
    })),
    // Subtopics
    ...cfaLevel1Curriculum.flatMap((topic) =>
      topic.subtopics.map((subtopic) => ({
        label: subtopic.name,
        type: "Subtopic",
        href: `/question-bank?topic=${topic.id}&subtopic=${subtopic.id}`,
        icon: topicIcons[topic.id] || Scales,
      }))
    ),
  ];

  // Filter suggestions based on query
  const filteredSuggestions = query.trim()
    ? allSuggestions.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10) // Limit to 10 results
    : [];

  const handleSelect = (href: string) => {
    router.push(href);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredSuggestions[selectedIndex].href);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim() && filteredSuggestions.length > 0) {
            handleSelect(filteredSuggestions[0].href);
          }
        }}
      >
        <div className="relative">
          <MagnifyingGlass
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search questions, topics..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1FB8CD]/30 focus:border-[#1FB8CD]"
          />
        </div>
      </form>

      {/* Dropdown */}
      {isOpen && query.trim() && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 max-h-80 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={`${suggestion.type}-${suggestion.label}`}
                onClick={() => handleSelect(suggestion.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  index === selectedIndex ? "bg-gray-50" : ""
                }`}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon size={18} className="text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{suggestion.label}</p>
                  <p className="text-xs text-gray-500">{suggestion.type}</p>
                </div>
                <span className="text-xs text-gray-400">→</span>
              </button>
            );
          })}
        </div>
      )}

      {/* No results */}
      {isOpen && query.trim() && filteredSuggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-6 z-50 text-center">
          <p className="text-sm text-gray-500">No results found for "{query}"</p>
          <p className="text-xs text-gray-400 mt-1">Try searching for a topic or navigation item</p>
        </div>
      )}
    </div>
  );
}