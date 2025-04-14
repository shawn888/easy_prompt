import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPromptsByCategory } from '../../lib/api'
import { Category, Prompt } from '../../lib/api'
import PromptCard from '../../components/PromptCard'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)
  
  if (!category) {
    notFound()
  }
  
  const prompts = await getPromptsByCategory(params.slug)

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <div className="w-14 h-14 bg-primary-100 text-3xl rounded-full flex items-center justify-center mx-auto mb-3">
          {category.icon}
        </div>
        <h1 className="text-2xl font-bold mb-3">{category.name}</h1>
        <p className="text-gray-600 text-base">
          {category.description}
        </p>
      </div>

      {prompts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {prompts.map((prompt: Prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">该分类下暂无提示词</p>
          <Link href="/categories" className="btn-primary">
            浏览其他分类
          </Link>
        </div>
      )}
    </div>
  )
} 