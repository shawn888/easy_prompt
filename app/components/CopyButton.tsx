'use client'

import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyToClipboard}
      className="flex items-center text-sm text-gray-700 hover:text-primary-600 bg-white py-2 px-3 rounded-md border border-gray-200 hover:border-primary-300 transition-colors"
    >
      {copied ? (
        <>
          <FiCheck className="mr-1" />
          已复制
        </>
      ) : (
        <>
          <FiCopy className="mr-1" />
          复制
        </>
      )}
    </button>
  )
} 