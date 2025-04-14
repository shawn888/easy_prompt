// 定义类型
export interface Prompt {
  slug: string
  title: string
  description: string
  category: string
  categorySlug: string
  content: string
  featured?: boolean
  imageUrl?: string
  date: string
  supportedModels?: string[]
}

export interface Category {
  name: string
  slug: string
  description: string
  icon: string
  count: number
}

// 函数声明
export function getAllPrompts(): Promise<Prompt[]>
export function getFeaturedPrompts(): Promise<Prompt[]>
export function getPromptsByCategory(categorySlug: string): Promise<Prompt[]>
export function getPromptBySlug(slug: string): Promise<Prompt | null>
export function searchPrompts(query: string): Promise<Prompt[]>
export function getCategories(): Promise<Category[]>
export function getCategoryBySlug(slug: string): Promise<Category | null>
export function getExamplePrompts(): Prompt[]
export function getExampleCategories(): Category[] 