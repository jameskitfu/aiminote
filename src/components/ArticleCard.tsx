import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="p-6">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
          <Link to={`/articles/${article.id}`}>
            {article.title}
          </Link>
        </h2>

        {/* Summary */}
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.summary || article.excerpt || '暂无摘要'}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-slate-500">+{article.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{article.author.username}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
          </div>
          <Link
            to={`/articles/${article.id}`}
            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
          >
            阅读更多 →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
