import express from 'express';
import passport from 'passport';
import { login, register, refreshToken, logout, googleCallback } from '../controllers/auth-controller.js';
import { loginRateLimit, registerRateLimit } from '../middlewares/ratelimit-middleware.js';

const router =  express.Router();

router.post('/register',registerRateLimit,register);
router.post('/login',loginRateLimit,login);
router.post('/refresh',refreshToken);
router.post('/logout',logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: process.env.FRONTEND_URL + "/login" }),googleCallback);
export default router;