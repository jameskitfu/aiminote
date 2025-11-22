export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  author: User;
  coverImage?: string;
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail?: string;
  articleId: string;
  status: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
  count?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}