import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFA Level 1 Formula Sheets 2026 | Free PDF Download',
  description: 'Free CFA Level 1 formula sheets covering all 10 topics. Essential formulas for Quant, FRA, Fixed Income & more. Download PDF or study online.',
  keywords: 'CFA formula sheet, CFA Level 1 formulas, CFA cheat sheet, CFA formula PDF, CFA Level 1 equations',
  alternates: {
    canonical: 'https://www.analysttrainer.com/formula-sheets',
  },
  openGraph: {
    title: 'CFA Level 1 Formula Sheets | Free Download',
    description: 'Free CFA Level 1 formula sheets covering all 10 topics. Essential formulas for Quant, FRA, Fixed Income & more.',
    url: 'https://www.analysttrainer.com/formula-sheets',
    type: 'website',
  },
}

export default function FormulaSheetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
