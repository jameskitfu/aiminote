import { Article, AuthResponse, Category, Comment, User } from '../types';

const DEFAULT_API_BASE_URL = '/api';

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL).replace(/\/$/, '');

interface ApiErrorPayload {
  message?: string;
}

interface ArticleListResponse {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface CommentListResponse {
  comments: Comment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ApiSuccessResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

const tryParseJson = (responseText: string): unknown => {
  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return null;
  }
};

// Helper function for API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error('无法连接到后端服务，请确认 API 已启动。');
  }

  const responseText = await response.text();
  const payload = tryParseJson(responseText);

  if (!response.ok) {
    const apiMessage =
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : '';

    const message =
      apiMessage ||
      responseText.trim() ||
      (response.status === 429
        ? '请求过于频繁，请稍后再试。'
        : `请求失败（${response.status}）`);

    throw new Error(message);
  }

  return payload as T;
};

// Article API functions
export const articleAPI = {
  getArticles: async (category?: string, search?: string, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await apiRequest<ApiSuccessResponse<ArticleListResponse>>(`/articles?${params}`);
    return response.data;
  },
  
  getArticleById: async (id: string) => {
    const response = await apiRequest<ApiSuccessResponse<Article>>(`/articles/${id}`);
    return response.data;
  },
  
  createArticle: async (articleData: Partial<Article>) => {
    const response = await apiRequest<ApiSuccessResponse<Article>>('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
    return response.data;
  },
  
  updateArticle: async (id: string, articleData: Partial<Article>) => {
    const response = await apiRequest<ApiSuccessResponse<Article>>(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
    return response.data;
  },
  
  deleteArticle: async (id: string) => {
    const response = await apiRequest<ApiErrorPayload>(`/articles/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
  
  getCategories: async () => {
    const response = await apiRequest<ApiSuccessResponse<Category[]>>('/articles/categories');
    return response.data;
  },
};

// Comment API functions
export const commentAPI = {
  getCommentsByArticle: async (articleId: string, page: number = 1, limit: number = 20) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await apiRequest<ApiSuccessResponse<CommentListResponse>>(`/comments/article/${articleId}?${params}`);
    return response.data;
  },
  
  createComment: async (articleId: string, commentData: { author_name: string; content: string }) => {
    const response = await apiRequest<ApiSuccessResponse<Comment>>(`/comments/article/${articleId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
    return response.data;
  },
  
  deleteComment: async (id: string) => {
    const response = await apiRequest<ApiErrorPayload>(`/comments/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
};

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response;
  },
  
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    return response;
  },
  
  getProfile: async (): Promise<{ data: User }> => {
    const response = await apiRequest<{ data: User }>('/auth/profile');
    return response;
  },
  
  updateProfile: async (userData: Partial<User>): Promise<{ data: User }> => {
    const response = await apiRequest<{ data: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response;
  },
};

// Utility functions
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
