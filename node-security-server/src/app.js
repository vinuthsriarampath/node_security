import express from 'express';
import indexRoute from './routes/index-route.js';

const app = express();

app.use(express.json())

app.use('/api',indexRoute);

export default app;