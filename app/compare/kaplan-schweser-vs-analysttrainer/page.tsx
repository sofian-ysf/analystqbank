import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'
import FloatingGetStartedButton from '../../components/FloatingGetStartedButton'

export const metadata: Metadata = {
  title: 'Kaplan Schweser vs AnalystTrainer | Best CFA Level 1 Prep 2026',
  description: 'Compare Kaplan Schweser vs AnalystTrainer for CFA Level 1 exam prep. See question quality, pricing, features, and which provider helps candidates pass faster.',
  keywords: 'kaplan cfa level 1, schweser cfa level 1, kaplan vs analysttrainer, cfa prep comparison, kaplan schweser review, cfa study materials comparison, cfa level 1 prep provider comparison',
  alternates: {
    canonical: 'https://www.analysttrainer.com/compare/kaplan-schweser-vs-analysttrainer',
  },
  openGraph: {
    title: 'Kaplan Schweser vs AnalystTrainer | CFA Level 1 Prep Comparison',
    description: 'Compare Kaplan Schweser vs AnalystTrainer for CFA Level 1. Which helps you pass faster?',
    url: 'https://www.analysttrainer.com/compare/kaplan-schweser-vs-analysttrainer',
    type: 'website',
  },
}

export default function KaplanSchweserVsAnalystTrainer() {
  const comparisonPoints = [
    {
      feature: 'Practice Questions',
      analystTrainer: '2,500+ questions with detailed explanations',
      kaplan: '1,000+ questions in QBank',
      winner: 'AnalystTrainer'
    },
    {
      feature: 'Question Quality',
      analystTrainer: 'Written by charterholders, exam-realistic difficulty',
      kaplan: 'Good quality, some outdated questions',
      winner: 'AnalystTrainer'
    },
    {
      feature: 'Mock Exams',
      analystTrainer: 'Unlimited with real exam timing',
      kaplan: '5 included, additional purchase required',
      winner: 'AnalystTrainer'
    },
    {
      feature: 'Study Notes',
      analystTrainer: 'Focus on practice, concise concept reviews',
      kaplan: 'Comprehensive 5-volume SchweserNotes',
      winner: 'Kaplan'
    },
    {
      feature: 'Explanations',
      analystTrainer: 'Step-by-step with formula references',
      kaplan: 'Good explanations, some too brief',
      winner: 'AnalystTrainer'
    },
    {
      feature: 'Pricing',
      analystTrainer: 'From £25 lifetime access',
      kaplan: 'From £300+ for packages',
      winner: 'AnalystTrainer'
    },
    {
      feature: 'Mobile Access',
      analystTrainer: 'Fully responsive web app',
      kaplan: 'Mobile app available',
      winner: 'Tie'
    },
    {
      feature: 'Performance Analytics',
      analystTrainer: 'Topic-by-topic tracking, weak area identification',
      kaplan: 'Basic progress tracking',
      winner: 'AnalystTrainer'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is Kaplan Schweser better than AnalystTrainer for CFA Level 1?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'AnalystTrainer offers more practice questions (2,500+ vs 1,000+), better pricing, and more detailed analytics. Kaplan Schweser offers more comprehensive study notes. For most candidates, AnalystTrainer provides better value, especially for question practice.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use both Kaplan Schweser and AnalystTrainer together?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Many candidates use Kaplan SchweserNotes for concept learning and AnalystTrainer for practice questions. This combines the strengths of both providers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which CFA prep provider has better practice questions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'AnalystTrainer has more practice questions (2,500+) with more detailed explanations and better performance analytics. Kaplan Schweser has around 1,000 questions. For pure question practice, AnalystTrainer is the better choice.',
                },
              },
            ],
          })
        }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Compare', url: '/compare' },
        { name: 'Kaplan Schweser vs AnalystTrainer', url: '/compare/kaplan-schweser-vs-analysttrainer' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Compare', url: '/compare' },
              { name: 'Kaplan Schweser vs AnalystTrainer', url: '/compare/kaplan-schweser-vs-analysttrainer' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-[#1FB8CD]/20 rounded-full text-[#1FB8CD] text-sm font-medium mb-6">
              Provider Comparison
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Kaplan Schweser vs AnalystTrainer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Compare the two leading CFA Level 1 prep providers. Which one helps you pass faster?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
              >
                Try AnalystTrainer Free
              </Link>
              <Link
                href="/cfa-level-1-books"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View All Study Materials
              </Link>
            </div>
          </div>
        </section>

        {/* Winner Summary */}
        <section className="py-20 px-4 bg-green-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold mb-6">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              AnalystTrainer Wins Overall
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Better Questions. Better Value. Better Results.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              With 2,500+ practice questions, unlimited mock exams, and lifetime access from £25, AnalystTrainer provides exceptional value for CFA Level 1 candidates.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <div className="text-3xl font-bold text-[#1FB8CD] mb-2">2,500+</div>
                <div className="text-gray-600">Practice Questions</div>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="text-3xl font-bold text-[#1FB8CD] mb-2">Unlimited</div>
                <div className="text-gray-600">Mock Exams</div>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="text-3xl font-bold text-[#1FB8CD] mb-2">£25</div>
                <div className="text-gray-600">Lifetime Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Feature-by-Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-left py-4 px-4 font-semibold text-[#1FB8CD]">AnalystTrainer</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600">Kaplan Schweser</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, index) => (
                    <tr key={point.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-4 px-4 font-medium text-gray-900">{point.feature}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{point.analystTrainer}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{point.kaplan}</td>
                      <td className="py-4 px-4 text-center">
                        {point.winner === 'AnalystTrainer' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">AnalystTrainer</span>
                        )}
                        {point.winner === 'Kaplan' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">Kaplan</span>
                        )}
                        {point.winner === 'Tie' && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">Tie</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Detailed Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* AnalystTrainer */}
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1FB8CD] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">AnalystTrainer</h3>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>2,500+ practice questions (2.5x more than Kaplan)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Unlimited mock exams included</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Lifetime access from £25 (12x cheaper)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Detailed analytics and weak area tracking</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Step-by-step explanations with formulas</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>No comprehensive study notes (focused on practice)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Kaplan Schweser */}
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Kaplan Schweser</h3>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Comprehensive 5-volume SchweserNotes</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Well-established brand with decades of experience</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Video lectures and instructor support</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Desktop and mobile apps</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Expensive: £300+ for full packages</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Fewer practice questions (1,000+ vs 2,500+)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Limited mock exams without additional purchase</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Basic performance analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Choose the Better Option?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 15,000+ candidates who chose AnalystTrainer for their CFA Level 1 prep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/cfa-level-1-books"
                className="inline-block px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View All Study Materials
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Is Kaplan Schweser better than AnalystTrainer for CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">AnalystTrainer offers more practice questions (2,500+ vs 1,000+), better pricing (from £25 vs £300+), and more detailed analytics. Kaplan Schweser offers more comprehensive study notes. For most candidates focused on passing the exam, AnalystTrainer provides better value.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Can I use both Kaplan Schweser and AnalystTrainer together?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Yes! Many candidates use Kaplan SchweserNotes for concept learning and AnalystTrainer for practice questions. This combines the strengths of both providers—the comprehensive study notes from Kaplan with the superior question bank from AnalystTrainer.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Which CFA prep provider has better practice questions?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">AnalystTrainer has more practice questions (2,500+) with more detailed explanations and better performance analytics. Kaplan Schweser has around 1,000 questions. For pure question practice and learning from explanations, AnalystTrainer is the better choice.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much does Kaplan Schweser cost for CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Kaplan Schweser packages start at around £300 for basic packages and can go up to £1,000+ for premium packages with video lectures and tutoring. AnalystTrainer offers lifetime access from just £25, making it significantly more affordable.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Do I need study notes if I have practice questions?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Most candidates benefit from some form of concept review before doing practice questions. However, extensive study notes are less necessary if you're using quality practice questions with detailed explanations, as you learn concepts through the questions themselves. Many AnalystTrainer users pass with minimal additional study materials.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 bg-gray-50 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ CFA practice questions with detailed explanations</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question mock exams in real exam format</p>
              </Link>
              <Link href="/cfa-level-1-books" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Study Materials</h3>
                <p className="text-gray-600 text-sm">Best CFA Level 1 books and prep materials</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <Link href="/" className="text-xl font-bold text-gray-900">AnalystTrainer</Link>
                <p className="mt-4 text-sm text-gray-600">
                  The leading platform for CFA Level 1 exam preparation.
                </p>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/cfa-level-1-practice-questions" className="hover:text-gray-900">Practice Questions</Link></li>
                  <li><Link href="/cfa-level-1-mock-exam" className="hover:text-gray-900">Mock Exams</Link></li>
                  <li><Link href="/flashcards" className="hover:text-gray-900">Free Flashcards</Link></li>
                  <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                  <li><Link href="/topics" className="hover:text-gray-900">Study Topics</Link></li>
                  <li><Link href="/free-cfa-questions" className="hover:text-gray-900">Free Questions</Link></li>
                </ul>
              </div>
   <div>
                <h4 className="mb-4 font-semibold text-gray-900">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                  <li><Link href="/refund" className="hover:text-gray-900">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>© 2026 AnalystTrainer. All rights reserved.</p>
              <p className="mt-2">Not affiliated with or endorsed by the CFA Institute.</p>
            </div>
          </div>
        </footer>

        <FloatingGetStartedButton />
      </main>
    </>
  )
}