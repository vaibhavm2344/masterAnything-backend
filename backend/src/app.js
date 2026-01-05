import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routes.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

export default app;