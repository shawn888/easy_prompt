import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPromptBySlug, getCategoryBySlug } from '../../lib/api'
import CopyButton from '../../components/CopyButton'
import ShareButton from '../../components/ShareButton'

interface PromptPageProps {
  params: {
    slug: string
  }
}

export default async function PromptPage({ params }: PromptPageProps) {
  const prompt = await getPromptBySlug(params.slug)
  
  if (!prompt) {
    notFound()
  }
  
  const category = await getCategoryBySlug(prompt.categorySlug)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href={`/categories/${prompt.categorySlug}`}
          className="text-sm font-medium text-primary-600 mb-2 inline-flex items-center"
        >
          <span className="mr-2">{category?.icon}</span>
          {prompt.category}
        </Link>
        <h1 className="text-3xl font-bold mb-3">{prompt.title}</h1>
        <p className="text-gray-600 text-lg mb-4">{prompt.description}</p>
        
        {/* 模型标签 */}
        {prompt.supportedModels && prompt.supportedModels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500 mr-2">支持模型:</span>
            {prompt.supportedModels.map((model) => (
              <span 
                key={model} 
                className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-md"
              >
                {model}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {prompt.imageUrl && (
        <div className="relative w-full h-64 sm:h-96 mb-8 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-7xl">🖼️</div>
        </div>
      )}
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">提示词内容</h2>
          <div className="flex space-x-2">
            <CopyButton text={prompt.content} />
            <ShareButton title={prompt.title} url={`/prompts/${prompt.slug}`} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-md border border-gray-200 whitespace-pre-wrap">
          {prompt.content}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">使用说明</h2>
        <div className="prose max-w-none">
          {prompt.content}
        </div>
      </div>
    </div>
  )
} 