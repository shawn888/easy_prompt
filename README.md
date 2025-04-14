# Easy Prompt - AI提示词收藏与分享平台

Easy Prompt是一个简洁美观的个人AI提示词收藏与分享平台，帮助用户整理和分享各种AI场景的提示词。

## 功能特点

- 提示词分类展示（按AI工具或场景分类）
- 提示词详情页（包含提示词内容、使用说明、示例图片）
- 复制功能（一键复制提示词）
- 分享功能（生成可分享的链接）
- 响应式设计（适配不同设备）

## 技术栈

- **框架**: [Next.js](https://nextjs.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图标**: [React Icons](https://react-icons.github.io/react-icons/)

## 简化部署指南

1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/easy_prompt.git
   cd easy_prompt
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 开发模式运行：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

5. 启动生产服务器：
   ```bash
   npm start
   ```

## 添加提示词

提示词以静态数据的形式存储在`app/lib/api.ts`的`getExamplePrompts`函数中，您可以直接编辑此函数来添加新的提示词。

示例提示词格式：
```javascript
{
  slug: 'prompt-name',
  title: '提示词标题',
  description: '简短描述',
  category: '分类名称',
  categorySlug: '分类slug',
  content: '详细的提示词内容...',
  featured: true/false,
  imageUrl: '/images/image-name.jpg',
  date: '2023-08-20'
}
```

## 添加分类

分类信息存储在`app/lib/api.ts`的`getExampleCategories`函数中，您可以直接编辑此函数来添加新的分类。

示例分类格式：
```javascript
{
  name: '分类名称',
  slug: 'category-slug',
  description: '分类描述',
  icon: '🖼️', // Emoji图标
  count: 2  // 该分类下的提示词数量
}
```

## Vercel部署

该项目可以轻松部署到Vercel平台：

1. 在[Vercel](https://vercel.com)上创建账号
2. 导入Git仓库
3. 点击部署按钮

## 许可证

MIT 