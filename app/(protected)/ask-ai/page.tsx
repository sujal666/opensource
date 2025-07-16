'use client'

import { Suspense } from 'react'
import AskAIContent from './AskAIContent'


export default function AskAIPage() {
  return (
    <Suspense fallback={<p className="text-center text-white mt-10">Loading...</p>}>
      <AskAIContent />
    </Suspense>
  )
}
