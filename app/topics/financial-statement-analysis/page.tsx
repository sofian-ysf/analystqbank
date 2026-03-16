import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Financial Statement Analysis Guide 2026 | 350+ Questions',
  description: 'Master Financial Statement Analysis for CFA Level 1. 350+ practice questions covering balance sheets, income statements, cash flow, and ratio analysis. 11-14% of exam.',
  keywords: 'cfa financial statement analysis, financial statement analysis cfa level 1, cfa level 1 fsa, balance sheet analysis cfa, ratio analysis cfa',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/financial-statement-analysis',
  },
  openGraph: {
    title: 'CFA Level 1 Financial Statement Analysis Guide 2026',
    description: '350+ FSA practice questions for CFA Level 1. Master financial reporting, analysis techniques, and ratio calculations.',
    url: 'https://www.analysttrainer.com/topics/financial-statement-analysis',
    type: 'article',
  },
}

export default function FinancialStatementAnalysis() {
  const fsaTopics = [
    { title: 'Financial Reporting Standards', questions: 50, weight: '14%' },
    { title: 'Income Statement & Balance Sheet', questions: 100, weight: '29%' },
    { title: 'Cash Flow Statement', questions: 70, weight: '20%' },
    { title: 'Financial Analysis Techniques', questions: 80, weight: '23%' },
    { title: 'Inventory & Long-Lived Assets', questions: 50, weight: '14%' },
  ]

  const keyRatios = [
    { category: 'Liquidity', ratios: ['Current Ratio', 'Quick Ratio', 'Cash Ratio'] },
    { category: 'Profitability', ratios: ['ROE', 'ROA', 'Profit Margin', 'Gross Margin'] },
    { category: 'Leverage', ratios: ['Debt-to-Equity', 'Debt-to-Assets', 'Interest Coverage'] },
    { category: 'Efficiency', ratios: ['Asset Turnover', 'Inventory Turnover', 'Receivables Turnover'] },
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Topics', url: '/topics' },
        { name: 'Financial Statement Analysis', url: '/topics/financial-statement-analysis' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'FSA', url: '/topics/financial-statement-analysis' }
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-blue-700/50 rounded-full text-blue-200 text-sm font-medium mb-6">
              11-14% of Exam • 20-25 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Financial Statement Analysis Study Guide
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Master balance sheets, income statements, cash flow analysis, and financial ratios with 350+ practice questions and comprehensive explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=fsa"
                className="px-8 py-4 bg-white text-blue-900 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Practice FSA Questions
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
              FSA Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {fsaTopics.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {topic.weight}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=fsa"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
                  >
                    Start Practicing
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Ratios */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Essential Financial Ratios to Master
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              These ratios appear frequently on the CFA exam - know the formulas and interpretations
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyRatios.map((category) => (
                <div key={category.category} className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.ratios.map((ratio) => (
                      <li key={ratio} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{ratio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Master FSA for CFA Level 1
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand, Don't Memorize</h3>
                  <p className="text-gray-600">
                    Focus on understanding how financial statements connect rather than memorizing formulas. Know why ratios matter, not just how to calculate them.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master the Cash Flow Statement</h3>
                  <p className="text-gray-600">
                    The indirect method of cash flow preparation appears frequently. Practice reconciling net income to cash flow from operations.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice Ratio Analysis</h3>
                  <p className="text-gray-600">
                    Know how to calculate AND interpret key ratios. Understand what drives changes in ROE, current ratio, and asset turnover.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn Financial Reporting Standards</h3>
                  <p className="text-gray-600">
                    Understand differences between IFRS and US GAAP. Focus on revenue recognition, inventory methods (FIFO vs LIFO), and depreciation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Master Financial Statement Analysis?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Access 350+ FSA practice questions with step-by-step solutions. Free trial includes 40 FSA questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Start Practicing Free
            </Link>
            <p className="mt-4 text-blue-200 text-sm">No credit card required • Instant access</p>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/topics/corporate-issuers" className="p-6 bg-white rounded-xl border hover:border-blue-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Corporate Issuers</h3>
                <p className="text-gray-600 text-sm">200+ questions on corporate governance</p>
              </Link>
              <Link href="/topics/equity-investments" className="p-6 bg-white rounded-xl border hover:border-blue-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Equity Investments</h3>
                <p className="text-gray-600 text-sm">300+ equity valuation questions</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-blue-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Test your FSA knowledge</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
