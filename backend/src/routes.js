import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { getMe } from './modules/auth/auth.controller.js';
import authMiddleware, { requireRole } from './middlewares/auth.middleware.js';


const router = Router();

router.use('/auth', authRoutes);
router.get('/me', authMiddleware, getMe);
// router.get('/admin',authMiddleware, requireRole('admin'),adminController)

export default router;