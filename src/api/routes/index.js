import express from 'express';
import groupRouter from './group';
import userRouter from './user';

const app = express();

app.use('/groups', groupRouter);
app.use('/users', userRouter);

export default app;
