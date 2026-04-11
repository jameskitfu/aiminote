export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface Article {
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  content: string;
  created_at: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
}

import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    created_at: Date;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
