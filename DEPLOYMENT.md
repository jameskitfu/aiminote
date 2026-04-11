# Aiminote 部署文档（生产环境）

本文档基于当前代码结构编写，覆盖前后端分离部署（Nginx 静态站点 + Node.js API）。请根据你的服务器环境（建议 Ubuntu 22.04）执行。

## 架构概览

- 前端：React + Vite 构建为静态文件，部署到 Nginx。
- 后端：Express + TypeScript，运行为 Node.js 服务（建议用 systemd 管理）。
- 重要提示：当前后端数据库配置为 SQLite 内存模式（重启后数据丢失），生产需改为持久化（SQLite 文件或 MySQL）。

## 前提条件

- 已准备域名，例如 `aiminote.example.com`
- 服务器已安装：`Node.js >= 18`、`npm`、`Nginx`
- 可选：`Certbot` 用于自动申请/续期 HTTPS 证书

## 代码结构

- 前端根目录：`./`
- 后端目录：`./api`

## 后端部署（API）

1. 安装依赖并构建

   ```bash
   cd api
   npm install --production
   npm run build
   ```

2. 配置环境变量 `.env`（与 `api` 目录同级）

   - `PORT`：API 监听端口，默认是 `3001`
   - `FRONTEND_URL`：允许跨域的前端地址，支持逗号分隔多个域名
   - `JWT_SECRET`：JWT 密钥，生产必须设置为强随机值
   - `JWT_EXPIRES_IN`：令牌有效期，默认 `7d`

   示例（`api/.env`）：

   ```env
   PORT=3001
   FRONTEND_URL=https://aiminote.example.com
   JWT_SECRET=replace-with-a-strong-random-secret
   JWT_EXPIRES_IN=7d
   ```

3. 重要：数据库持久化（生产必选其一）

   当前代码在 `api/src/utils/database.ts` 中使用 SQLite 内存模式：

   - 方言：`sqlite`
   - 存储：`:memory:`（重启丢数据）

   生产可选两种方案：

   - SQLite 文件：将 `storage` 改为文件路径（如 `/var/lib/aiminote/aiminote.sqlite`）并保证目录可写。
   - MySQL：切换 `dialect` 为 `mysql` 并配置 `DB_HOST`、`DB_PORT`、`DB_NAME`、`DB_USER`、`DB_PASSWORD`。

   示例环境变量（MySQL）：

   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=aiminote
   DB_USER=aimi
   DB_PASSWORD=strong-password-here
   ```

   注意：切换数据库后首次运行会自动建表（`sequelize.sync`），但生产环境请做好备份与迁移策略。

4. 以 systemd 方式运行（Ubuntu）

   创建服务文件 `/etc/systemd/system/aiminote-api.service`：

   ```ini
   [Unit]
   Description=Aiminote API Service
   After=network.target

   [Service]
   WorkingDirectory=/srv/aiminote/api
   ExecStart=/usr/bin/node /srv/aiminote/api/dist/server.js
   Restart=always
   EnvironmentFile=/srv/aiminote/api/.env
   # 生产建议设置更严格的权限与资源限制

   [Install]
   WantedBy=multi-user.target
   ```

   启动与开机自启：

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable aiminote-api
   sudo systemctl start aiminote-api
   sudo systemctl status aiminote-api
   ```

## 前端部署（静态站点）

1. 设置 API 地址

   前端当前支持通过环境变量 `VITE_API_BASE_URL` 配置 API 地址：

   - 开发环境默认使用 `http://localhost:3001/api`
   - 生产环境默认使用同域 `/api`

   如果你是前后端同域部署并通过 Nginx 反代 `/api`，通常不需要额外配置。

   如果你是前后端分开部署，可以在前端构建前提供：

   ```env
   VITE_API_BASE_URL=https://api.aiminote.example.com/api
   ```

2. 构建静态文件

   ```bash
   cd /srv/aiminote
   npm install --production
   npm run build
   ```

   构建产物位于 `dist/` 目录。

3. Nginx 配置（静态 + 反向代理 `/api`）

   创建配置 `/etc/nginx/sites-available/aiminote`：

   ```nginx
   server {
     listen 80;
     server_name aiminote.example.com;

     # 前端静态文件
     root /srv/aiminote/dist;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     # 反向代理 API（保持路径前缀）
     location /api/ {
       proxy_pass http://127.0.0.1:3001/api/;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

   启用并重载：

   ```bash
   sudo ln -s /etc/nginx/sites-available/aiminote /etc/nginx/sites-enabled/aiminote
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. 配置 HTTPS（可选但强烈建议）

   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d aiminote.example.com
   ```

## 部署路径建议

- 建议统一部署目录为：`/srv/aiminote`（前端在此构建，后端位于 `/srv/aiminote/api`）
- 若使用 SQLite 文件，建议放在 `/var/lib/aiminote/aiminote.sqlite` 并设置适当权限

## 验证与联调

1. API 健康检查：`http://127.0.0.1:3001/health`
2. 前端页面能正常访问 `aiminote.example.com`
3. 登录/注册接口：
   - 后端登录路由：`POST /api/auth/login`
   - 后端注册路由：`POST /api/auth/register`

4. CORS 校验：确保后端环境变量 `FRONTEND_URL` 与实际前端域名一致，否则跨域会被拒绝。

## 运维与更新

- 更新后端：
  ```bash
  cd /srv/aiminote/api
  git pull # 或替换为你的代码同步方式
  npm install --production
  npm run build
  sudo systemctl restart aiminote-api
  ```

- 更新前端：
  ```bash
  cd /srv/aiminote
  git pull
  npm install --production
  npm run build
  sudo systemctl reload nginx
  ```

## 常见问题

- 端口不一致：开发环境前端默认请求 `http://localhost:3001/api`，生产环境默认走同域 `/api`。如果是分域部署，请设置 `VITE_API_BASE_URL`。
- 数据不持久：后端当前使用 SQLite 内存模式（`storage=':memory:'`），生产需改为文件或 MySQL。
- 跨域失败：检查 `FRONTEND_URL` 与实际前端域名是否一致，协议（http/https）也需一致；如有多个来源，可用逗号分隔。
- JWT 报错：确保 `JWT_SECRET` 已设置且与生成令牌使用的一致。

## 参考代码位置

- 前端 API 基地址：`src/services/api.ts`
- 后端端口与 CORS：`api/src/server.ts`
- 后端数据库配置：`api/src/utils/database.ts` 第 20–22 行

---

