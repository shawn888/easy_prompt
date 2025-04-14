import Link from 'next/link'
import { getCategories } from '../lib/api'
import { Category } from '../lib/api'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-2xl font-bold mb-3">提示词分类</h1>
        <p className="text-gray-600">
          浏览不同场景和用途的AI提示词分类，找到适合您需求的提示词
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {categories.map((category: Category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-primary-100 text-lg rounded-full flex items-center justify-center mr-2">
                {category.icon}
              </div>
              <h2 className="text-base font-bold">{category.name}</h2>
            </div>
            
            <p className="text-gray-600 text-xs mb-2 flex-grow line-clamp-2">
              {category.description}
            </p>
            
            <div className="text-xs text-gray-500">
              {category.count} 个提示词
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}