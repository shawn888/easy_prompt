export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">关于 Easy Prompt</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Easy Prompt 是一个个人AI提示词收藏与分享平台，旨在帮助用户更好地使用各种AI工具和服务。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">什么是提示词？</h2>
        <p>
          提示词（Prompt）是给AI模型的指令，用于引导AI生成特定类型的响应。一个好的提示词可以显著提高AI输出的质量和相关性。不同的AI工具（如ChatGPT、Midjourney、Stable Diffusion等）需要不同风格的提示词来获得最佳结果。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">为什么创建这个网站？</h2>
        <p>
          创建这个网站的目的是：
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>收集和整理各种场景下的高质量提示词</li>
          <li>建立个人的提示词知识库，方便随时查阅</li>
          <li>分享提示词技巧，帮助更多人有效地使用AI工具</li>
          <li>记录AI提示工程（Prompt Engineering）的学习和实践</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">如何使用？</h2>
        <p>
          你可以通过以下方式使用本网站：
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>浏览不同分类的提示词，了解各种AI工具的提示技巧</li>
          <li>搜索特定关键词，找到适合特定场景的提示词</li>
          <li>复制提示词内容，稍加修改后用于自己的AI工具中</li>
          <li>分享有用的提示词给朋友或同事</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">联系方式</h2>
        <p>
          如有任何问题、建议或合作意向，请通过以下方式联系：
        </p>
        <p>
          邮箱：<a href="mailto:contact@easyprompt.example.com" className="text-primary-600 hover:underline">contact@easyprompt.example.com</a>
        </p>
      </div>
    </div>
  )
} 