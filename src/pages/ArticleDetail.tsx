import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types';
import { articleAPI } from '../services/api';
import { Calendar, User, MessageCircle, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { renderMarkdownToHtml } from '../lib/articleContent';
import GiscusComments from '../components/GiscusComments';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
    new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">加载失败</h1>
            <p className="text-slate-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>重新加载</Button>
          </div>
        </div>
    );
  }

  if (!article) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">文章未找到</h1>
            <p className="text-slate-600">抱歉，您访问的文章不存在。</p>
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-slate-200">
            {article.coverImage && (
              <div className="mb-6">
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {article.title}
            </h1>
            
            {(article.summary || article.excerpt) && (
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {article.summary || article.excerpt}
              </p>
            )}
            
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              {article.author && (
                <div className="flex items-center mr-6">
                  <User className="h-4 w-4 mr-2" />
                  <span>{article.author.username}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose-aimi">
              <div 
                className="text-slate-700 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(article.content) }}
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              评论互动
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              评论功能由 Giscus 提供，访客使用自己的 GitHub 账号即可参与讨论。
            </p>
            <GiscusComments />
          </div>
        </div>
      </div>
  );
};

export default ArticleDetail;
