/**
 * Load our environment variables
 */
import dotenv from 'dotenv';
dotenv.config();

/**
 * Bootstrap our application
 */
import express from 'express';
import { userRouter } from './api/user';
import { groupRouter } from './api/group';

import { errorLogger, errorResponder } from './loaders/middleware';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/groups', groupRouter);
app.use('/users', userRouter);

// Middleware
app.use(errorLogger);
app.use(errorResponder);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
