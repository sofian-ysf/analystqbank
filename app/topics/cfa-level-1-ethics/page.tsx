import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Ethics Questions & Study Guide 2026 | Free Practice',
  description: 'Master CFA Level 1 Ethics & Professional Standards with 250+ free practice questions, scenarios, and study tips. 15-20% of exam. Start practicing now!',
  keywords: 'cfa level 1 ethics questions, ethics cfa level 1, cfa ethics practice questions, cfa ethical and professional standards, cfa level 1 ethics sample questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/cfa-level-1-ethics',
  },
  openGraph: {
    title: 'CFA Level 1 Ethics Questions & Study Guide 2026',
    description: '250+ free ethics practice questions for CFA Level 1. Master the Code of Ethics and Standards of Professional Conduct.',
    url: 'https://www.analysttrainer.com/topics/cfa-level-1-ethics',
    type: 'article',
  },
}

export default function CFALevel1Ethics() {
  const ethicsTopics = [
    { title: 'Code of Ethics', questions: 40, percentage: '16%' },
    { title: 'Standards of Professional Conduct', questions: 80, percentage: '32%' },
    { title: 'Global Investment Performance Standards (GIPS)', questions: 50, percentage: '20%' },
    { title: 'Ethics Case Studies & Applications', questions: 80, percentage: '32%' },
  ]

  const commonScenarios = [
    {
      title: 'Material Nonpublic Information',
      description: 'Understanding when and how to use insider information',
      difficulty: 'High',
    },
    {
      title: 'Conflicts of Interest',
      description: 'Identifying and disclosing conflicts in client relationships',
      difficulty: 'Medium',
    },
    {
      title: 'Duties to Clients',
      description: 'Loyalty, prudence, and care responsibilities',
      difficulty: 'Medium',
    },
    {
      title: 'Investment Analysis & Recommendations',
      description: 'Diligence and reasonable basis requirements',
      difficulty: 'High',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is ethics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ethics and Professional Standards accounts for 15-20% of the CFA Level 1 exam, which translates to approximately 27-36 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the CFA ethics standards?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The CFA Institute Code of Ethics and Standards of Professional Conduct include seven main standards: Professionalism, Integrity of Capital Markets, Duties to Clients, Duties to Employers, Investment Analysis and Recommendations, Conflicts of Interest, and Responsibilities as a CFA Institute Member.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I study for CFA Level 1 ethics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Read the Standards of Practice Handbook thoroughly, practice with real-world scenarios, understand the reasoning behind each standard, and complete at least 100-150 practice questions focusing on application rather than memorization.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Topics', url: '/topics' },
        { name: 'Ethics', url: '/topics/cfa-level-1-ethics' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Ethics', url: '/topics/cfa-level-1-ethics' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-purple-700/50 rounded-full text-purple-200 text-sm font-medium mb-6">
              15-20% of Exam • 27-36 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Ethics & Professional Standards Study Guide
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Master the Code of Ethics and Standards of Professional Conduct with 250+ practice questions, real-world scenarios, and proven study strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=ethics"
                className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors"
              >
                Practice Ethics Questions
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Topic Breakdown */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Ethics Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ethicsTopics.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-purple-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions available</p>
                  <Link
                    href={`/cfa-level-1-practice-questions?topic=ethics&subtopic=${topic.title.toLowerCase()}`}
                    className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2"
                  >
                    Practice Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Scenarios */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Common Ethics Scenarios
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Master these high-frequency scenarios that appear regularly on the CFA Level 1 exam
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {commonScenarios.map((scenario) => (
                <div key={scenario.title} className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      scenario.difficulty === 'High'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600">{scenario.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Ace CFA Level 1 Ethics
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Read the Standards of Practice Handbook</h3>
                  <p className="text-gray-600">
                    Don't just memorize - understand the reasoning behind each standard. The CFA Institute provides the Standards of Practice Handbook for free.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice with Real Scenarios</h3>
                  <p className="text-gray-600">
                    Ethics questions test application, not memorization. Practice 100+ scenario-based questions to understand how standards apply in real situations.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Focus on High-Weight Topics</h3>
                  <p className="text-gray-600">
                    Standards of Professional Conduct (32%) and Case Studies (32%) make up the majority. Master these first.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Before Exam Day</h3>
                  <p className="text-gray-600">
                    Ethics is tested throughout the exam. Reviewing 2-3 days before ensures the standards are fresh in your mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Ethics Questions Now
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Access 250+ ethics practice questions with detailed explanations. Free trial includes 30 ethics questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-purple-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Ethics FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is ethics?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Ethics and Professional Standards accounts for 15-20% of the CFA Level 1 exam, which translates to approximately 27-36 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What are the CFA ethics standards?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  The CFA Institute Code of Ethics and Standards of Professional Conduct include seven main standards: Professionalism, Integrity of Capital Markets, Duties to Clients, Duties to Employers, Investment Analysis and Recommendations, Conflicts of Interest, and Responsibilities as a CFA Institute Member.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How do I study for CFA Level 1 ethics?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Read the Standards of Practice Handbook thoroughly, practice with real-world scenarios, understand the reasoning behind each standard, and complete at least 100-150 practice questions focusing on application rather than memorization.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-purple-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-purple-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-purple-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">Ethics Flashcards</h3>
                <p className="text-gray-600 text-sm">200+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
