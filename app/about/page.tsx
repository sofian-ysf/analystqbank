"use client";

import Link from "next/link";
import Image from "next/image";

export default function About() {
  const stats = [
    { number: "50,000+", label: "Students Trained" },
    { number: "85%", label: "Pass Rate" },
    { number: "10,000+", label: "Practice Questions" },
    { number: "5", label: "Years Experience" }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We maintain the highest standards in content quality and educational delivery.",
      icon: "🏆"
    },
    {
      title: "Innovation",
      description: "We leverage technology to create engaging and effective learning experiences.",
      icon: "💡"
    },
    {
      title: "Support",
      description: "We provide comprehensive support to help every student achieve their goals.",
      icon: "🤝"
    },
    {
      title: "Integrity",
      description: "We operate with transparency and ethical practices in everything we do.",
      icon: "⚖️"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#product" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Blog
              </Link>
              <Link href="/#faq" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                FAQ
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Login
              </Link>
              <Link href="/signup" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-[#5f6368] hover:text-[#13343B] hover:bg-[#F3F3EE]" aria-label="Open menu">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#13343B] mb-6">
            About AnalystTrainer
          </h1>
          <p className="text-xl text-[#5f6368] max-w-3xl mx-auto">
            We&apos;re on a mission to make CFA exam preparation more accessible, effective, and successful for aspiring finance professionals worldwide.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 bg-[#1FB8CD]">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#13343B] mb-6">Our Mission</h2>
              <p className="text-lg text-[#5f6368] mb-6">
                At AnalystTrainer, we believe that success in the CFA program should be determined by dedication and hard work, not by access to expensive preparation materials.
              </p>
              <p className="text-lg text-[#5f6368] mb-6">
                We&apos;ve created a comprehensive, affordable platform that combines expert content, innovative technology, and proven teaching methods to help candidates achieve their goals.
              </p>
              <p className="text-lg text-[#5f6368]">
                Our platform has helped thousands of candidates pass their CFA exams and advance their careers in finance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-[#EAEEEF]">
              <h3 className="text-xl font-bold text-[#13343B] mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#1FB8CD] text-xl">✓</span>
                  <span className="text-[#5f6368]">CFA charterholder-created content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1FB8CD] text-xl">✓</span>
                  <span className="text-[#5f6368]">AI-powered adaptive learning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1FB8CD] text-xl">✓</span>
                  <span className="text-[#5f6368]">Comprehensive question bank</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1FB8CD] text-xl">✓</span>
                  <span className="text-[#5f6368]">Detailed performance analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#F3F3EE]">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#13343B] mb-4">Our Values</h2>
            <p className="text-xl text-[#5f6368] max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-[#EAEEEF] text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-[#13343B] mb-3">{value.title}</h3>
                <p className="text-[#5f6368] text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#13343B] mb-4">Our Story</h2>
          </div>

          <div className="prose prose-lg max-w-none text-[#5f6368]">
            <p className="mb-6">
              AnalystTrainer was founded by finance professionals who experienced firsthand the challenges of CFA preparation. We struggled with the overwhelming amount of study material and the high cost of quality preparation resources.
            </p>
            <p className="mb-6">
              We recognized that technology could transform how people prepare for professional exams. We envisioned a platform that would democratize access to high-quality CFA preparation materials.
            </p>
            <p className="mb-6">
              Starting with a small team of finance professionals and educators, we began building a comprehensive platform that combines expert content with innovative learning tools. Our focus on quality, affordability, and student success quickly gained recognition in the CFA community.
            </p>
            <p>
              Today, AnalystTrainer serves students worldwide and maintains one of the highest pass rates in the industry. We continue to innovate and expand our offerings, always keeping our mission at the forefront: making CFA success accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#13343B]">
        <div className="max-w-[960px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Become part of a community dedicated to CFA success. Start your journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-[#1FB8CD] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors">
              Start Free Trial
            </Link>
            <Link href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#13343B] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAEEEF]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/">
                <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
              </Link>
              <p className="mt-4 text-[#5f6368] text-sm">
                The leading platform for finance certification exam preparation.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-[#13343B] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#9aa0a6]">
                <li><Link href="/#product" className="hover:text-[#13343B] transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-[#13343B] transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#13343B] mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#9aa0a6]">
                <li><Link href="/blog" className="hover:text-[#13343B] transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-[#13343B] transition-colors">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#13343B] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#9aa0a6]">
                <li><Link href="/privacy" className="hover:text-[#13343B] transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#13343B] transition-colors">Terms</Link></li>
                <li><Link href="/refund" className="hover:text-[#13343B] transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#EAEEEF] mt-8 pt-8 text-center text-sm text-[#9aa0a6]">
            <p>© 2026 AnalystTrainer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
