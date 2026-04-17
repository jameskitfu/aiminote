# Aiminote

[English README](./README.md)

Aiminote 现在是一套面向前端技术内容的静态博客方案。文章直接存放在仓库里，以 Markdown 形式维护，站点本身只需要部署一个 Vite + React 前端，就可以在 Vercel 或 Cloudflare Pages 上免费运行。

## 功能概览

- 按分类浏览文章，支持关键词搜索和详情页查看
- 文章内容存放在 `src/content/posts/*.md`
- 支持“协作者直接 push 内容，站点自动上线”的工作流
- 评论改为 Giscus，访客使用自己的 GitHub 账号参与讨论
- Markdown 内容在前端渲染前会做安全清洗

## 技术栈

- 前端：React、TypeScript、Vite、React Router、Tailwind CSS
- 内容源：仓库内 Markdown 文件
- 评论：Giscus

## 目录结构

```text
.
├─ src/
│  ├─ content/posts/   Markdown 文章源
│  ├─ pages/           前端页面
│  └─ components/      公共组件与评论组件
├─ public/             静态资源
├─ DEPLOYMENT.md       静态部署说明
└─ README.md           英文文档
```

## 环境要求

- Node.js 18+
- pnpm 9+

## 本地启动

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动前端

```bash
pnpm dev
```

站点默认运行在 `http://localhost:5173`。

## 环境变量

评论通过 Giscus 配置。示例 `.env.local`：

```env
VITE_GISCUS_REPO=owner/repo
VITE_GISCUS_REPO_ID=R_kgDOExample
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=DIC_kwDOExample4Ct
VITE_GISCUS_MAPPING=pathname
VITE_GISCUS_LANG=zh-CN
```

也可以直接参考 [`.env.example`](./.env.example)。如果这些变量没配，文章页会显示一个友好的评论占位提示，而不是报错。

## 可用脚本

```bash
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm preview
```

## 发文流程

- 在 `src/content/posts/` 下新增一篇 Markdown 文件
- 在 frontmatter 里填写 `title`、`summary`、`category`、`tags`、`coverImage`、`publishedAt`
- 在 frontmatter 下方继续写正文 Markdown
- 直接 push 到 `main`，静态部署平台即可自动发布

详细教程和模板见：

- [docs/ARTICLE_AUTHORING.zh-CN.md](./docs/ARTICLE_AUTHORING.zh-CN.md)
- [docs/ARTICLE_AUTHORING_GITHUB_WEB.zh-CN.md](./docs/ARTICLE_AUTHORING_GITHUB_WEB.zh-CN.md)
- [docs/post-template.md](./docs/post-template.md)

## 说明

- 文章内容来自仓库内 Markdown，并在渲染前做安全清洗。
- 仓库已经收敛为纯静态博客形态，旧后端与后台登录流程已移除。
- 生产部署方式可参考 [DEPLOYMENT.md](./DEPLOYMENT.md)。
