import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest, registerSchema, loginSchema } from '../middleware/validation';

const router = Router();

// Public routes
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', login); // Temporarily remove validation to test

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;