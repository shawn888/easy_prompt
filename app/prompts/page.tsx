import Link from 'next/link'
import { getAllPrompts } from '../lib/api'
import { Prompt } from '../lib/api'
import PromptCard from '../components/PromptCard'

export default async function PromptsPage() {
  const prompts = await getAllPrompts()

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h1 className="text-2xl font-bold mb-3">全部提示词</h1>
        <p className="text-gray-600 text-base">
          浏览我们收集的所有AI提示词，涵盖多种模型和应用场景
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
          <p className="text-gray-600 mb-4">暂无提示词</p>
          <Link href="/" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg">
            返回首页
          </Link>
        </div>
      )}
    </div>
  )
} 