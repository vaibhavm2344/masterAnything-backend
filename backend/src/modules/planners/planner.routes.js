import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {createPlanner, getPlanner} from "./planner.controller.js";

const router = Router();

router.post("/", authMiddleware, createPlanner);
router.get("/:id", authMiddleware, getPlanner);

export default router;
