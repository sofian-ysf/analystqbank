import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ExitIntentWrapper from "@/components/ExitIntentWrapper";

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Free CFA Level 1 Exam Prep 2026 | 2,500+ Questions & Mock Exams",
    template: "%s | AnalystTrainer",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://www.analysttrainer.com",
  },
  description: "Prepare for CFA Level 1 with 2,500+ free practice questions, mock exams, and flashcards. Instant feedback, detailed explanations. Start your free trial - no credit card required!",
  keywords: "free cfa level 1 practice questions, cfa level 1 mock exam, example cfa level 1 questions, cfa level 1 sample questions, cfa mock exam free, practice cfa level 1 questions, cfa level 1 questions with answers, cfa level 1 practice test, cfa exam sample questions, free cfa mock exam",
  authors: [{ name: "AnalystTrainer" }],
  creator: "AnalystTrainer",
  publisher: "AnalystTrainer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.analysttrainer.com"),
  openGraph: {
    title: "CFA Level 1 Practice Questions & Mock Exams 2026 | AnalystTrainer",
    description: "Pass CFA Level 1 first time with 2,500+ practice questions, realistic mock exams & detailed explanations. Start your free trial today.",
    url: "https://www.analysttrainer.com",
    siteName: "AnalystTrainer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AnalystTrainer - CFA Level 1 Practice Questions & Mock Exams",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFA Level 1 Practice Questions & Mock Exams 2026",
    description: "Pass CFA Level 1 with 2,500+ practice questions & mock exams. Start free trial today!",
    images: ["/twitter-image.png"],
    creator: "@analysttrainer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    other: {
      "msvalidate.01": "bing-verification-code",
    },
  },
  other: {
    "llms-txt": "https://www.analysttrainer.com/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif4.variable} antialiased`}
      >
        {children}
        <ExitIntentWrapper />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18143203755"
          strategy="afterInteractive"
        />
        <Script
          id="google-tag-config"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18143203755');
          `}
        </Script>
      </body>
    </html>
  );
}
