import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { getMe } from './modules/auth/auth.controller.js';
import authMiddleware from './middlewares/auth.middleware.js';
import coursesRoutes from "./modules/courses/courses.routes.js";
import plannerRoutes from "./modules/planners/planner.routes.js";


const router = Router();

router.use('/auth', authRoutes);
router.use('/me', authMiddleware, getMe);
router.use("/courses", coursesRoutes);
router.use("/planners", plannerRoutes);

export default router;