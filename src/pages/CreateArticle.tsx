import React from 'react';

const markdownTemplate = `---
title: New Article Title
summary: A short summary for the article card.
category: React
tags: React, Frontend
coverImage: https://example.com/cover.jpg
publishedAt: 2026-04-12T08:00:00.000Z
---
# Your article title

Write your content in Markdown here.
`;

export default function CreateArticle() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">投稿方式已切换</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            线上版本不再提供网页后台发文。现在的发布流程是直接往仓库里新增 Markdown 文件，push 到 `main` 后自动上线。
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">协作者发文步骤</h2>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
              <li>在 `src/content/posts/` 下新增一个 `.md` 文件。</li>
              <li>填好 frontmatter：`title`、`summary`、`category`、`tags`、`coverImage`、`publishedAt`。</li>
              <li>在 frontmatter 下方直接写 Markdown 正文。</li>
              <li>推送到 `main`，部署平台会自动重新发布。</li>
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">模板示例</h2>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 overflow-x-auto text-sm">
              <code>{markdownTemplate}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
