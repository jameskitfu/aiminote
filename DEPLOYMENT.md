# Aiminote 静态部署文档

当前生产版本已经切换为“纯前端静态博客”：

- 文章来自仓库里的 `src/content/posts/*.md`
- 评论使用 Giscus
- 不再依赖 `api/` 后端服务即可上线

## 推荐部署平台

- Vercel Hobby
- Cloudflare Pages

这两种都适合个人博客，支持 Git 仓库自动部署。

## 发布流程

1. 把仓库连接到部署平台
2. 设置生产分支为 `main`
3. 配好 Giscus 环境变量
4. 之后任何人只要把文章 Markdown 直接 push 到 `main`，站点就会自动重新部署

## 必要环境变量

在部署平台中配置：

```env
VITE_GISCUS_REPO=owner/repo
VITE_GISCUS_REPO_ID=R_kgDOExample
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=DIC_kwDOExample4Ct
VITE_GISCUS_MAPPING=pathname
VITE_GISCUS_LANG=zh-CN
```

如果这些变量没有配置，站点依然能正常打开，只是评论区会显示占位提示。

## 本地验证

```bash
pnpm install
pnpm dev
pnpm build
```

## 发文规范

- 新文章放在 `src/content/posts/`
- 每篇文章一个 `.md` 文件
- 文件名建议使用英文 slug，例如 `my-first-post.md`
- frontmatter 支持这些字段：

```text
title
summary
category
tags
coverImage
publishedAt
```

## 协作者发布方式

- 给发文的人 GitHub 仓库写权限
- 他们直接 push 到 `main`
- 部署平台自动重新发布

## 备注

- 仓库里的 `api/` 目录目前还保留，便于参考旧实现，但线上静态博客不再依赖它。

