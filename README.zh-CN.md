# Aiminote

[English README](./README.md)

Aiminote 是一个面向前端技术内容的全栈博客示例项目。仓库包含一个基于 Vite + React 的前端，以及一个基于 Express + TypeScript 的后端 API，默认使用轻量级的 mock 数据层方便本地开发和演示。

## 功能概览

- 按分类浏览文章，支持关键词搜索和详情页查看
- 使用演示账号登录并创建文章
- 文章支持公开评论，删除评论需要登录鉴权
- 文章内容在服务端和客户端都会做 HTML 安全清洗
- 前后端都有独立的构建、类型检查和 lint 流程

## 技术栈

- 前端：React、TypeScript、Vite、React Router、Tailwind CSS
- 后端：Express、TypeScript、Zod、JWT、Sequelize
- 开发数据：服务启动时加载的内存 mock 数据

## 目录结构

```text
.
├─ src/                前端应用
├─ api/                后端 API
├─ public/             静态资源
├─ DEPLOYMENT.md       生产部署说明
└─ README.md           英文文档
```

## 环境要求

- Node.js 18+
- pnpm 9+

## 本地启动

### 1. 安装依赖

```bash
pnpm install
cd api && pnpm install
```

### 2. 启动后端

```bash
cd api
pnpm dev
```

默认监听地址是 `http://localhost:3001`。

### 3. 启动前端

打开第二个终端执行：

```bash
pnpm dev
```

前端默认运行在 `http://localhost:5173`。

## 环境变量

### 前端

前端通过 `VITE_API_BASE_URL` 读取 API 地址；如果未配置，则默认回退到 `http://localhost:3001/api`。

示例 `.env.local`：

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

也可以直接参考 [`.env.example`](./.env.example) 里的默认配置。

### 后端

后端使用 `api/.env`。

常用配置项：

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

当前默认开发配置使用内存型 SQLite 和 mock 数据，因此后端重启后数据会重置。

## 演示账号

本地可直接使用以下账号测试登录和发文流程：

- 邮箱：`aimi@example.com`
- 密码：`password`

## 可用脚本

### 前端

```bash
pnpm dev
pnpm check
pnpm lint
pnpm build
pnpm preview
```

### 后端

```bash
cd api
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## 说明

- 文章内容会在存储前和渲染前各做一次安全清洗。
- 评论可以公开创建，但删除评论必须携带有效登录 token。
- 生产部署可参考 [DEPLOYMENT.md](./DEPLOYMENT.md)。
