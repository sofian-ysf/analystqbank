import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Ethics Practice Questions (2026) | Free Ethics Scenarios',
  description: 'Practice 300+ CFA Level 1 Ethics questions with detailed explanations. Includes Code of Ethics, Standards I-VII, and GIPS scenarios. Free trial available.',
  keywords: 'cfa level 1 ethics practice questions, cfa ethics scenarios, cfa ethics questions free, cfa level 1 ethics sample questions, cfa code and standards practice',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-ethics-questions',
  },
  openGraph: {
    title: 'CFA Level 1 Ethics Practice Questions (2026)',
    description: '300+ ethics practice questions for CFA Level 1. Master the Code of Ethics and Standards of Professional Conduct.',
    url: 'https://www.analysttrainer.com/cfa-level-1-ethics-questions',
    type: 'article',
  },
}

const sampleQuestions = [
  {
    question: "A CFA charterholder discovers that her firm is overstating quarterly earnings by incorrectly classifying operating expenses as capital expenditures. According to the Standards of Professional Conduct, what is her BEST course of action?",
    options: [
      "Report the issue to the firm's compliance department and give the firm 30 days to rectify",
      "Dissociate from the misconduct by resigning from the firm immediately",
      "Report the violation to the CFA Institute Professional Conduct Program",
      "Consult with legal counsel and then report to the appropriate parties"
    ],
    correctAnswer: 3,
    explanation: "When a member discovers a violation, they must report to the appropriate parties. The Standards require members to bring allegations of violations to the CFA Institute only after exhausting internal procedures. Consulting legal counsel first is prudent given potential legal implications, then reporting to appropriate parties (compliance, legal, regulators) is the proper approach."
  },
  {
    question: "An investment advisor recommends buying shares of a company where her firm is serving as financial advisor for an upcoming IPO. She does not disclose this conflict of interest to clients. Which Standard is VIOLATED?",
    options: [
      "Standard IIIA - Duties to Clients (Loyalty)",
      "Standard IIIB - Duties to Clients (Prudence and Care)",
      "Standard VI - Conflicts of Interest",
      "Standard I - Professionalism"
    ],
    correctAnswer: 2,
    explanation: "Standard VI(A) requires disclosure of conflicts of interest. Failing to disclose that her firm is involved in an IPO for a recommended company is a clear conflict that must be disclosed. Standard IIIA could also apply, but the direct violation is VI - Conflicts of Interest."
  },
  {
    question: "According to the Global Investment Performance Standards (GIPS), which of the following is REQUIRED for a firm to claim GIPS compliance?",
    options: [
      "The firm must verify all composite performance",
      "The firm must have a minimum of $100 million in assets under management",
      "The firm must maintain its compliance records for at least 5 years",
      "The firm must present its performance in euros or the firm's base currency"
    ],
    correctAnswer: 3,
    explanation: "GIPS require that performance be presented in the firm's base currency (or convert with clear documentation). Verification is optional, there are no AUM minimums, and records must be kept for at least 5 years but this is not a requirement to CLAIM compliance."
  },
  {
    question: "A portfolio manager is considering a trade that would benefit her department's performance bonuses but would disadvantage her clients. This is an example of:",
    options: [
      "Standard IIIB violation only",
      "Standard VI(B) conflict of interest",
      "Both Standard IIIB and Standard VI violation",
      "No violation if disclosed to clients"
    ],
    correctAnswer: 2,
    explanation: "This violates both Standards. Standard IIIB (Duties to Clients - Prudence and Care) requires acting in the best interest of clients. Standard VI(B) prohibits member from intentionally misleading clients. Even if disclosed, placing personal/ departmental interests above client interests is a violation."
  },
  {
    question: "Under Standard I(D) - Misconduct, a member is found guilty of a personal bankruptcy filing. Which statement BEST describes the CFA Institute's response?",
    options: [
      "Automatic suspension of the CFA charter",
      "Investigation and possible disciplinary action based on severity",
      "No action since it's a personal matter unrelated to professional conduct",
      "Immediate revocation of membership"
    ],
    correctAnswer: 1,
    explanation: "Standard I(D) states that a member's conduct must not gloriously damage the integrity of the investment profession or otherwise reflect adversely on their integrity. Personal conduct like bankruptcy can trigger investigation and disciplinary action if it reflects adversely on the profession, even though it's a personal matter."
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many ethics questions should I practice for CFA Level 1?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend completing 150-300 ethics practice questions. With ethics representing 15-20% of the exam (27-36 questions), thorough practice is essential. Focus on understanding application rather than memorization.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most commonly tested ethics standards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standards I (Professionalism), II (Integrity of Capital Markets), III (Duties to Clients), and IV (Duties to Employers) appear most frequently. Conflicts of interest and material nonpublic information questions are heavily tested.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I practice ethics scenarios effectively?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Read each scenario carefully and identify: (1) who is involved, (2) what the conflict or issue is, (3) which Standard applies, and (4) what the correct response should be. Focus on understanding WHY an answer is correct, not just memorizing rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is GIPS really required for CFA Level 1?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, GIPS (Global Investment Performance Standards) is tested regularly. Understand the key requirements: firm definition, composite construction, verification (optional but encouraged), and disclosure requirements.',
      },
    },
  ],
}

export default function EthicsPracticeQuestionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Practice Questions', url: '/cfa-level-1-practice-questions' },
        { name: 'Ethics', url: '/cfa-level-1-ethics-questions' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Practice Questions', url: '/cfa-level-1-practice-questions' },
              { name: 'Ethics', url: '/cfa-level-1-ethics-questions' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-purple-700/50 rounded-full text-purple-200 text-sm font-medium mb-6">
              300+ Practice Questions • Free Sample Available
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Ethics Practice Questions
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Master the Code of Ethics and Standards of Professional Conduct with 300+ scenario-based practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/cfa-level-1-practice-questions?topic=ethics"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Browse All Ethics Questions
              </Link>
            </div>
          </div>
        </section>

        {/* Sample Questions */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                Free Sample Questions
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Try These Ethics Questions
              </h2>
              <p className="text-gray-600">
                No login required • Detailed explanations included
              </p>
            </div>

            <div className="space-y-8">
              {sampleQuestions.map((q, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-lg font-medium text-gray-900 leading-relaxed">
                      {q.question}
                    </p>
                  </div>

                  <div className="space-y-3 ml-11">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          optIndex === q.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-white hover:border-purple-300'
                        }`}
                      >
                        <span className={`font-medium ${
                          optIndex === q.correctAnswer ? 'text-green-700' : 'text-gray-700'
                        }`}>
                          {String.fromCharCode(65 + optIndex)}.
                        </span>{' '}
                        <span className={optIndex === q.correctAnswer ? 'text-green-700' : 'text-gray-700'}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 ml-11 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="font-semibold text-purple-900 mb-2">Explanation:</p>
                    <p className="text-gray-700">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready for 300+ More Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get access to our full question bank with detailed explanations, performance tracking, and custom quizzes.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition-colors"
            >
              Get Started
            </Link>
            <p className="mt-4 text-gray-500 text-sm">No credit card required • 15 free demo questions</p>
          </div>
        </section>

        {/* Topics Covered */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Ethics Topics Covered
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Code of Ethics & Standards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Seven Standards of Professional Conduct
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Code of Ethics interpretation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Member responsibilities
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Enhanced productivity requirements
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Scenarios</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Material nonpublic information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Conflicts of interest
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Research Objectivity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Client priority rules
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">GIPS Standards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Composite definition rules
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Firm definition requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Performance calculation methods
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Disclosure and presentation
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Practice</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Real-world case studies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Violation identification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Correct response selection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    remediation procedures
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-white rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many ethics questions should I practice?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  We recommend completing 150-300 ethics practice questions. With ethics representing 15-20% of the exam (27-36 questions), thorough practice is essential. Focus on understanding application rather than memorization.
                </p>
              </details>
              <details className="group bg-white rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What are the most commonly tested ethics standards?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Standards I (Professionalism), II (Integrity of Capital Markets), III (Duties to Clients), and IV (Duties to Employers) appear most frequently. Conflicts of interest and material nonpublic information questions are heavily tested.
                </p>
              </details>
              <details className="group bg-white rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How do I practice ethics scenarios effectively?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Read each scenario carefully and identify: (1) who is involved, (2) what the conflict or issue is, (3) which Standard applies, and (4) what the correct response should be. Focus on understanding WHY an answer is correct, not just memorizing rules.
                </p>
              </details>
              <details className="group bg-white rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Is GIPS really required for CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes, GIPS (Global Investment Performance Standards) is tested regularly. Understand the key requirements: firm definition, composite construction, verification (optional but encouraged), and disclosure requirements.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/topics/ethical-professional-standards" className="p-6 bg-white rounded-xl border hover:border-purple-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">Ethics Study Guide</h3>
                <p className="text-gray-600 text-sm">Complete topic overview and study strategies</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-purple-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams with ethics sections</p>
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
