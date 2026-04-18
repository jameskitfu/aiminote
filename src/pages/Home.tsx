import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Cpu, Loader2, Orbit, Radar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import CategoryNav from '../components/CategoryNav';
import SearchBar from '../components/SearchBar';
import { articleAPI } from '../services/api';
import { useI18n } from '@/contexts/useI18n';
import { Article, Category } from '../types';
import Button from '../components/Button';

const Home: React.FC = () => {
  const { t, lang } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const copy = lang === 'zh'
    ? {
        heroEyebrow: 'Aimi / 前端未来感档案',
        heroTitle: '把前端做成一种可见的技术气场。',
        heroBody:
          '这里不是知识库，也不是整理型笔记软件。它更像一座持续运行的前端研究站，记录界面结构、实现判断、动效克制和一个科技行业从业者的技术执迷。',
        heroPrimary: '进入文章档案',
        heroSecondary: '阅读关于我',
        heroBadge: 'Static archive / Vercel deployed / code-authored',
        metrics: {
          articles: '文章存档',
          categories: '分类簇群',
          comments: '评论协议',
        },
        protocolTitle: '站点协议',
        protocolItems: [
          { label: '发布方式', value: 'Markdown / push / auto deploy' },
          { label: '界面语言', value: '冷黑、冰蓝、电光信号' },
          { label: '评论系统', value: 'Giscus / GitHub Discussions' },
        ],
        radarTitle: '当前扫描重点',
        radarItems: [
          '界面系统，而不是组件拼贴',
          '阅读体验，而不是“像 Notion 一样”',
          '科技行业工作者应有的结构、速度与锋利感',
        ],
        galleryEyebrow: 'Visual field / interaction atmosphere',
        galleryTitle: '我想让这个网站像一张会发光的技术画布。',
        galleryBody:
          '所以它不该只有信息，还要有构图、空气、节奏和压迫感。每个版面都应该让人看出这是一个懂实现、也懂审美的人在写它。',
        manifestoEyebrow: 'Method / system logic',
        manifestoTitle: '真正的科技感，不是蓝色渐变和漂浮玻璃。',
        manifestoBody:
          '它应该来自结构、协议、信号、密度和控制力。页面要像一个运行中的技术系统，而不是一个好看的笔记本。',
        manifestoPoints: [
          '首屏像技术海报，不像资料页',
          '模块像协议，不像卡片',
          '每篇文章都像一份可索引的技术档案',
        ],
        featuredEyebrow: '焦点 / 主档案',
        publishedLabel: '发布时间',
        authorLabel: '作者',
        latestEyebrow: '最新档案',
        latestTitle: '最新技术档案',
        latestBody: '最近更新的文章、研究与界面实验会优先出现在这里。',
        emptyState: '没有找到相关文章',
      }
    : {
        heroEyebrow: 'Aimi / Frontend Futurism',
        heroTitle: 'Frontend shaped as a visible field of technical intent.',
        heroBody:
          'Not a notebook. Not a generic blog. This is a continuously authored frontend station documenting structure, implementation judgement, restrained motion, and a technologist’s obsession with control.',
        heroPrimary: 'Enter the archive',
        heroSecondary: 'Read the profile',
        heroBadge: 'Static archive / Vercel deployed / code-authored',
        metrics: {
          articles: 'Articles indexed',
          categories: 'Category clusters',
          comments: 'Comment protocol',
        },
        protocolTitle: 'Site protocol',
        protocolItems: [
          { label: 'Publishing', value: 'Markdown / push / auto deploy' },
          { label: 'Visual language', value: 'cold black, ice blue, signal accents' },
          { label: 'Comments', value: 'Giscus / GitHub Discussions' },
        ],
        radarTitle: 'Current scan targets',
        radarItems: [
          'Interface systems over component collage',
          'Reading surfaces over “Notion-like” softness',
          'Structure, speed, and sharpness expected from a tech worker',
        ],
        galleryEyebrow: 'Visual field / interaction atmosphere',
        galleryTitle: 'I want the site to feel like a luminous technical canvas.',
        galleryBody:
          'So it should not carry information only. It should carry composition, air, rhythm, and pressure. Every surface should reveal both implementation fluency and aesthetic control.',
        manifestoEyebrow: 'Manifesto / editorial logic',
        manifestoTitle: 'Real tech atmosphere is not blue gradients and floating glass.',
        manifestoBody:
          'It comes from structure, protocol, signal, density, and control. The page should feel like a running system, not a beautiful notebook.',
        manifestoPoints: [
          'The first screen should read like a technical poster',
          'Modules should feel like protocols, not cards',
          'Every article should behave like an indexable dossier',
        ],
        featuredEyebrow: 'Featured / primary dossier',
        publishedLabel: 'Published',
        authorLabel: 'Author',
        latestEyebrow: 'Latest dossiers',
        latestTitle: 'Latest technical dossiers',
        latestBody: 'Recent writing, research, and interface studies surface here first.',
        emptyState: 'No articles found',
      };

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

  const featuredArticle = useMemo(() => articles[0], [articles]);
  const articleCountLabel = String(articles.length).padStart(2, '0');
  const categoryCountLabel = String(categories.length).padStart(2, '0');

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="hero-canvas p-8 sm:p-10 lg:p-12">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
          <div className="max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="eyebrow text-slate-300">{copy.heroEyebrow}</span>
              <span className="signal-chip font-mono text-slate-300">
                {copy.heroBadge}
              </span>
            </div>

            <h1 className="max-w-5xl text-balance font-heading text-[3.5rem] font-semibold leading-[0.9] text-white sm:text-[4.8rem] lg:text-[6rem]">
              {copy.heroTitle}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {copy.heroBody}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-brand/18"
              >
                {copy.heroPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:text-white"
              >
                {copy.heroSecondary}
              </Link>
            </div>

            <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  {copy.metrics.articles}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">{articleCountLabel}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  {copy.metrics.categories}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">{categoryCountLabel}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  {copy.metrics.comments}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">G+</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-[minmax(220px,1fr)_minmax(0,1fr)] lg:grid-cols-1">
              <div className="paint-orb">
                <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-slate-950/46 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
                  signal field
                </div>
                <div className="absolute bottom-8 left-8 flex items-center gap-3 rounded-full border border-brand/20 bg-slate-950/52 px-4 py-3 backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/25 bg-brand/10 shadow-glow">
                    <Radar className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">live visual core</p>
                    <p className="text-sm text-white">{lang === 'zh' ? '技术感应层已激活' : 'technical field active'}</p>
                  </div>
                </div>
              </div>

              <div className="info-rail p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-brand" />
                  <h2 className="font-heading text-2xl text-white">{copy.protocolTitle}</h2>
                </div>
                <div className="space-y-4">
                  {copy.protocolItems.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-none last:pb-0">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        {item.label}
                      </span>
                      <span className="max-w-[14rem] text-right text-sm text-slate-200">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="info-rail p-6">
              <div className="mb-4 flex items-center gap-3">
                <Orbit className="h-5 w-5 text-signal" />
                <h3 className="font-heading text-2xl text-white">{copy.radarTitle}</h3>
              </div>
              <div className="space-y-3">
                {copy.radarItems.map((item, index) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
                    <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
                      0{index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame overflow-hidden p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:items-center">
          <div>
            <p className="eyebrow mb-5">{copy.galleryEyebrow}</p>
            <h2 className="max-w-3xl font-heading text-4xl leading-tight text-slate-950 dark:text-white">
              {copy.galleryTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {copy.galleryBody}
            </p>
          </div>
          <div className="relative min-h-[16rem] overflow-hidden rounded-[1.75rem] border border-slate-300/50 bg-slate-950 dark:border-slate-700/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(97,243,255,0.18),transparent_24%),radial-gradient(circle_at_70%_34%,rgba(255,226,148,0.16),transparent_18%),radial-gradient(circle_at_58%_78%,rgba(132,146,255,0.18),transparent_24%),linear-gradient(135deg,#06101e,#091323_40%,#040914)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(116,146,186,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(116,146,186,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
            <div className="absolute left-[14%] top-[18%] h-28 w-28 rounded-full border border-brand/20 bg-brand/10 blur-[1px]" />
            <div className="absolute right-[18%] top-[30%] h-20 w-20 rounded-full border border-white/10 bg-white/5" />
            <div className="absolute bottom-[18%] left-[30%] h-36 w-36 rounded-[42%_58%_64%_36%/40%_32%_68%_60%] border border-signal/20 bg-signal/5" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                composition / depth / signal
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/20 bg-slate-950/70 text-brand shadow-glow">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="section-frame p-8 sm:p-10">
          <p className="eyebrow mb-5">{copy.manifestoEyebrow}</p>
          <h2 className="max-w-3xl font-heading text-4xl leading-tight text-slate-950 dark:text-white">
            {copy.manifestoTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            {copy.manifestoBody}
          </p>
        </div>

        <div className="section-frame p-8 sm:p-10">
          <div className="space-y-5">
            {copy.manifestoPoints.map((point, index) => (
              <div key={point} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-brand/20 bg-slate-950 text-xs font-semibold text-brand">
                  0{index + 1}
                </span>
                <p className="pt-1 text-base leading-7 text-slate-700 dark:text-slate-200">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame p-6 sm:p-7">
        <SearchBar onSearch={setSearchQuery} placeholder={t('search_placeholder')} />
        <div className="mt-6">
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
          />
        </div>
      </section>

      {featuredArticle && !loading && !error && (
        <section className="section-frame overflow-hidden p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
            <div className="space-y-5">
              <p className="eyebrow">{copy.featuredEyebrow}</p>
              <h2 className="font-heading text-4xl leading-tight text-slate-950 dark:text-white">
                {featuredArticle.title}
              </h2>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                {featuredArticle.summary || featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {featuredArticle.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="signal-chip text-slate-600 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/articles/${featuredArticle.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-500"
              >
                <span>{copy.heroPrimary}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-[1.6rem] border border-slate-300/60 bg-white/24 p-6 dark:border-slate-700 dark:bg-slate-950/40">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {featuredArticle.category}
                </span>
                <Sparkles className="h-4 w-4 text-signal-700 dark:text-signal-500" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    {copy.publishedLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                    {new Date(featuredArticle.createdAt).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    {copy.authorLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{featuredArticle.author.username}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">{copy.latestEyebrow}</p>
            <h2 className="font-heading text-4xl text-slate-950 dark:text-white">{copy.latestTitle}</h2>
            <p className="mt-2 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {copy.latestBody}
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
          </div>
        )}

        {error && !loading && (
          <div className="section-frame p-8 text-center">
            <p className="mb-4 text-red-500">{error}</p>
            <Button onClick={() => window.location.reload()}>{t('reload')}</Button>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="section-frame p-8 text-center">
            <p className="text-lg text-slate-500 dark:text-slate-400">{copy.emptyState}</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
