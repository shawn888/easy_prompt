'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold text-primary-600">
              Easy Prompt
            </Link>
            <p className="text-gray-600 mt-1">
              您的个人AI提示词收藏与分享平台
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary-600">
              首页
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-primary-600">
              分类
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600">
              关于
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {currentYear} Easy Prompt. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
} 