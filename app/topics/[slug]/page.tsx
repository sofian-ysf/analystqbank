import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cfaLevel1Curriculum } from '@/lib/curriculum'

// Generate static params for all topics
export async function generateStaticParams() {
  return cfaLevel1Curriculum.map((topic) => ({
    slug: topic.id,
  }))
}

// Generate metadata for each topic page
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = cfaLevel1Curriculum.find((t) => t.id === slug)

  if (!topic) {
    return {
      title: 'Topic Not Found',
    }
  }

  const totalLearningOutcomes = topic.subtopics.reduce(
    (sum, subtopic) => sum + subtopic.learningOutcomes,
    0
  )

  return {
    title: `${topic.name} | CFA Level 1 Study Guide`,
    description: `Master ${topic.name} for CFA Level 1 with ${topic.subtopics.length} subtopics and ${totalLearningOutcomes}+ learning outcomes. Practice questions, study notes, and exam preparation materials.`,
    keywords: `${topic.name}, CFA Level 1 ${topic.name}, ${topic.subtopics.map(s => s.name).join(', ')}, CFA exam preparation`,
    alternates: {
      canonical: `https://financeexamprep.co.uk/topics/${slug}`,
    },
    openGraph: {
      title: `${topic.name} | CFA Level 1 Study Guide`,
      description: `Master ${topic.name} for CFA Level 1 with ${topic.subtopics.length} subtopics and ${totalLearningOutcomes}+ learning outcomes.`,
      url: `https://financeexamprep.co.uk/topics/${slug}`,
      type: 'article',
    },
  }
}

export default async function TopicPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = cfaLevel1Curriculum.find((t) => t.id === slug)

  if (!topic) {
    notFound()
  }

  const totalLearningOutcomes = topic.subtopics.reduce(
    (sum, subtopic) => sum + subtopic.learningOutcomes,
    0
  )

  // Find topic index for navigation
  const topicIndex = cfaLevel1Curriculum.findIndex((t) => t.id === slug)
  const prevTopic = topicIndex > 0 ? cfaLevel1Curriculum[topicIndex - 1] : null
  const nextTopic = topicIndex < cfaLevel1Curriculum.length - 1 ? cfaLevel1Curriculum[topicIndex + 1] : null

  // JSON-LD structured data for the topic
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `CFA Level 1: ${topic.name}`,
    description: `Comprehensive study guide for ${topic.name} - CFA Level 1 curriculum topic covering ${topic.subtopics.length} subtopics and ${totalLearningOutcomes} learning outcomes.`,
    provider: {
      '@type': 'Organization',
      name: 'Finance Exam Prep',
      url: 'https://financeexamprep.co.uk',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `${topic.subtopics.length} subtopics, ${totalLearningOutcomes} learning outcomes`,
    },
    teaches: topic.subtopics.map(s => s.name),
    educationalLevel: 'CFA Level 1',
    isPartOf: {
      '@type': 'Course',
      name: 'CFA Level 1 Complete Curriculum',
      url: 'https://financeexamprep.co.uk/topics',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/topics" className="text-gray-500 hover:text-gray-700">
                CFA Level 1 Topics
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{topic.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <span className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-sm font-medium mb-4">
                Topic {topicIndex + 1} of 10 • CFA Level 1
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{topic.name}</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                {topic.description}
              </p>
              <div className="flex justify-center gap-8 text-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">{topic.subtopics.length}</div>
                  <div className="text-blue-200">Subtopics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalLearningOutcomes}</div>
                  <div className="text-blue-200">Learning Outcomes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{topic.examWeight}</div>
                  <div className="text-blue-200">Exam Weight</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Topic Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Topic Overview</h2>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {topic.name} is one of the 10 major topic areas in the CFA Level 1 curriculum,
                  representing approximately {topic.examWeight} of the exam. This topic area covers {topic.subtopics.length} key subtopics that form the foundation of {topic.name.toLowerCase()} knowledge required for investment professionals.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Understanding {topic.name.toLowerCase()} is essential for CFA candidates as it provides
                  the fundamental concepts needed to analyze financial markets and make informed investment decisions.
                  This topic area includes {totalLearningOutcomes} specific learning outcomes that candidates
                  must master for the exam.
                </p>
              </div>
            </div>

            {/* Subtopics Grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Subtopics in {topic.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {topic.subtopics.map((subtopic, index) => (
                  <div
                    key={subtopic.id}
                    className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {subtopic.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {subtopic.learningOutcomes} learning outcomes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Study Tips for {topic.name}
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Recommended Approach
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Start with understanding key concepts before memorizing formulas</li>
                      <li>• Practice calculations with real-world examples</li>
                      <li>• Review learning outcomes to ensure complete coverage</li>
                      <li>• Take topic-specific practice quizzes regularly</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Key Focus Areas
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Understand how this topic connects to other CFA areas</li>
                      <li>• Focus on high-weight subtopics for maximum impact</li>
                      <li>• Review past exam questions for this topic</li>
                      <li>• Create summary notes for quick revision</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Master {topic.name}?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Practice with our comprehensive question bank featuring questions on all {topic.subtopics.length} subtopics
                and {totalLearningOutcomes} learning outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quiz"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Start Practice Quiz
                </Link>
                <Link
                  href="/exams"
                  className="px-6 py-3 bg-blue-500/30 text-white rounded-lg font-semibold hover:bg-blue-500/40 transition-colors"
                >
                  Take Mock Exam
                </Link>
              </div>
            </div>

            {/* Topic Navigation */}
            <div className="mt-12 flex justify-between items-center">
              {prevTopic ? (
                <Link
                  href={`/topics/${prevTopic.id}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm text-gray-500">Previous Topic</div>
                    <div className="font-medium">{prevTopic.name}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextTopic ? (
                <Link
                  href={`/topics/${nextTopic.id}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-right"
                >
                  <div>
                    <div className="text-sm text-gray-500">Next Topic</div>
                    <div className="font-medium">{nextTopic.name}</div>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Other CFA Level 1 Topics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {cfaLevel1Curriculum
                .filter((t) => t.id !== slug)
                .map((t) => (
                  <Link
                    key={t.id}
                    href={`/topics/${t.id}`}
                    className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
                  >
                    <div className="text-sm font-medium text-gray-900 line-clamp-2">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{t.examWeight}</div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
