import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routes.js';
import errorHandler from './middlewares/error.middleware.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);
app.use(errorHandler);

export default app;