import { Router } from 'express';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getCategories,
} from '../controllers/articleController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest, articleSchema } from '../middleware/validation';

const router: Router = Router();

// Public routes
router.get('/', getArticles);
router.get('/categories', getCategories);
router.get('/:id', getArticleById);

// Protected routes (require authentication)
router.post('/', authenticateToken, validateRequest(articleSchema), createArticle);
router.put('/:id', authenticateToken, validateRequest(articleSchema), updateArticle);
router.delete('/:id', authenticateToken, deleteArticle);

export default router;
