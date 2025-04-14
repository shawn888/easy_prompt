import Link from 'next/link'
import { getCategories, getFeaturedPrompts } from './lib/api'
import { Category, Prompt } from './lib/api'
import PromptCard from './components/PromptCard'

export default async function Home() {
  const categories = await getCategories()
  const featuredPrompts = await getFeaturedPrompts()

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-10 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            探索AI提示词的无限可能
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            收集、整理和分享各种AI场景的高质量提示词
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories" 
              className="bg-white text-primary-700 hover:bg-gray-100 px-5 py-2 rounded-lg font-medium text-base transition-colors"
            >
              浏览分类
            </Link>
            <Link 
              href="/categories" 
              className="bg-primary-700 text-white hover:bg-primary-800 px-5 py-2 rounded-lg font-medium text-base transition-colors border border-white/30"
            >
              查看提示词
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">提示词分类</h2>
          <Link href="/categories" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((category: Category) => (
            <Link 
              key={category.slug} 
              href={`/categories/${category.slug}`}
              className="bg-white hover:bg-gray-50 rounded-lg shadow-sm p-3 text-center transition-colors"
            >
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                {category.icon}
              </div>
              <h3 className="font-medium text-sm">{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{category.count}个提示词</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">精选提示词</h2>
          <Link href="/prompts" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {featuredPrompts.map((prompt: Prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </section>
    </div>
  )
} 