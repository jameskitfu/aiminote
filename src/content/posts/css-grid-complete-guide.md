---
title: CSS Grid 布局完全指南
summary: 全面介绍 CSS Grid 布局系统，从基础概念到高级技巧。
category: CSS
tags: CSS, Grid, Layout, Frontend
coverImage: https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=CSS+Grid+layout+visualization+with+colorful+grid+lines+and+modern+web+design&image_size=landscape_16_9
publishedAt: 2024-01-25T00:00:00.000Z
---
# CSS Grid 布局完全指南

CSS Grid 是一个强大的二维布局系统，它可以同时处理行和列。

## 基本概念

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## Grid 容器属性

- `grid-template-columns`：定义列
- `grid-template-rows`：定义行
- `gap`：设置间距
- `grid-auto-flow`：控制自动放置算法

## Grid 项目属性

- `grid-column`：控制列的起始和结束
- `grid-row`：控制行的起始和结束
- `grid-area`：简写属性
