import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        res.status(400).json({
          success: false,
          message: 'Validation error',
          error: errorMessage,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid request data',
        });
      }
    }
  };
};

export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const articleSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  summary: z.string().min(1).max(500),
  category: z.string().min(1).max(50),
  tags: z.array(z.string()).optional(),
});

export const commentSchema = z.object({
  author_name: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});
