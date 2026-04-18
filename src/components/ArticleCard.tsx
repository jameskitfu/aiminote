import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Calendar, Sparkles, Tag } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();
  const articleUrl = `/articles/${article.id}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('a, button')) {
      return;
    }

    navigate(articleUrl);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    navigate(articleUrl);
  };

  const cardIndex = article.id.slice(0, 2).toUpperCase();

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="group relative cursor-pointer overflow-hidden rounded-[1.6rem] border border-slate-300/60 bg-white/26 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-brand/50 dark:border-slate-700/80 dark:bg-slate-950/42"
      aria-label={`查看文章：${article.title}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="signal-chip text-slate-600 dark:text-slate-300">
          {article.category}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 dark:text-brand/70">
          {cardIndex}
        </span>
      </div>

      <h2 className="mb-4 text-2xl font-semibold leading-tight text-slate-950 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-500">
        <Link to={articleUrl}>
          {article.title}
        </Link>
      </h2>

      <p className="mb-5 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {article.summary || article.excerpt || '暂无摘要'}
      </p>

      {article.tags && article.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full border border-slate-300/70 bg-white/24 px-2.5 py-1 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/36 dark:text-slate-300"
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand-700 dark:text-brand-500">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-300/50 pt-5 dark:border-slate-800/80">
        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>{article.author.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
        <Link
          to={articleUrl}
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 group-hover:border-brand/40 group-hover:text-brand-300 dark:border-brand/20 dark:bg-slate-950 dark:text-white"
        >
          <span>阅读更多</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
