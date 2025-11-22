import { useMemo } from 'react';
import { Article } from '../types';

export function useArticlesFilter(
  articles: Article[],
  searchQuery: string,
  activeCategory: string
) {
  const filtered = useMemo(() => {
    let result = articles;

    if (activeCategory && activeCategory !== 'all') {
      const cat = activeCategory.toLowerCase();
      result = result.filter(a => a.category.toLowerCase() === cat);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        (a.tags || []).some(tag => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [articles, searchQuery, activeCategory]);

  return filtered;
}

