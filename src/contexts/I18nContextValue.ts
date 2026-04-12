import { createContext } from 'react';

export type Lang = 'zh' | 'en';

type Dict = Record<string, Record<Lang, string>>;

export const dictionary: Dict = {
  app_title: { zh: '爱米的前端小笔记', en: 'Aimi Frontend Notes' },
  nav_home: { zh: '首页', en: 'Home' },
  nav_articles: { zh: '文章', en: 'Articles' },
  nav_about: { zh: '关于', en: 'About' },
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
};

export type I18nKey = keyof typeof dictionary;

export type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey) => string;
};

export const I18nContext = createContext<I18nValue | null>(null);
