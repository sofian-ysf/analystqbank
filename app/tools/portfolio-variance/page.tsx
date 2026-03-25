"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PortfolioVarianceCalculator() {
  const [weight1, setWeight1] = useState("50");
  const [weight2, setWeight2] = useState("50");
  const [return1, setReturn1] = useState("10");
  const [return2, setReturn2] = useState("8");
  const [stdDev1, setStdDev1] = useState("15");
  const [stdDev2, setStdDev2] = useState("12");
  const [correlation, setCorrelation] = useState("0.6");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w1 = parseFloat(weight1) / 100;
    const w2 = parseFloat(weight2) / 100;
    const r1 = parseFloat(return1);
    const r2 = parseFloat(return2);
    const sd1 = parseFloat(stdDev1) / 100;
    const sd2 = parseFloat(stdDev2) / 100;
    const corr = parseFloat(correlation);

    // Portfolio Return
    const portReturn = (w1 * r1 + w2 * r2);

    // Portfolio Variance
    const variance = (w1 * w1 * sd1 * sd1) + (w2 * w2 * sd2 * sd2) + (2 * w1 * w2 * sd1 * sd2 * corr);

    // Portfolio Standard Deviation
    const portStdDev = Math.sqrt(variance) * 100;

    setResult({
      portReturn: portReturn.toFixed(2),
      portStdDev: portStdDev.toFixed(2),
      variance: (variance * 10000).toFixed(4),
    });
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
            Portfolio Variance Calculator
          </h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto">
            Calculate 2-asset portfolio return, variance, and standard deviation for CFA Level 1 Portfolio Management
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white rounded-xl border border-[#EAEEEF] p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Asset 1 */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#13343B] text-lg mb-4">Asset 1</h3>

                <div>
                  <label className="block text-sm font-medium text-[#13343B] mb-2">
                    Weight (%)
                  </label>
                  <input
                    type="number"
                    value={weight1}
                    onChange={(e) => setWeight1(e.target.value)}
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#13343B] mb-2">
                    Expected Return (%)
                  </label>
                  <input
                    type="number"
                    value={return1}
                    onChange={(e) => setReturn1(e.target.value)}
                    step="0.1"
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#13343B] mb-2">
                    Standard Deviation (%)
                  </label>
                  <input
                    type="number"
                    value={stdDev1}
                    onChange={(e) => setStdDev1(e.target.value)}
                    step="0.1"
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                  />
                </div>
              </div>

              {/* Asset 2 */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#13343B] text-lg mb-4">Asset 2</h3>

                <div>
                  <label className="block text-sm font-medium text-[#13343B] mb-2">
                    Weight (%)
                  </label>
                  <input
                    type="number"
                    value={weight2}
                    onChange={(e) => setWeight2(e.target.value)}
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#13343B] mb-2">
                    Expected Return (%)
                  </label>
                  <input
                    type="number"
                    value={return2}
                    onChange={(e) => setReturn2(e.target.value)}
                    step="0.1"
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#13343B] mb-2">
                    Standard Deviation (%)
                  </label>
                  <input
                    type="number"
                    value={stdDev2}
                    onChange={(e) => setStdDev2(e.target.value)}
                    step="0.1"
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                  />
                </div>
              </div>
            </div>

            {/* Correlation */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[#13343B] mb-2">
                Correlation Coefficient (-1 to 1)
              </label>
              <input
                type="number"
                value={correlation}
                onChange={(e) => setCorrelation(e.target.value)}
                min="-1"
                max="1"
                step="0.1"
                className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
              />
              <p className="text-sm text-[#5f6368] mt-2">
                -1 = perfectly negative, 0 = no correlation, 1 = perfectly positive
              </p>
            </div>

            <button
              onClick={calculate}
              className="w-full mt-6 bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
            >
              Calculate Portfolio Metrics
            </button>

            {result && (
              <div className="mt-8 pt-8 border-t border-[#EAEEEF]">
                <h3 className="text-xl font-bold text-[#13343B] mb-4">Results</h3>

                <div className="space-y-4">
                  <div className="bg-[#F3F3EE] rounded-lg p-4">
                    <span className="text-sm text-[#5f6368]">Portfolio Expected Return</span>
                    <p className="text-2xl font-bold text-[#1FB8CD]">{result.portReturn}%</p>
                  </div>

                  <div className="bg-[#F3F3EE] rounded-lg p-4">
                    <span className="text-sm text-[#5f6368]">Portfolio Standard Deviation (Risk)</span>
                    <p className="text-2xl font-bold text-[#1FB8CD]">{result.portStdDev}%</p>
                  </div>

                  <div className="bg-[#F3F3EE] rounded-lg p-4">
                    <span className="text-sm text-[#5f6368]">Portfolio Variance</span>
                    <p className="text-2xl font-bold text-[#1FB8CD]">{result.variance}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Formula Reference */}
          <div className="mt-8 bg-white rounded-xl border border-[#EAEEEF] p-6">
            <h3 className="font-bold text-[#13343B] mb-4">Key Formulas</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-[#13343B]">Portfolio Return:</p>
                <code className="text-[#1FB8CD]">E(Rp) = w₁E(R₁) + w₂E(R₂)</code>
              </div>
              <div>
                <p className="font-medium text-[#13343B]">Portfolio Variance:</p>
                <code className="text-[#1FB8CD]">σ²p = w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁₂</code>
              </div>
              <div>
                <p className="font-medium text-[#13343B]">Portfolio Standard Deviation:</p>
                <code className="text-[#1FB8CD]">σp = √(Portfolio Variance)</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto bg-gradient-to-br from-[#1FB8CD] to-[#1A6872] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Master Portfolio Management</h2>
          <p className="text-lg mb-6 opacity-90">
            Access 150+ portfolio management questions with calculation practice.
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
