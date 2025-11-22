import React, { useState, useEffect, useMemo } from 'react';
import ArticleCard from '../components/ArticleCard';
import CategoryNav from '../components/CategoryNav';
import SearchBar from '../components/SearchBar';
import { articleAPI } from '../services/api';
import { useI18n } from '@/contexts/I18nContext';
import { Article, Category } from '../types';
import { Loader2 } from 'lucide-react';
import Button from '../components/Button';

const Home: React.FC = () => {
  const { t } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articleAPI.getArticles(activeCategory === 'all' ? undefined : activeCategory, searchQuery || undefined);
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory, searchQuery]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await articleAPI.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Fallback to mock categories if API fails
        setCategories([
          { id: '1', name: 'React', slug: 'react', count: 0 },
          { id: '2', name: 'TypeScript', slug: 'typescript', count: 0 },
          { id: '3', name: 'CSS', slug: 'css', count: 0 },
          { id: '4', name: 'JavaScript', slug: 'javascript', count: 0 },
          { id: '5', name: 'Vue', slug: 'vue', count: 0 },
        ]);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-slate-100 mb-4">
            {t('app_title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder={t('search_placeholder')} />
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <CategoryNav 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryClick={handleCategoryClick} 
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>{t('reload')}</Button>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('no_articles')}</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
  );
};

export default Home;
