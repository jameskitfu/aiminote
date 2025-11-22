import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import CategoryNav from '../components/CategoryNav';
import SearchBar from '../components/SearchBar';
import { useArticlesFilter } from '../hooks/useArticlesFilter';
import { articleAPI } from '../services/api';
import { Article, Category } from '../types';

const Articles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filteredArticles = useArticlesFilter(articles, searchQuery, activeCategory);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await articleAPI.getCategories();
        setCategories(data);
      } catch (err) {
        // Fallback (与 Home 保持一致)
        setCategories([
          { id: 'react', name: 'React', slug: 'react', count: 0 },
          { id: 'typescript', name: 'TypeScript', slug: 'typescript', count: 0 },
          { id: 'css', name: 'CSS', slug: 'css', count: 0 },
          { id: 'javascript', name: 'JavaScript', slug: 'javascript', count: 0 },
          { id: 'vue', name: 'Vue', slug: 'vue', count: 0 },
        ]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articleAPI.getArticles(activeCategory === 'all' ? undefined : activeCategory, searchQuery || undefined);
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">技术文章</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">探索前端技术的深度与广度，分享实用的开发经验和最佳实践</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Category Navigation */}
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            共找到 <span className="font-medium text-slate-900">{filteredArticles.length}</span> 篇文章
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-slate-500">加载中...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-2">{error}</div>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-500 text-lg mb-2">
              没有找到相关文章
            </div>
            <p className="text-slate-400">
              试试其他关键词或浏览不同分类
            </p>
          </div>
        )}
      </div>
  );
};

export default Articles;
