import { Article, AuthResponse, Comment, User } from '../types';
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
  
  createArticle: async (articleData: Partial<Article>) => {
    void articleData;
    throw new Error('线上版本不支持网页发文，请直接提交 Markdown 文件。');
  },
  
  updateArticle: async (id: string, articleData: Partial<Article>) => {
    void id;
    void articleData;
    throw new Error('线上版本不支持网页编辑，请直接修改仓库内容。');
  },
  
  deleteArticle: async (id: string) => {
    void id;
    throw new Error('线上版本不支持网页删文，请直接在仓库中管理内容。');
  },
  
  getCategories: async () => {
    return getStaticCategories();
  },
};

// Comment API functions
export const commentAPI = {
  getCommentsByArticle: async (articleId: string, page: number = 1, limit: number = 20) => {
    void articleId;
    return {
      comments: [] as Comment[],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 1,
      },
    };
  },
  
  createComment: async (articleId: string, commentData: { author_name: string; content: string }) => {
    void articleId;
    void commentData;
    throw new Error('评论已切换到 Giscus，请在页面底部直接发表评论。');
  },
  
  deleteComment: async (id: string) => {
    void id;
    throw new Error('评论已切换到 Giscus，请前往 GitHub Discussions 管理。');
  },
};

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    void email;
    void password;
    return {
      success: false,
      message: '线上版本不提供后台登录，请直接提交仓库内容。',
    };
  },
  
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    void username;
    void email;
    void password;
    return {
      success: false,
      message: '线上版本不开放注册。',
    };
  },
  
  getProfile: async (): Promise<{ data: User }> => {
    throw new Error('线上版本不提供后台登录。');
  },
  
  updateProfile: async (userData: Partial<User>): Promise<{ data: User }> => {
    void userData;
    throw new Error('线上版本不提供后台登录。');
  },
};

// Utility functions
export const setAuthToken = (token: string) => {
  void token;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getAuthToken = () => {
  return null;
};

export const isAuthenticated = () => {
  return false;
};
