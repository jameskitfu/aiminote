import { useMemo } from 'react';
import { Article } from '../types';

const normalizeCategory = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, '-');

export function useArticlesFilter(
  articles: Article[],
  searchQuery: string,
  activeCategory: string
) {
  const filtered = useMemo(() => {
    let result = articles;

    if (activeCategory && activeCategory !== 'all') {
      const cat = normalizeCategory(activeCategory);
      result = result.filter(a => normalizeCategory(a.category) === cat);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.summary || a.excerpt || '').toLowerCase().includes(q) ||
        (a.tags || []).some(tag => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [articles, searchQuery, activeCategory]);

  return filtered;
}

