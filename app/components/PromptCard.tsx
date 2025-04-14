'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiCopy, FiCheck, FiShare2 } from 'react-icons/fi'

interface PromptProps {
  prompt: {
    slug: string
    title: string
    description: string
    category: string
    categorySlug: string
    imageUrl?: string
    content: string
    supportedModels?: string[]
  }
}

export default function PromptCard({ prompt }: PromptProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sharePrompt = () => {
    if (navigator.share) {
      navigator.share({
        title: prompt.title,
        text: prompt.description,
        url: `${window.location.origin}/prompts/${prompt.slug}`,
      })
      .catch((err) => {
        console.error('分享失败:', err)
      })
    } else {
      // 如果浏览器不支持Web Share API，则复制链接
      navigator.clipboard.writeText(`${window.location.origin}/prompts/${prompt.slug}`)
      alert('链接已复制到剪贴板')
    }
  }

  return (
    <div className="card h-full flex flex-col shadow-sm hover:shadow-md transition-all">
      {prompt.imageUrl && (
        <div className="relative w-full h-28 mb-2 bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
          <div className="text-gray-400 text-3xl">🖼️</div>
        </div>
      )}
      
      <div className="px-3 py-2 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <Link 
            href={`/categories/${prompt.categorySlug}`}
            className="text-xs font-medium text-primary-600 mb-0 inline-block"
          >
            {prompt.category}
          </Link>
        </div>
        
        <Link href={`/prompts/${prompt.slug}`} className="block mb-1">
          <h3 className="text-base font-bold hover:text-primary-600 transition-colors line-clamp-1">
            {prompt.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-grow">
          {prompt.description}
        </p>
        
        {/* 模型标签 */}
        {prompt.supportedModels && prompt.supportedModels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {prompt.supportedModels.map((model) => (
              <span 
                key={model} 
                className="inline-block bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded-md"
              >
                {model}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between pt-2 border-t border-gray-100 mt-auto">
          <button
            onClick={copyToClipboard}
            className="flex items-center text-xs text-gray-700 hover:text-primary-600"
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
          
          <button
            onClick={sharePrompt}
            className="flex items-center text-xs text-gray-700 hover:text-primary-600"
          >
            <FiShare2 className="mr-1" />
            分享
          </button>
        </div>
      </div>
    </div>
  )
} 