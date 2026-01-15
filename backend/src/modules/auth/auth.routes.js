import { Router } from "express";
import { register, login, refresh, logout, authLimiter } from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login",authLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;