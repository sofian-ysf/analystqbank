import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs, formatDate } from "@/lib/blog";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | AnalystTrainer",
    };
  }

  return {
    title: `${post.title} | AnalystTrainer Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.ogImage ? [post.ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Custom MDX components for styling
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-[#13343B] mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-[#13343B] mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold text-[#13343B] mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[#5f6368] leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-[#5f6368] mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-[#5f6368] mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-[#5f6368]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#1FB8CD] hover:underline" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-[#1FB8CD] pl-4 italic text-[#5f6368] my-4" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-[#F3F3EE] px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-[#13343B] text-white p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-[#13343B]" {...props} />
  ),
  hr: () => <hr className="my-8 border-[#EAEEEF]" />,
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Schema.org structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "AnalystTrainer",
      logo: {
        "@type": "ImageObject",
        url: "https://www.analysttrainer.com/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#FBFAF4]">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/">
                <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/#product" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                  Features
                </Link>
                <Link href="/#pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                  Pricing
                </Link>
                <Link href="/blog" className="text-[#13343B] font-medium transition-colors">
                  Blog
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                  Start Free Trial
                </Link>
              </div>

              <button className="md:hidden p-2 rounded-lg text-[#5f6368] hover:text-[#13343B] hover:bg-[#F3F3EE]" aria-label="Open menu">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        {/* Article */}
        <article className="py-12 px-4 sm:px-6">
          <div className="max-w-[720px] mx-auto">
            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center text-[#5f6368] hover:text-[#13343B] mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#1FB8CD]/10 text-[#1A6872] text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-[#9aa0a6] text-sm">{post.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#13343B] mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-[#5f6368] mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#9aa0a6]">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-[#13343B] rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready to Practice?</h3>
              <p className="text-white/80 mb-6">
                Put your knowledge to the test with our CFA practice questions.
              </p>
              <Link
                href="/signup"
                className="inline-block px-6 py-3 bg-[#1FB8CD] text-white rounded-lg hover:bg-[#1A6872] transition-colors font-medium"
              >
                Start Free Trial
              </Link>
            </div>

            {/* More Posts */}
            <div className="mt-12 pt-8 border-t border-[#EAEEEF]">
              <Link href="/blog" className="inline-flex items-center text-[#1FB8CD] font-medium hover:underline">
                ← View all posts
              </Link>
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="bg-white border-t border-[#EAEEEF]">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1">
                <Link href="/">
                  <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
                </Link>
                <p className="mt-4 text-[#5f6368] text-sm">
                  The leading platform for finance certification exam preparation.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-[#13343B] mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-[#9aa0a6]">
                  <li><Link href="/#product" className="hover:text-[#13343B] transition-colors">Features</Link></li>
                  <li><Link href="/#pricing" className="hover:text-[#13343B] transition-colors">Pricing</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-[#13343B] mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-[#9aa0a6]">
                  <li><Link href="/blog" className="hover:text-[#13343B] transition-colors">Blog</Link></li>
                  <li><Link href="/help" className="hover:text-[#13343B] transition-colors">Help Centre</Link></li>
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
              <p>© 2025 AnalystTrainer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
