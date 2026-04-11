import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleAPI } from '../services/api';
import { Save, Send } from 'lucide-react';
import Button from '../components/Button';
import { renderMarkdownToHtml } from '../lib/articleContent';

export default function CreateArticle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'React',
    tags: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const categories = ['React', 'TypeScript', 'JavaScript', 'CSS', 'Vue', '其他'];

  const previewHtml = useMemo(
    () => renderMarkdownToHtml(formData.content),
    [formData.content]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const articleData = {
        ...formData,
        tags,
        coverImage: formData.coverImage || undefined,
        content: renderMarkdownToHtml(formData.content),
      };

      const article = await articleAPI.createArticle(articleData);
      navigate(`/articles/${article.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建文章失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    // TODO: 实现保存草稿功能
    alert('草稿功能开发中...');
  };

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">创建新文章</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">分享你的前端开发经验和见解</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4">
                <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  文章标题 *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-800"
                  placeholder="请输入文章标题"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="summary" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  文章摘要 *
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={3}
                  value={formData.summary}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-800"
                  placeholder="请输入文章摘要，简洁地描述文章内容"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  分类 *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-800"
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  标签
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-800"
                  placeholder="React, TypeScript, CSS (用逗号分隔)"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="coverImage" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  封面图片URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-800"
                  placeholder="https://example.com/image.jpg (可选)"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  文章内容 * （支持 Markdown）
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(p => !p)}
                  className="text-sm px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  {showPreview ? '编辑' : '预览'}
                </button>
              </div>
              {!showPreview && (
                <>
                  <textarea
                    id="content"
                    name="content"
                    rows={20}
                    value={formData.content}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand sm:text-sm font-mono text-sm bg-white dark:bg-slate-800"
                    placeholder="在此编写 Markdown，例如：# 标题、**加粗**、```代码```、[链接](https://example.com)"
                    required
                  />
                  <p className="mt-2 text-xs text-slate-500">提示：支持常用 Markdown 语法（标题、加粗、斜体、链接、代码块等）。</p>
                </>
              )}
              {showPreview && (
                <div className="prose-aimi p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                保存草稿
              </Button>
              <Button type="submit" loading={loading} leftIcon={<Send className="h-4 w-4" />}> 
                {loading ? '发布中...' : '发布文章'}
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
}
