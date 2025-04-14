---
title: 'Stable Diffusion肖像生成'
description: '生成高质量人物肖像的Stable Diffusion提示词'
category: '图像生成'
categorySlug: 'image-generation'
featured: true
imageUrl: '/images/portrait.jpg'
date: '2023-05-20'
supportedModels: ['Stable Diffusion XL', 'Stable Diffusion 3', 'Midjourney']
---

# Stable Diffusion肖像生成模板

## 基础模板

```
Portrait of a [gender], [age], [clothing], [pose], [emotion], [lighting], highly detailed, photorealistic, 8k, ultra hd, perfect face, perfect skin, [additional style elements]
```

## 常用参数说明

- **gender**: man, woman, teenage boy, teenage girl, elderly man, elderly woman
- **age**: young, middle-aged, elderly, 20-year-old, 40-year-old, etc.
- **clothing**: wearing a blue suit, in a red dress, casual attire, formal wear, etc.
- **pose**: looking at camera, profile view, three-quarter view, standing, sitting, etc.
- **emotion**: smiling, serious, thoughtful, joyful, melancholic, etc.
- **lighting**: soft lighting, dramatic lighting, golden hour, studio lighting, etc.

## 强化参数

可以添加以下参数使肖像更加真实:

```
cinematic lighting, shallow depth of field, professional photography, 85mm lens, color graded, award winning portrait photography
```

## 反向提示词 (Negative Prompt)

这些词可以帮助避免常见的生成问题:

```
deformed, ugly, mutation, blurry, low quality, low resolution, bad anatomy, bad hands, extra fingers, poorly drawn hands, poorly drawn face, extra limbs, disfigured, out of frame, extra legs, extra arms, mutated hands, bad proportions, cropped, worst quality
```

## 完整示例

```
Portrait of a young Asian woman in traditional red dress, looking thoughtfully to the side, soft window lighting casting gentle shadows across her face, highly detailed, photorealistic, 8k, ultra hd, perfect face, perfect skin, cinematic lighting, shallow depth of field, professional photography, 85mm lens, color graded, award winning portrait photography

Negative prompt: deformed, ugly, mutation, blurry, low quality, low resolution, bad anatomy, bad hands, extra fingers, poorly drawn hands, poorly drawn face, extra limbs, disfigured, out of frame, extra legs, extra arms, mutated hands, bad proportions, cropped, worst quality
``` 