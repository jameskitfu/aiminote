import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import CategoryNav from '../components/CategoryNav';
import SearchBar from '../components/SearchBar';
import { useArticlesFilter } from '../hooks/useArticlesFilter';
import { articleAPI } from '../services/api';
import { Article, Category } from '../types';
import { useI18n } from '@/contexts/useI18n';

const Articles: React.FC = () => {
  const { lang } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const copy = lang === 'zh'
    ? {
        eyebrow: 'Archive / filtered dossiers',
        title: '技术文章档案',
        body: '这里收纳关于前端系统、界面表达、代码判断与实现细节的长期记录。',
        heroSideTitle: '这不是文章列表，而是被整理过的技术索引。',
        heroSideBody:
          '每篇文章都像一份可检索的档案切片，既服务阅读，也服务审美秩序。',
        countPrefix: '当前命中',
        countSuffix: '篇文章',
        noResults: '没有找到相关文章',
        suggestion: '换一个关键词、换一个分类，或者回到全部档案查看。',
      }
    : {
        eyebrow: 'Archive / filtered dossiers',
        title: 'Technical article archive',
        body: 'A running archive of frontend systems, interface studies, implementation details, and authored judgement.',
        heroSideTitle: 'This is not a list of posts. It is a curated technical index.',
        heroSideBody:
          'Each entry behaves like an addressable dossier fragment, made for both reading flow and visual order.',
        countPrefix: 'Currently matching',
        countSuffix: 'articles',
        noResults: 'No matching articles',
        suggestion: 'Try another keyword, another category, or reset back to the full archive.',
      };

  const filteredArticles = useArticlesFilter(articles, searchQuery, activeCategory);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await articleAPI.getCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articleAPI.getArticles(
          activeCategory === 'all' ? undefined : activeCategory,
          searchQuery || undefined
        );
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [activeCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="hero-canvas p-8 sm:p-10 lg:p-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-end">
          <div className="max-w-4xl">
            <p className="eyebrow mb-6">{copy.eyebrow}</p>
            <h1 className="font-heading text-[3.4rem] leading-[0.94] text-white sm:text-[4.8rem]">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              {copy.body}
            </p>
          </div>
          <div className="info-rail relative p-6">
            <div className="scanline" />
            <div className="relative z-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                curated index
              </p>
              <h2 className="mt-4 font-heading text-2xl text-white">{copy.heroSideTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{copy.heroSideBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame p-6 sm:p-7">
        <SearchBar onSearch={setSearchQuery} />
        <div className="mt-6">
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
          />
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {copy.countPrefix}{' '}
          <span className="font-semibold text-slate-950 dark:text-white">{filteredArticles.length}</span>{' '}
          {copy.countSuffix}
        </p>
        <div className="signal-chip text-slate-600 dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{activeCategory === 'all' ? 'ALL' : activeCategory.toUpperCase()}</span>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      )}

      {error && !loading && (
        <div className="section-frame p-8 text-center">
          <div className="text-red-500">{error}</div>
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {!loading && !error && filteredArticles.length === 0 && (
        <div className="section-frame p-8 text-center">
          <div className="text-lg text-slate-600 dark:text-slate-300">{copy.noResults}</div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{copy.suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default Articles;
