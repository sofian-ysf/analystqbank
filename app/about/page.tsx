"use client";

import Link from "next/link";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "CFA charterholder with 15+ years in investment banking. Former VP at Goldman Sachs.",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Technology leader with expertise in educational platforms. Former engineering director at Khan Academy.",
      image: "👨‍💻"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Content",
      bio: "PhD in Finance, CFA charterholder. Former professor at Wharton Business School.",
      image: "👩‍🏫"
    },
    {
      name: "David Kim",
      role: "Lead Instructor",
      bio: "CFA charterholder and CAIA designation. 10+ years teaching CFA preparation courses.",
      image: "👨‍🏫"
    }
  ];

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Finance Exam Prep
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="/resources" className="text-gray-600 hover:text-gray-900">
                  Resources
                </Link>
                <Link href="/about" className="text-gray-900 font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Sign in
              </Link>
              <Link href="/signup" className="text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About Finance Exam Prep
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We're on a mission to make CFA exam preparation more accessible, effective, and successful for aspiring finance professionals worldwide.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Finance Exam Prep, we believe that success in the CFA program should be determined by dedication and hard work, not by access to expensive preparation materials.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We've created a comprehensive, affordable platform that combines expert content, innovative technology, and proven teaching methods to help candidates achieve their goals.
              </p>
              <p className="text-lg text-gray-600">
                Our platform has helped thousands of candidates pass their CFA exams and advance their careers in finance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team combines deep finance expertise with educational innovation to create the best CFA preparation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              Finance Exam Prep was founded in 2019 by Sarah Johnson and Michael Chen, both of whom experienced firsthand the challenges of CFA preparation. Sarah, a CFA charterholder who spent years in investment banking, struggled with the overwhelming amount of study material and the high cost of quality preparation resources.
            </p>

            <p className="mb-6">
              Michael, a technology leader with a passion for education, recognized that technology could transform how people prepare for professional exams. Together, they envisioned a platform that would democratize access to high-quality CFA preparation materials.
            </p>

            <p className="mb-6">
              Starting with a small team of finance professionals and educators, we began building a comprehensive platform that combines expert content with innovative learning tools. Our focus on quality, affordability, and student success quickly gained recognition in the CFA community.
            </p>

            <p className="mb-6">
              Today, Finance Exam Prep serves over 50,000 students worldwide and maintains one of the highest pass rates in the industry. We continue to innovate and expand our offerings, always keeping our mission at the forefront: making CFA success accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Become part of a community dedicated to CFA success. Start your journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Finance Exam Prep
              </Link>
              <p className="mt-4 text-gray-600">
                Your comprehensive platform for CFA exam success.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link href="/question-bank" className="text-gray-600 hover:text-gray-900">Question Bank</Link></li>
                <li><Link href="/mock-exams" className="text-gray-600 hover:text-gray-900">Mock Exams</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/study-guides" className="text-gray-600 hover:text-gray-900">Study Guides</Link></li>
                <li><Link href="/formula-sheets" className="text-gray-600 hover:text-gray-900">Formula Sheets</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link href="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 Finance Exam Prep. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link>
              <Link href="/disclaimer" className="text-gray-600 hover:text-gray-900">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}