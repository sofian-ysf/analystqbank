"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function FinancialRatiosCalculator() {
  const [activeCategory, setActiveCategory] = useState<string>("liquidity");

  const ratioCategories = {
    liquidity: {
      name: "Liquidity Ratios",
      ratios: [
        { name: "Current Ratio", formula: "Current Assets / Current Liabilities", description: "Measures ability to pay short-term obligations" },
        { name: "Quick Ratio", formula: "(Current Assets - Inventory) / Current Liabilities", description: "More conservative liquidity measure" },
        { name: "Cash Ratio", formula: "Cash / Current Liabilities", description: "Most conservative liquidity ratio" },
      ]
    },
    profitability: {
      name: "Profitability Ratios",
      ratios: [
        { name: "Net Profit Margin", formula: "Net Income / Revenue", description: "Percentage of revenue that becomes profit" },
        { name: "ROA", formula: "Net Income / Total Assets", description: "Return on Assets - efficiency of asset utilization" },
        { name: "ROE", formula: "Net Income / Shareholders' Equity", description: "Return on Equity - return to shareholders" },
      ]
    },
    leverage: {
      name: "Leverage Ratios",
      ratios: [
        { name: "Debt-to-Equity", formula: "Total Debt / Total Equity", description: "Financial leverage measure" },
        { name: "Debt-to-Assets", formula: "Total Debt / Total Assets", description: "Proportion of assets financed by debt" },
        { name: "Interest Coverage", formula: "EBIT / Interest Expense", description: "Ability to pay interest obligations" },
      ]
    },
    efficiency: {
      name: "Efficiency Ratios",
      ratios: [
        { name: "Asset Turnover", formula: "Revenue / Average Total Assets", description: "How efficiently assets generate revenue" },
        { name: "Inventory Turnover", formula: "COGS / Average Inventory", description: "How quickly inventory is sold" },
        { name: "Receivables Turnover", formula: "Revenue / Average Receivables", description: "How quickly receivables are collected" },
      ]
    },
  };

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#product" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Blog
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Login
              </Link>
              <Link href="/signup?plan=basic" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">
            Financial Ratios Calculator & Guide
          </h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto">
            Essential financial ratios for CFA Level 1 Financial Statement Analysis
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(ratioCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === key
                    ? "bg-[#1FB8CD] text-white"
                    : "bg-white text-[#5f6368] border border-[#EAEEEF] hover:border-[#1FB8CD]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ratios Display */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[960px] mx-auto">
          <div className="grid gap-6">
            {ratioCategories[activeCategory as keyof typeof ratioCategories].ratios.map((ratio, index) => (
              <div key={index} className="bg-white rounded-xl border border-[#EAEEEF] p-6">
                <h3 className="text-xl font-bold text-[#13343B] mb-2">{ratio.name}</h3>
                <div className="bg-[#F3F3EE] rounded-lg p-4 mb-3">
                  <code className="text-[#1FB8CD] font-mono">{ratio.formula}</code>
                </div>
                <p className="text-[#5f6368]">{ratio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto bg-gradient-to-br from-[#1FB8CD] to-[#1A6872] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Master Financial Ratios with Practice Questions</h2>
          <p className="text-lg mb-6 opacity-90">
            Access 500+ Financial Statement Analysis questions including ratio calculations and interpretation.
          </p>
          <Link
            href="/signup?plan=basic"
            className="inline-block bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Start Practicing Now
          </Link>
        </div>
      </section>
    </div>
  );
}
