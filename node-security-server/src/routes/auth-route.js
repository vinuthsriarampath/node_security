import express from 'express';
import { login, register, refreshToken, logout } from '../controllers/auth-controller.js';
import { loginRateLimit, registerRateLimit } from '../middlewares/ratelimit-middleware.js';

const router =  express.Router();

router.post('/register',registerRateLimit,register);
router.post('/login',loginRateLimit,login);
router.post('/refresh',refreshToken);
router.post('/logout',logout);

export default router;