import express from 'express';
import { login, register, refreshToken } from '../controllers/auth-controller.js';

const router =  express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/refresh',refreshToken);

export default router;