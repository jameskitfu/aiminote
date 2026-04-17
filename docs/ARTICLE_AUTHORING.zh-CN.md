# 发文教程

这份文档是给协作者用的发文说明。当前博客采用 Git 仓库直发模式：新增一篇 Markdown 文章并推送到 `main` 后，网站会自动发布。

## 文章放在哪里

新文章请放到：

`src/content/posts/`

每篇文章都是一个 `.md` 文件。

示例：

- `src/content/posts/react-hooks-best-practices.md`
- `src/content/posts/typescript-advanced-guide.md`

## 最简单的发文流程

1. 复制模板文件
2. 改文件名
3. 填写 frontmatter
4. 写正文
5. 提交并 push
6. 等待网站自动发布

## 第一步：复制模板

模板文件在：

`docs/post-template.md`

复制一份，放到：

`src/content/posts/`

## 第二步：给文件命名

文件名会成为文章链接的一部分，建议这样写：

- 全英文
- 全小写
- 单词之间用 `-`

示例：

- `how-to-learn-react.md`
- `my-first-frontend-post.md`
- `css-grid-layout-notes.md`

不建议：

- 中文文件名
- 带空格
- 带特殊符号

## 第三步：填写文章头部信息

每篇文章顶部都要有 frontmatter，当前站点支持这些字段：

- `title`
- `summary`
- `category`
- `tags`
- `coverImage`
- `publishedAt`

注意：

- `tags` 现在必须写成一行，用英文逗号分隔
- 时间字段必须叫 `publishedAt`

正确示例：

```md
---
title: 我的第一篇文章
summary: 这是一篇用于测试发布流程的文章。
category: React
tags: React, Frontend, Notes
coverImage: https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80
publishedAt: 2026-04-17T20:00:00.000Z
---
```

## 第四步：写正文

frontmatter 下面就是正常 Markdown 正文。

示例：

```md
# 我的第一篇文章

这里开始写开头。

## 为什么写这篇文章

这里写背景。

## 正文内容

- 支持标题
- 支持列表
- 支持代码块
- 支持引用

```ts
const message = 'hello';
console.log(message);
```
```

## 推荐分类

建议优先沿用现有分类，这样首页分类会更统一：

- `React`
- `TypeScript`
- `CSS`

如果需要，也可以写新的分类名，网站会自动生成新的分类按钮。

## 封面图建议

`coverImage` 需要填写公网可访问的图片 URL。

如果暂时没有封面，可以直接删掉这一行：

```md
coverImage: https://...
```

## 时间格式建议

推荐直接照这个格式写：

```md
publishedAt: 2026-04-17T20:00:00.000Z
```

如果不确定，改日期部分即可。

## 本地提交发布

在仓库根目录执行：

```powershell
cd E:\zlib
git add src/content/posts/你的文章文件名.md
git commit -m "docs: add new article"
git push origin main
```

推送后，Vercel 会自动发布新文章。

## GitHub 网页直接发文

如果不在本地写，也可以直接用 GitHub 网页：

1. 打开仓库 `jameskitfu/aiminote`
2. 进入 `src/content/posts`
3. 点击 `Add file`
4. 新建一个 `.md` 文件
5. 粘贴模板内容并填写
6. 直接提交到 `main`

提交后网站也会自动更新。

如果需要更细的网页端教程，可直接看：

- [ARTICLE_AUTHORING_GITHUB_WEB.zh-CN.md](./ARTICLE_AUTHORING_GITHUB_WEB.zh-CN.md)

## 发布后检查

发文后建议检查：

- 首页有没有出现新文章
- 分类筛选能不能找到它
- 详情页能不能正常打开
- 评论区是否正常显示

## 常见错误

### 1. `tags` 写成 YAML 列表

当前项目不要这样写：

```md
tags:
  - React
  - Hooks
```

请写成：

```md
tags: React, Hooks
```

### 2. 把时间字段写成 `date`

当前站点不会读取 `date`，请写：

```md
publishedAt:
```

### 3. 忘了 frontmatter 两端的 `---`

没有这两行，文章会解析失败。

### 4. 文件名太随意

建议始终使用英文短横线命名，方便链接和 SEO。

## 最短可复制版本

```md
---
title: 文章标题
summary: 文章摘要
category: React
tags: React, Frontend
coverImage: https://your-image-url
publishedAt: 2026-04-17T20:00:00.000Z
---

# 文章标题

正文开始。
```
