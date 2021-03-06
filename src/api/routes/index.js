import express from 'express';

import authRouter from './auth';
import baseRouter from './base';
import groupRouter from './group';
import userRouter from './user';


const app = express();

app.use('/authenticate', authRouter);
app.use('/', baseRouter);
app.use('/groups', groupRouter);
app.use('/users', userRouter);

export default app;
