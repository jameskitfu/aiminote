import { Router } from 'express';
import {
  getCommentsByArticle,
  createComment,
  deleteComment,
} from '../controllers/commentController';
import { validateRequest, commentSchema } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/article/:articleId', getCommentsByArticle);

// Public routes (no authentication required for creating comments)
router.post('/article/:articleId', validateRequest(commentSchema), createComment);

// Protected routes (require authentication for deletion)
router.delete('/:id', authenticateToken, deleteComment);

export default router;
