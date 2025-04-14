'use client'

import { useState } from 'react'
import { FiShare2, FiCheck } from 'react-icons/fi'

interface ShareButtonProps {
  title: string
  url: string
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [shared, setShared] = useState(false)

  const shareContent = () => {
    const fullUrl = `${window.location.origin}${url}`
    
    if (navigator.share) {
      navigator.share({
        title: title,
        url: fullUrl,
      })
      .catch((err) => {
        console.error('分享失败:', err)
      })
    } else {
      // 如果浏览器不支持Web Share API，则复制链接
      navigator.clipboard.writeText(fullUrl)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  return (
    <button
      onClick={shareContent}
      className="flex items-center text-sm text-gray-700 hover:text-primary-600 bg-white py-2 px-3 rounded-md border border-gray-200 hover:border-primary-300 transition-colors"
    >
      {shared ? (
        <>
          <FiCheck className="mr-1" />
          已复制链接
        </>
      ) : (
        <>
          <FiShare2 className="mr-1" />
          分享
        </>
      )}
    </button>
  )
} 