import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'

export const metadata: Metadata = {
  title: 'Best CFA Level 1 Books & Study Materials 2026 | Expert Reviews',
  description: 'Discover the best CFA Level 1 books and study materials for 2026. Compare Kaplan, Schweser, and AnalystTrainer. Expert reviews of CFA prep books and resources.',
  keywords: 'cfa level 1 books, cfa study materials, cfa level 1 books to read, best cfa prep books, kaplan cfa level 1, schweser cfa level 1, cfa curriculum books, cfa exam study materials',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-books',
  },
  openGraph: {
    title: 'Best CFA Level 1 Books & Study Materials 2026',
    description: 'Top-rated CFA Level 1 books and study materials. Compare Kaplan, Schweser, and more.',
    url: 'https://www.analysttrainer.com/cfa-level-1-books',
    type: 'website',
  },
}

export default function CFALevel1Books() {
  const bookCategories = [
    {
      title: 'CFA Institute Curriculum',
      description: 'The official CFA Institute readings are the gold standard. Every exam question is based on these materials.',
      features: ['Complete curriculum coverage', 'Written by CFA Institute', 'Updated annually', 'Includes practice questions'],
      link: 'https://www.cfainstitute.org',
      linkText: 'Purchase from CFA Institute'
    },
    {
      title: 'Kaplan Schweser',
      description: 'One of the most popular third-party CFA prep providers. Known for concise summaries and practice questions.',
      features: ['Condensed study notes', 'Question bank access', 'Video lectures', 'Mobile app'],
      link: 'https://www.schweser.com',
      linkText: 'Visit Kaplan Schweser'
    },
    {
      title: 'AnalystPrep',
      description: 'Comprehensive prep provider with a focus on practice questions and mock exams.',
      features: ['Large question bank', 'Performance tracking', 'Affordable pricing', 'Mobile-friendly'],
      link: 'https://www.analystprep.com',
      linkText: 'Visit AnalystPrep'
    },
    {
      title: 'Wiley Efficient Learning',
      description: 'Established financial education provider with detailed study materials and excellent support.',
      features: ['Comprehensive notes', 'Expert instructors', 'Adaptive learning', 'Pass guarantee'],
      link: 'https://www.efficientlearning.com',
      linkText: 'Visit Wiley'
    }
  ]

  const essentialBooks = [
    { name: 'CFA Program Curriculum 2026', provider: 'CFA Institute', description: 'Official readings for all 10 topics', essential: true },
    { name: 'SchweserNotes Level 1', provider: 'Kaplan', description: 'Concise summaries of curriculum', essential: true },
    { name: 'QBank Questions', provider: 'Various', description: '2,500+ practice questions', essential: true },
    { name: 'Mock Exams', provider: 'Various', description: 'Full-length simulated exams', essential: true },
    { name: 'Formula Sheet', provider: 'Various', description: 'Quick reference for formulas', essential: false },
    { name: 'Flashcards', provider: 'AnalystTrainer', description: '1,600+ spaced repetition cards', essential: false },
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
                name: 'What are the best CFA Level 1 books?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The best CFA Level 1 books include the official CFA Institute curriculum, Kaplan SchweserNotes, and AnalystTrainer practice questions. Most successful candidates use a combination of official materials and third-party question banks.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to buy CFA books to pass?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'While the official CFA Institute curriculum is the most comprehensive resource, many candidates pass using a combination of third-party study notes (like Kaplan Schweser) and practice questions. Practice questions are generally considered more valuable than passive reading.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many CFA books do I need for Level 1?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most candidates use 2-3 resources: a set of study notes (e.g., Kaplan Schweser), a question bank (2,000+ questions), and mock exams. The official CFA curriculum is comprehensive but lengthy; third-party summaries are popular for their conciseness.',
                },
              },
            ],
          })
        }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'CFA Level 1 Books', url: '/cfa-level-1-books' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Study Materials', url: '/cfa-level-1-books' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-[#1FB8CD]/20 rounded-full text-[#1FB8CD] text-sm font-medium mb-6">
              Study Resources
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Best CFA Level 1 Books & Study Materials
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Expert reviews of the best CFA Level 1 books and study materials to help you pass your exam on the first attempt.
            </p>
          </div>
        </section>

        {/* Essential Materials */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Essential CFA Level 1 Materials
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Every CFA candidate needs these core study materials for comprehensive exam preparation.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {essentialBooks.map((book) => (
                <div key={book.name} className={`p-6 rounded-xl border ${book.essential ? 'border-[#1FB8CD] bg-[#1FB8CD]/5' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{book.name}</h3>
                    {book.essential && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Essential
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{book.provider}</p>
                  <p className="text-sm text-gray-500">{book.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Categories */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              CFA Level 1 Prep Providers
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {bookCategories.map((category) => (
                <div key={category.title} className="bg-white p-8 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={category.link}
                    className="inline-flex items-center gap-2 text-[#1FB8CD] font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {category.linkText}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Approach */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Recommended Study Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1FB8CD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1FB8CD]">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Read Study Materials</h3>
                <p className="text-gray-600">Use Kaplan SchweserNotes or the official curriculum to understand concepts. Focus on one topic area at a time.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1FB8CD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1FB8CD]">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Questions</h3>
                <p className="text-gray-600">After reading each topic, complete 50-100 practice questions to test your understanding and identify knowledge gaps.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1FB8CD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1FB8CD]">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mock Exams</h3>
                <p className="text-gray-600">Take full-length mock exams 6-8 weeks before your exam date. Review results and focus on weak areas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Want to Try AnalystTrainer?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Access 2,500+ practice questions and realistic mock exams. Compare our questions to other CFA prep providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/compare/kaplan-schweser-vs-analysttrainer"
                className="inline-block px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Compare Providers
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
                  What are the best CFA Level 1 books?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">The best CFA Level 1 books include the official CFA Institute curriculum, Kaplan SchweserNotes, and AnalystTrainer practice questions. Most successful candidates use a combination of official materials and third-party question banks. The official curriculum is the most comprehensive, while third-party providers offer more concise summaries and better practice questions.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Do I need to buy CFA books to pass?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">While the official CFA Institute curriculum is the most comprehensive resource, many candidates pass using a combination of third-party study notes (like Kaplan Schweser) and practice questions. Practice questions are generally considered more valuable than passive reading, so focus on getting quality question bank access.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many CFA books do I need for Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Most candidates use 2-3 resources: a set of study notes (e.g., Kaplan Schweser), a question bank (2,000+ questions), and mock exams. The official CFA curriculum is comprehensive but lengthy; third-party summaries are popular for their conciseness. Quality matters more than quantity—mastering one good resource is better than skimming many.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Is Kaplan Schweser enough for CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Kaplan SchweserNotes are a popular choice and can be sufficient if combined with extensive practice questions. However, many candidates find that Schweser notes alone aren't enough—pairing them with a quality question bank (like AnalystTrainer or the official CFA curriculum questions) significantly improves pass rates.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 bg-gray-50 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-exam-dates" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Exam Dates</h3>
                <p className="text-gray-600 text-sm">Find the next CFA exam dates and registration deadlines</p>
              </Link>
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ CFA practice questions with detailed explanations</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question mock exams in real exam format</p>
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