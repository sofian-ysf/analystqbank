"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      description: "Send us an email anytime",
      contact: "support@analysttrainer.com",
      link: "mailto:support@analysttrainer.com"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Available Mon-Fri, 9am-6pm GMT",
      contact: "Start a conversation",
      link: "#"
    },
    {
      icon: "❓",
      title: "Help Center",
      description: "Browse our FAQ and guides",
      contact: "Visit Help Center",
      link: "/help"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-[#13343B]">
              AnalystTrainer
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-[#13343B] font-medium transition-colors">
                Contact
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
            Get in Touch
          </h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto">
            Have a question or need help? We&apos;re here for you. Reach out and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="bg-white rounded-xl p-6 border border-[#EAEEEF] hover:shadow-md transition-all text-center"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold text-[#13343B] mb-2">{method.title}</h3>
                <p className="text-[#5f6368] text-sm mb-3">{method.description}</p>
                <span className="text-[#1FB8CD] font-medium">{method.contact}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-[600px] mx-auto">
          <div className="bg-white rounded-xl p-8 sm:p-12 border border-[#EAEEEF]">
            <h2 className="text-2xl font-bold text-[#13343B] mb-6 text-center">Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#13343B] mb-2">Message Sent!</h3>
                <p className="text-[#5f6368] mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="text-[#1FB8CD] font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#13343B] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#13343B] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#13343B] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#13343B] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-[#EAEEEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1FB8CD] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAEEEF]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>
              <p className="mt-4 text-[#5f6368] text-sm">
                The leading platform for finance certification exam preparation.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-[#13343B] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#9aa0a6]">
                <li><Link href="/features" className="hover:text-[#13343B] transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-[#13343B] transition-colors">Pricing</Link></li>
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
            <p>© 2024 AnalystTrainer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
