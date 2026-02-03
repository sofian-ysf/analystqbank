import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free CFA Level 1 Formula Sheet PDF | 100+ Formulas',
  description: 'Download our free CFA Level 1 formula sheet with 100+ essential formulas organized by topic. Print-ready PDF updated for 2026. No credit card required.',
  keywords: 'CFA formula sheet, CFA Level 1 formulas, CFA cheat sheet, CFA formulas PDF, free CFA formulas, CFA Level 1 formula PDF',
  alternates: {
    canonical: 'https://www.analysttrainer.com/formula-sheet',
  },
  openGraph: {
    title: 'Free CFA Level 1 Formula Sheet | 100+ Essential Formulas',
    description: 'Download our free formula sheet with 100+ CFA Level 1 formulas. Organized by topic, print-ready PDF.',
    url: 'https://www.analysttrainer.com/formula-sheet',
    type: 'website',
  },
}

export default function FormulaSheetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
