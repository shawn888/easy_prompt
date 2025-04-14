import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

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

// 定义提示词文件存放路径
const promptsDirectory = path.join(process.cwd(), 'prompts')
const categoriesFile = path.join(process.cwd(), 'data/categories.json')

// 获取所有提示词
export async function getAllPrompts(): Promise<Prompt[]> {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(promptsDirectory)) {
      console.warn('Prompts directory not found, returning example data')
      return getExamplePrompts()
    }

    // 读取目录中的所有文件
    const fileNames = fs.readdirSync(promptsDirectory)
    
    // 只处理.md文件
    const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'))
    
    if (markdownFiles.length === 0) {
      console.warn('No markdown files found in prompts directory, returning example data')
      return getExamplePrompts()
    }

    const allPromptsData = await Promise.all(
      markdownFiles.map(async (fileName) => {
        // 从文件名获取slug (移除.md扩展名)
        const slug = fileName.replace(/\.md$/, '')

        // 读取markdown文件内容
        const fullPath = path.join(promptsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // 使用gray-matter解析前置元数据
        const matterResult = matter(fileContents)
        
        // 将markdown内容转换为HTML (如果需要的话)
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content)
        const contentHtml = processedContent.toString()

        // 确保frontmatter中包含所有必要的字段
        const data = matterResult.data as Partial<Prompt>
        
        // 返回带有slug和内容的数据
        return {
          slug,
          title: data.title || '未命名提示词',
          description: data.description || '',
          category: data.category || '未分类',
          categorySlug: data.categorySlug || 'uncategorized',
          content: matterResult.content,
          contentHtml,
          featured: data.featured || false,
          imageUrl: data.imageUrl,
          date: data.date || new Date().toISOString().slice(0, 10),
          supportedModels: data.supportedModels || []
        } as Prompt
      })
    )

    // 按日期排序
    return allPromptsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading prompt files:', error)
    return getExamplePrompts()
  }
}

// 获取精选提示词
export async function getFeaturedPrompts(): Promise<Prompt[]> {
  const allPrompts = await getAllPrompts()
  return allPrompts.filter(prompt => prompt.featured)
}

// 根据分类获取提示词
export async function getPromptsByCategory(categorySlug: string): Promise<Prompt[]> {
  const allPrompts = await getAllPrompts()
  return allPrompts.filter(prompt => prompt.categorySlug === categorySlug)
}

// 根据slug获取提示词详情
export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  const allPrompts = await getAllPrompts()
  return allPrompts.find(prompt => prompt.slug === slug) || null
}

// 搜索提示词
export async function searchPrompts(query: string): Promise<Prompt[]> {
  const allPrompts = await getAllPrompts()
  const lowerCaseQuery = query.toLowerCase()
  
  return allPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(lowerCaseQuery) ||
    prompt.description.toLowerCase().includes(lowerCaseQuery) ||
    prompt.content.toLowerCase().includes(lowerCaseQuery) ||
    prompt.category.toLowerCase().includes(lowerCaseQuery)
  )
}

// 获取所有分类
export async function getCategories(): Promise<Category[]> {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(categoriesFile)) {
      console.warn('Categories file not found, returning example data')
      return getExampleCategories()
    }

    // 读取categories.json文件
    const fileContents = fs.readFileSync(categoriesFile, 'utf8')
    const categoriesData = JSON.parse(fileContents) as Category[]
    
    if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
      console.warn('Invalid or empty categories data, returning example data')
      return getExampleCategories()
    }

    // 获取所有提示词
    const allPrompts = await getAllPrompts()
    
    // 为每个分类计算提示词数量
    return categoriesData.map(category => {
      const count = allPrompts.filter(prompt => prompt.categorySlug === category.slug).length
      return { ...category, count }
    })
  } catch (error) {
    console.error('Error reading categories file:', error)
    return getExampleCategories()
  }
}

// 根据slug获取分类详情
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories()
  return categories.find(category => category.slug === slug) || null
}

// 示例数据 (当文件不存在或读取失败时使用)
export function getExamplePrompts(): Prompt[] {
  return [
    {
      slug: 'creative-writing-assistant',
      title: '创意写作助手',
      description: '帮助小说、诗歌等创意写作的专业提示词',
      category: '写作辅助',
      categorySlug: 'writing',
      content: '你是一位专业的创意写作顾问。请帮我分析以下写作片段的优缺点，并提供具体的改进建议...',
      featured: true,
      imageUrl: '/images/creative-writing.jpg',
      date: '2023-06-15',
      supportedModels: ['GPT-4o', 'Claude 3']
    },
    {
      slug: 'stable-diffusion-portrait',
      title: 'Stable Diffusion肖像生成',
      description: '生成高质量人物肖像的Stable Diffusion提示词',
      category: '图像生成',
      categorySlug: 'image-generation',
      content: 'Portrait of a [gender], [age], [clothing], [pose], [emotion], [lighting], highly detailed, photorealistic, 8k...',
      featured: true,
      imageUrl: '/images/portrait.jpg',
      date: '2023-05-20',
      supportedModels: ['Stable Diffusion XL', 'Stable Diffusion 3']
    },
    {
      slug: 'code-refactoring-expert',
      title: '代码重构专家',
      description: '帮助优化和重构代码的提示词模板',
      category: '编程开发',
      categorySlug: 'programming',
      content: '作为一位经验丰富的软件工程师和代码重构专家，请分析以下代码并提出重构建议，重点关注...',
      featured: true,
      imageUrl: '/images/code.jpg',
      date: '2023-07-05',
      supportedModels: ['GPT-4o', 'Claude 3', 'Gemini 1.5']
    },
    {
      slug: 'interview-coach',
      title: '面试教练',
      description: '准备工作面试的AI辅助提示词',
      category: '职业发展',
      categorySlug: 'career',
      content: '你是一位专业的面试教练。我正在准备[公司名称]的[职位名称]面试。请针对这个职位提供常见面试问题和回答策略...',
      featured: false,
      imageUrl: '/images/interview.jpg',
      date: '2023-04-10',
      supportedModels: ['GPT-4o', 'Claude 3', 'Gemini 1.5']
    },
    {
      slug: 'productivity-system-designer',
      title: '个人生产力系统设计师',
      description: '帮助设计个人生产力和时间管理系统的提示词',
      category: '生产力',
      categorySlug: 'productivity',
      content: '作为一位个人生产力和时间管理专家，请帮我根据以下个人情况设计一套适合我的生产力系统...',
      featured: false,
      imageUrl: '/images/productivity.jpg',
      date: '2023-03-25',
      supportedModels: ['GPT-4o', 'Claude 3']
    },
    {
      slug: 'midjourney-landscape',
      title: 'Midjourney风景生成',
      description: '生成震撼风景图的Midjourney提示词',
      category: '图像生成',
      categorySlug: 'image-generation',
      content: 'Epic landscape of [location], [time of day], [weather], [lighting conditions], [camera angle], [style], highly detailed...',
      featured: true,
      imageUrl: '/images/landscape.jpg',
      date: '2023-08-12',
      supportedModels: ['Midjourney v6']
    }
  ]
}

export function getExampleCategories(): Category[] {
  return [
    {
      name: '图像生成',
      slug: 'image-generation',
      description: '用于AI图像生成工具的提示词，如Midjourney、DALL-E、Stable Diffusion等',
      icon: '🖼️',
      count: 2
    },
    {
      name: '写作辅助',
      slug: 'writing',
      description: '辅助各类写作任务的提示词，包括创意写作、学术写作、内容营销等',
      icon: '✍️',
      count: 1
    },
    {
      name: '编程开发',
      slug: 'programming',
      description: '辅助编程和软件开发的提示词，包括代码生成、调试、文档撰写等',
      icon: '💻',
      count: 1
    },
    {
      name: '职业发展',
      slug: 'career',
      description: '关于职业规划、求职面试、职场沟通等方面的提示词',
      icon: '👔',
      count: 1
    },
    {
      name: '生产力',
      slug: 'productivity',
      description: '提高个人和团队生产力的提示词，包括时间管理、任务规划等',
      icon: '⏱️',
      count: 1
    }
  ]
} 