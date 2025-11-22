import { Article, Category, Comment, User, AuthResponse } from '../types';

const API_BASE_URL = 'http://localhost:3002/api';

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Network error');
  }
  
  return response.json();
};

// Article API functions
export const articleAPI = {
  getArticles: async (category?: string, search?: string, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await apiRequest(`/articles?${params}`);
    return response.data;
  },
  
  getArticleById: async (id: string) => {
    const response = await apiRequest(`/articles/${id}`);
    return response.data;
  },
  
  createArticle: async (articleData: Partial<Article>) => {
    const response = await apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
    return response.data;
  },
  
  updateArticle: async (id: string, articleData: Partial<Article>) => {
    const response = await apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
    return response.data;
  },
  
  deleteArticle: async (id: string) => {
    const response = await apiRequest(`/articles/${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
  
  getCategories: async () => {
    const response = await apiRequest('/articles/categories');
    return response.data;
  },
};

// Comment API functions
export const commentAPI = {
  getCommentsByArticle: async (articleId: string, page: number = 1, limit: number = 20) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await apiRequest(`/comments/article/${articleId}?${params}`);
    return response.data;
  },
  
  createComment: async (articleId: string, commentData: { author_name: string; content: string }) => {
    const response = await apiRequest(`/comments/article/${articleId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
    return response.data;
  },
  
  deleteComment: async (id: string) => {
    const response = await apiRequest(`/comments/${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response;
  },
  
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    return response;
  },
  
  getProfile: async (): Promise<{ data: User }> => {
    const response = await apiRequest('/auth/profile');
    return response;
  },
  
  updateProfile: async (userData: Partial<User>): Promise<{ data: User }> => {
    const response = await apiRequest('/auth/profile', {
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
