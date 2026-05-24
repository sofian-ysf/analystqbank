'use client'

import Link from 'next/link'
import { CheckCircle, SealCheck } from '@phosphor-icons/react'

interface PassGuaranteeProps {
  variant?: 'full' | 'compact' | 'badge'
}

export function PassGuaranteeFull() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <SealCheck className="w-10 h-10 text-green-600" weight="fill" />
        </div>

        <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
          Pass Guarantee
        </h3>

        <p className="text-lg text-gray-600 mb-6">
          We're confident in our questions. If you complete all practice questions and mock exams but don't pass your CFA Level 1 exam, we'll extend your access for <strong>free</strong> until you do.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
            Complete 80%+ of questions
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
            Take all mock exams
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
            Free extension if you don't pass
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          <Link href="/terms" className="underline hover:text-gray-700">Terms and conditions</Link> apply. Valid for Basic and Premium plans.
        </p>
      </div>
    </div>
  )
}

export function PassGuaranteeCompact() {
  return (
    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />
      </div>
      <div>
        <p className="font-medium text-gray-900 text-sm">Pass Guarantee</p>
        <p className="text-xs text-gray-600">Don't pass? Free extension until you do.</p>
      </div>
    </div>
  )
}

export function PassGuaranteeBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
      <SealCheck className="w-4 h-4" weight="fill" />
      Pass Guarantee Included
    </div>
  )
}

export default function PassGuarantee({ variant = 'full' }: PassGuaranteeProps) {
  if (variant === 'compact') return <PassGuaranteeCompact />
  if (variant === 'badge') return <PassGuaranteeBadge />
  return <PassGuaranteeFull />
}