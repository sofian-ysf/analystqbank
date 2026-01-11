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
    default: "Finance Certification Exam Prep | CFA, FRM & More | Pass First Time",
    template: "%s | Finance Exam Prep",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  description: "Prepare for your finance certification exams with 2500+ practice questions, mock exams, and detailed explanations. 92% pass rate. Start your free trial today!",
  keywords: "CFA exam, CFA Level 1, FRM exam, finance certification, CFA practice questions, CFA study guide, CFA mock exam, FRM practice test, CPA exam prep, ACCA preparation, finance exam questions, CFA formula sheet, investment analysis, portfolio management, financial statement analysis",
  authors: [{ name: "Finance Exam Prep" }],
  creator: "Finance Exam Prep",
  publisher: "Finance Exam Prep",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://financeexamprep.co.uk"),
  openGraph: {
    title: "Finance Certification Exam Prep | CFA, FRM & More | Pass First Time",
    description: "Prepare for your finance certification exams with 2500+ practice questions, mock exams, and detailed explanations. 92% pass rate. Start your free trial today!",
    url: "https://financeexamprep.co.uk",
    siteName: "Finance Exam Prep",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finance Exam Prep - Pass Your Certification Exam First Time",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Certification Exam Prep | CFA, FRM & More",
    description: "Prepare for your finance exams with 2500+ practice questions. 92% pass rate. Start free!",
    images: ["/twitter-image.png"],
    creator: "@financeexamprep",
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
    "llms-txt": "https://financeexamprep.co.uk/llms.txt",
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
