import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types';
import { articleAPI } from '../services/api';
import { ArrowLeft, Calendar, Loader2, MessageCircle, Sparkles, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { renderMarkdownToHtml } from '../lib/articleContent';
import GiscusComments from '../components/GiscusComments';
import { useI18n } from '@/contexts/useI18n';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useI18n();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const articleData = await articleAPI.getArticleById(id);
        setArticle(articleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <div className="section-frame flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <div className="section-frame p-10 text-center">
          <h1 className="font-heading text-4xl text-slate-950 dark:text-white">加载失败</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{error}</p>
          <div className="mt-6">
            <Button onClick={() => window.location.reload()}>重新加载</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <div className="section-frame p-10 text-center">
          <h1 className="font-heading text-4xl text-slate-950 dark:text-white">文章未找到</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">抱歉，您访问的文章不存在。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:border-brand/40 dark:border-brand/20 dark:bg-slate-950 dark:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{lang === 'zh' ? '返回文章档案' : 'Back to archive'}</span>
        </Link>
      </div>

      <article className="hero-canvas overflow-hidden p-8 sm:p-10">
        <div className="relative z-10">
          <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="signal-chip text-slate-300">
                  {article.category}
                </span>
                <span className="signal-chip font-mono text-slate-400">
                  ARTICLE / {article.id.toUpperCase()}
                </span>
              </div>

              <h1 className="max-w-4xl font-heading text-5xl leading-[0.95] text-white">
                {article.title}
              </h1>

              {(article.summary || article.excerpt) && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  {article.summary || article.excerpt}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>{article.author.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="art-panel min-h-[19rem]">
              <div className="scanline" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    reading surface
                  </p>
                  <p className="mt-4 max-w-[16rem] text-sm leading-7 text-slate-200">
                    {lang === 'zh'
                      ? '把文章当作一份技术展陈来阅读，而不是普通正文页面。'
                      : 'Read the article as a technical exhibit, not just a block of content.'}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    archive / specimen / code
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/20 bg-slate-950/70 text-brand shadow-glow">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-10">
            <div className="prose-aimi">
              <div
                dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(article.content) }}
              />
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 border-t border-white/10 pt-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <div className="section-frame overflow-hidden p-8 sm:p-10">
        <div className="border-b border-slate-300/60 pb-5 dark:border-slate-700/70">
          <h3 className="flex items-center gap-2 font-heading text-3xl text-slate-950 dark:text-white">
            <MessageCircle className="h-5 w-5" />
            <span>评论互动</span>
          </h3>
        </div>
        <div className="pt-6">
          <p className="mb-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
            评论由 Giscus 承载，访客使用自己的 GitHub 账号即可参与讨论。
          </p>
          <GiscusComments />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
