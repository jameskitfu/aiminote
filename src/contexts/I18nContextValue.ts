import { createContext } from 'react';

export type Lang = 'zh' | 'en';

type Dict = Record<string, Record<Lang, string>>;

export const dictionary: Dict = {
  app_title: { zh: '爱米的前端小笔记', en: 'Aimi Frontend Notes' },
  nav_home: { zh: '首页', en: 'Home' },
  nav_articles: { zh: '文章', en: 'Articles' },
  nav_about: { zh: '关于', en: 'About' },
  nav_create: { zh: '创建文章', en: 'Create' },
  login_title: { zh: '登录账户', en: 'Sign In' },
  login_submit: { zh: '登录', en: 'Sign In' },
  login_loading: { zh: '登录中...', en: 'Signing in...' },
  hero_subtitle: {
    zh: '分享前端开发经验，探索最新技术趋势，记录成长路上的点点滴滴',
    en: 'Share frontend experience and explore latest trends.',
  },
  search_placeholder: {
    zh: '搜索文章标题和内容...',
    en: 'Search article title and content...',
  },
  reload: { zh: '重新加载', en: 'Reload' },
  no_articles: { zh: '没有找到相关文章', en: 'No articles found' },
  comments: { zh: '评论', en: 'Comments' },
  publish: { zh: '发布文章', en: 'Publish' },
  publishing: { zh: '发布中...', en: 'Publishing...' },
  markdown_hint: {
    zh: '提示：支持常用 Markdown 语法（标题、加粗、斜体、链接、代码块等）。',
    en: 'Hint: Markdown supported (headings, bold, italic, links, code).',
  },
};

export type I18nKey = keyof typeof dictionary;

export type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey) => string;
};

export const I18nContext = createContext<I18nValue | null>(null);
