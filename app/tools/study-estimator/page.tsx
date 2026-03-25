"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function StudyEstimator() {
  const [examDate, setExamDate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("10");
  const [studyLevel, setStudyLevel] = useState("beginner");
  const [estimate, setEstimate] = useState<any>(null);

  const calculateEstimate = () => {
    if (!examDate) return;

    const today = new Date();
    const exam = new Date(examDate);
    const weeksRemaining = Math.floor((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7));

    const recommendedHours = studyLevel === "beginner" ? 300 : studyLevel === "intermediate" ? 250 : 200;
    const totalAvailableHours = weeksRemaining * parseInt(hoursPerWeek);
    const onTrack = totalAvailableHours >= recommendedHours;

    setEstimate({
      weeksRemaining,
      recommendedHours,
      totalAvailableHours,
      onTrack,
      hoursPerDay: (parseInt(hoursPerWeek) / 7).toFixed(1),
      recommendedPerWeek: Math.ceil(recommendedHours / weeksRemaining),
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
            CFA Level 1 Study Time Estimator
          </h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto">
            Calculate how many hours you need to study each week to pass the CFA Level 1 exam
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[600px] mx-auto">
          <div className="bg-white rounded-xl border border-[#EAEEEF] p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#13343B] mb-2">
                  Exam Date
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#13343B] mb-2">
                  Hours Available Per Week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  min="1"
                  max="80"
                  className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#13343B] mb-2">
                  Study Level
                </label>
                <select
                  value={studyLevel}
                  onChange={(e) => setStudyLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:border-[#1FB8CD]"
                >
                  <option value="beginner">Beginner (no finance background)</option>
                  <option value="intermediate">Intermediate (some finance knowledge)</option>
                  <option value="advanced">Advanced (strong finance background)</option>
                </select>
              </div>

              <button
                onClick={calculateEstimate}
                className="w-full bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
              >
                Calculate Study Plan
              </button>
            </div>

            {estimate && (
              <div className="mt-8 pt-8 border-t border-[#EAEEEF]">
                <h3 className="text-xl font-bold text-[#13343B] mb-4">Your Study Plan</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#5f6368]">Weeks until exam:</span>
                    <span className="font-medium text-[#13343B]">{estimate.weeksRemaining} weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5f6368]">Recommended total hours:</span>
                    <span className="font-medium text-[#13343B]">{estimate.recommendedHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5f6368]">Your total available hours:</span>
                    <span className="font-medium text-[#13343B]">{estimate.totalAvailableHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5f6368]">Hours per day needed:</span>
                    <span className="font-medium text-[#13343B]">{estimate.hoursPerDay} hours</span>
                  </div>
                </div>

                <div className={`mt-6 p-4 rounded-lg ${estimate.onTrack ? "bg-green-50" : "bg-red-50"}`}>
                  <p className={`font-medium ${estimate.onTrack ? "text-green-800" : "text-red-800"}`}>
                    {estimate.onTrack
                      ? "✓ You're on track! Stick to your study schedule."
                      : `⚠ You need to increase to ${estimate.recommendedPerWeek} hours/week to meet recommended study time.`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-[#F3F3EE] rounded-xl p-6">
            <h3 className="font-bold text-[#13343B] mb-3">CFA Institute Recommendations</h3>
            <ul className="space-y-2 text-[#5f6368]">
              <li>• Average candidates spend 300+ hours preparing</li>
              <li>• Start studying 4-6 months before exam date</li>
              <li>• Consistent daily study is better than cramming</li>
              <li>• Leave 2-4 weeks for review and mock exams</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto bg-gradient-to-br from-[#1FB8CD] to-[#1A6872] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to start your study plan?</h2>
          <p className="text-lg mb-6 opacity-90">
            Access 2,000+ practice questions and structured study guides.
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
