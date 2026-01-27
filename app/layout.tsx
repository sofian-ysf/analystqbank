import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CFA Level 1 Practice Questions & Mock Exams 2026 | AnalystTrainer",
    template: "%s | AnalystTrainer",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  description: "Pass CFA Level 1 first time with 2,500+ practice questions, realistic mock exams & detailed explanations. Start your free trial today - no card required.",
  keywords: "CFA Level 1 practice questions, CFA Level 1 mock exam, CFA exam prep, CFA question bank, CFA Level 1 study guide, CFA practice test, pass CFA Level 1, CFA Level 1 questions, CFA preparation, CFA Level 1 2026",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
