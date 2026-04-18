import React from 'react';
import { useI18n } from '@/contexts/useI18n';
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
  const { lang } = useI18n();
  return (
    <div className="mb-2">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">{lang === 'zh' ? 'Taxonomy / 信号分组' : 'Taxonomy / signal groups'}</p>
          <h3 className="font-heading text-3xl text-slate-950 dark:text-white">{lang === 'zh' ? '技术分类' : 'Categories'}</h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          key="all"
          onClick={() => onCategoryClick('all')}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
            activeCategory === 'all' || !activeCategory
              ? 'border-brand/30 bg-slate-950 text-white shadow-glow dark:border-brand/30 dark:bg-slate-950 dark:text-white'
              : 'border-slate-300/70 bg-white/28 text-slate-700 hover:border-brand/40 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:border-brand/40 dark:hover:text-white'
          }`}
        >
          {lang === 'zh' ? '全部' : 'All'}
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryClick(category.slug)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              activeCategory === category.slug
                ? 'border-brand/30 bg-slate-950 text-white shadow-glow dark:border-brand/30 dark:bg-slate-950 dark:text-white'
                : 'border-slate-300/70 bg-white/28 text-slate-700 hover:border-brand/40 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:border-brand/40 dark:hover:text-white'
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
