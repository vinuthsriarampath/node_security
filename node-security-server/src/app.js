import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import indexRoute from './routes/index-route.js';
import cors from 'cors';
import passport from 'passport';
import './config/passport.js';

const app = express();

app.use(express.json());
console.log(process.env.FRONTEND_URL)
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true,
}))

app.use(passport.initialize());

app.use('/api',indexRoute);

export default app;