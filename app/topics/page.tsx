import { Metadata } from 'next'
import Link from 'next/link'
import { cfaLevel1Curriculum, getTotalSubtopics, getTotalLearningOutcomes } from '@/lib/curriculum-data'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'

// Inline SVG icons for server components (avoids Phosphor icons createContext issue)
const TopicIcon = ({ topicId, size = 40 }: { topicId: string; size?: number }) => {
  const icons: Record<string, React.ReactNode> = {
    'ethical-professional-standards': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
    'quantitative-methods': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    'economics': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    'financial-statement-analysis': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    'corporate-issuers': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    'equity-investments': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    'fixed-income': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    'derivatives': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
    'alternative-investments': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    'portfolio-management': <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  }
  return icons[topicId] || <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
}

export const metadata: Metadata = {
  title: 'CFA Level 1 Topics 2026 | All 10 Exam Areas Explained',
  description: `Study all 10 CFA Level 1 topics with ${getTotalSubtopics()} subtopics and ${getTotalLearningOutcomes()}+ learning outcomes. Free practice questions for each topic. Start studying today.`,
  keywords: 'CFA Level 1 topics, CFA curriculum 2026, CFA study guide, CFA exam topics, CFA Level 1 syllabus, ethics CFA, quantitative methods CFA, financial statement analysis CFA',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics',
  },
  openGraph: {
    title: 'CFA Level 1 Topics 2026 | All 10 Exam Areas Explained',
    description: 'Master all 10 CFA Level 1 topic areas with practice questions and study guides. Ethics, Quant, Economics, FSA, and more.',
    url: 'https://www.analysttrainer.com/topics',
    type: 'website',
  },
}

// JSON-LD structured data for the topics page
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'CFA Level 1 Curriculum Topics',
  description: 'Complete list of all 10 CFA Level 1 topic areas with study materials and practice questions',
  numberOfItems: cfaLevel1Curriculum.length,
  itemListElement: cfaLevel1Curriculum.map((topic, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Course',
      name: `CFA Level 1: ${topic.name}`,
      description: topic.description,
      provider: {
        '@type': 'Organization',
        name: 'AnalystTrainer',
        url: 'https://www.analysttrainer.com',
      },
      url: `https://www.analysttrainer.com/topics/${topic.id}`,
    },
  })),
}

export default function TopicsPage() {
  const totalQuestions = cfaLevel1Curriculum.reduce((sum, topic) => sum + topic.questionCount, 0)
  const totalSubtopics = getTotalSubtopics()
  const totalLearningOutcomes = getTotalLearningOutcomes()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B]">
                  Pricing
                </Link>
                <Link href="/features" className="text-[#5f6368] hover:text-[#13343B]">
                  Features
                </Link>
                <Link href="/login" className="text-[#5f6368] hover:text-[#13343B]">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#9aa0a6]">
              <li>
                <Link href="/" className="hover:text-[#5f6368]">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">Topics</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              CFA Level 1 Topics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master all 10 CFA Level 1 topic areas with our comprehensive study materials,
              practice questions, and expert explanations aligned with the 2025/2026 curriculum.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-blue-600">10</div>
                <div className="text-sm text-gray-600">Topic Areas</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-green-600">{totalSubtopics}</div>
                <div className="text-sm text-gray-600">Subtopics</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-purple-600">{totalLearningOutcomes}+</div>
                <div className="text-sm text-gray-600">Learning Outcomes</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-orange-600">{totalQuestions.toLocaleString()}+</div>
                <div className="text-sm text-gray-600">Practice Questions</div>
              </div>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {cfaLevel1Curriculum.map((topic, index) => {
              const topicLearningOutcomes = topic.subtopics.reduce(
                (sum, subtopic) => sum + subtopic.learningOutcomes,
                0
              )

              return (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className="group block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl"><TopicIcon topicId={topic.id} size={40} /></span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-[#9aa0a6]">
                          Topic {index + 1}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${topic.color} text-white`}>
                          {topic.examWeight}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-[#13343B] group-hover:text-blue-600 transition mb-2">
                        {topic.name}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">
                        {topic.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center text-[#9aa0a6]">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          {topic.subtopics.length} subtopics
                        </span>
                        <span className="inline-flex items-center text-[#9aa0a6]">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          {topicLearningOutcomes} learning outcomes
                        </span>
                        <span className="inline-flex items-center text-[#9aa0a6]">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {topic.questionCount}+ questions
                        </span>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Exam Weight Distribution */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#13343B] mb-6 text-center">
              CFA Level 1 Exam Weight Distribution
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Topic</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-medium">Exam Weight</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-medium">Est. Questions</th>
                    <th className="text-center py-3 px-4 text-gray-600 font-medium">Subtopics</th>
                  </tr>
                </thead>
                <tbody>
                  {cfaLevel1Curriculum.map((topic) => (
                    <tr key={topic.id} className="border-b border-gray-100 hover:bg-[#FBFAF4]">
                      <td className="py-3 px-4">
                        <Link
                          href={`/topics/${topic.id}`}
                          className="flex items-center gap-2 text-gray-900 hover:text-blue-600"
                        >
                          <span><TopicIcon topicId={topic.id} size={20} /></span>
                          <span>{topic.name}</span>
                        </Link>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${topic.color} text-white`}>
                          {topic.examWeight}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600">
                        {Math.round(180 * (parseInt(topic.examWeight.split('-')[0]) / 100))}-
                        {Math.round(180 * (parseInt(topic.examWeight.split('-')[1]) / 100))}
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600">
                        {topic.subtopics.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#FBFAF4] font-medium">
                    <td className="py-3 px-4 text-gray-900">Total</td>
                    <td className="text-center py-3 px-4 text-gray-900">100%</td>
                    <td className="text-center py-3 px-4 text-gray-900">180</td>
                    <td className="text-center py-3 px-4 text-gray-900">{totalSubtopics}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your CFA Journey?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join 50,000+ candidates who have used AnalystTrainer to pass their CFA exams.
              Get access to {totalQuestions.toLocaleString()}+ practice questions with detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get Started
              </Link>
              <Link
                href="/pricing"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
              >
                View Pricing
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Topics</h3>
                <ul className="space-y-2 text-sm">
                  {cfaLevel1Curriculum.slice(0, 5).map((topic) => (
                    <li key={topic.id}>
                      <Link href={`/topics/${topic.id}`} className="hover:text-white transition">
                        {topic.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">More Topics</h3>
                <ul className="space-y-2 text-sm">
                  {cfaLevel1Curriculum.slice(5).map((topic) => (
                    <li key={topic.id}>
                      <Link href={`/topics/${topic.id}`} className="hover:text-white transition">
                        {topic.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/mock-exams" className="hover:text-white transition">Mock Exams</Link></li>
                  <li><Link href="/question-bank" className="hover:text-white transition">Question Bank</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} AnalystTrainer. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <FloatingGetStartedButton />
      </div>
    </>
  )
}
