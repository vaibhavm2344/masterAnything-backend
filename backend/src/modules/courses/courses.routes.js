import { Router } from "express";
import { listCourses } from "./courses.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, listCourses);

export default router;
