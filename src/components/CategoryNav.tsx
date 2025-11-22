import React from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryClick: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
      <h3 className="text-lg font-heading font-semibold text-slate-900 dark:text-slate-100 mb-4">技术分类</h3>
      <div className="flex flex-wrap gap-2">
        <button
          key="all"
          onClick={() => onCategoryClick('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all' || !activeCategory
              ? 'bg-brand text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryClick(category.slug)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.slug
                ? 'bg-brand text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
