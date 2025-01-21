import cors from 'cors';
import express from 'express';
//import morganMiddleware from './middleware/morgan.middleware';
import router from './router/main.router';
import jwtRouter from './router/protect.router';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
//app.use(morganMiddleware);
app.use('/', router);

app.use(jwtRouter);
export default app;
