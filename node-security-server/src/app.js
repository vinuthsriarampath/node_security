import express from 'express';
import indexRoute from './routes/index-route.js';

const app = express();

app.use('/api',indexRoute);

export default app;