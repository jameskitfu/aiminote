import {
  filterArticles,
  getArticleBySlug,
  getCategories as getStaticCategories,
} from '../content/articles';

// Article API functions
export const articleAPI = {
  getArticles: async (category?: string, search?: string, page: number = 1, limit: number = 10) => {
    const articles = filterArticles(category, search);
    const offset = (page - 1) * limit;

    return {
      articles: articles.slice(offset, offset + limit),
      pagination: {
        total: articles.length,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(articles.length / limit)),
      },
    };
  },
  
  getArticleById: async (id: string) => {
    const article = getArticleBySlug(id);

    if (!article) {
      throw new Error('文章未找到');
    }

    return article;
  },

  getCategories: async () => {
    return getStaticCategories();
  },
};
