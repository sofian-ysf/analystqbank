import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Quantitative Methods Questions & Study Guide 2026 | Free Practice',
  description: 'Master Quantitative Methods for CFA Level 1 (6-9% of exam) with 140+ practice questions. Learn time value of money, statistics, probability, and regression. Start free.',
  keywords: 'cfa level 1 quantitative methods questions, quant methods cfa practice, time value of money cfa, hypothesis testing cfa, cfa quantitative methods study guide',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/quantitative-methods',
  },
  openGraph: {
    title: 'CFA Level 1 Quantitative Methods Questions & Study Guide 2026',
    description: '140+ quantitative methods practice questions for CFA Level 1. Master TVM, statistics, probability, and hypothesis testing.',
    url: 'https://www.analysttrainer.com/topics/quantitative-methods',
    type: 'article',
  },
}

export default function QuantitativeMethodsTopicPage() {
  const topicBreakdown = [
    { title: 'Time Value of Money', questions: 30, percentage: '21%' },
    { title: 'Statistical Measures & Returns', questions: 25, percentage: '18%' },
    { title: 'Probability & Expectation', questions: 25, percentage: '18%' },
    { title: 'Hypothesis Testing', questions: 25, percentage: '18%' },
    { title: 'Linear Regression', questions: 20, percentage: '14%' },
    { title: 'Simulation & Big Data', questions: 15, percentage: '11%' },
  ]

  const commonConcepts = [
    {
      title: 'Time Value of Money',
      description: 'PV, FV, NPV calculations and annuity formulas',
      difficulty: 'High',
    },
    {
      title: 'Hypothesis Testing',
      description: 'Setting up H0/H1, test statistics, and decision rules',
      difficulty: 'High',
    },
    {
      title: 'Probability Trees',
      description: 'Conditional probability and joint expectations',
      difficulty: 'Medium',
    },
    {
      title: 'Regression Analysis',
      description: 'Interpreting R-squared, standard error, and coefficients',
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Quantitative Methods?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quantitative Methods represents 6-9% of the CFA Level 1 exam, translating to approximately 11-16 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need a strong math background for Quant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not necessarily. CFA quant requires algebra and basic statistics. If you understand percentages and can use a calculator efficiently, you can master it with practice.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most important Quant topic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Time Value of Money (TVM) is the foundation - it appears throughout the curriculum. Hypothesis testing and regression are also heavily tested.',
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
        { name: 'Quantitative Methods', url: '/topics/quantitative-methods' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Quantitative Methods', url: '/topics/quantitative-methods' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-blue-700/50 rounded-full text-blue-200 text-sm font-medium mb-6">
              6-9% of Exam • 11-16 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Quantitative Methods Study Guide
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Master time value of money, statistics, probability, and hypothesis testing with 140+ practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=quantitative-methods"
                className="px-8 py-4 bg-white text-blue-900 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Practice Quant Questions
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Topic Breakdown */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Quantitative Methods Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=quantitative-methods"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
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

        {/* Common Concepts */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Key Quantitative Methods Concepts
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Master these fundamental concepts that appear regularly on the CFA Level 1 exam
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {commonConcepts.map((concept) => (
                <div key={concept.title} className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{concept.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      concept.difficulty === 'High'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {concept.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Ace CFA Level 1 Quantitative Methods
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Your Calculator</h3>
                  <p className="text-gray-600">
                    The BA II Plus is essential. Learn TVM functions, cash flow calculations, and statistical registers. Being fast with your calculator saves precious exam time.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand TVM Visually</h3>
                  <p className="text-gray-600">
                    Draw time value of money problems as timelines. Once you visualize cash flows, the calculations become straightforward.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hypothesis Testing Logic</h3>
                  <p className="text-gray-600">
                    Focus on understanding the logic: null vs alternative, Type I/II errors, and p-value interpretation. The formula is just a tool once concepts are clear.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice Regression Interpretation</h3>
                  <p className="text-gray-600">
                    Regression questions often ask for interpretation, not calculation. Practice explaining R-squared, standard error, and coefficient significance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Quantitative Methods
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Access 140+ quantitative methods practice questions with detailed explanations. All paid plans include access to our full question bank.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-blue-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Quantitative Methods FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Quantitative Methods?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Quantitative Methods represents 6-9% of the CFA Level 1 exam, translating to approximately 11-16 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Do I need a strong math background for Quant?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Not necessarily. CFA quant requires algebra and basic statistics. If you understand percentages and can use a calculator efficiently, you can master it with practice.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the most important Quantitative Methods topic?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Time Value of Money (TVM) is the foundation - it appears throughout the curriculum. Hypothesis testing and regression are also heavily tested.
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
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-blue-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-blue-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-blue-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Quant Flashcards</h3>
                <p className="text-gray-600 text-sm">120+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
