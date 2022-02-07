import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import routes from './api/routes';
import { noApplicationKey, serviceLogger, errorLogger, errorResponder, unhandledRejection, uncaughtException } from './loaders/middleware';


dotenv.config();

const app = express();

process
    .on('unhandledRejection', unhandledRejection)
    .on('uncaughtException', uncaughtException);

app.use(cors());

// Logging Middleware
app.use(serviceLogger);
app.use(noApplicationKey);


// Router
app.use(express.json());
app.use(routes);

// Error Middleware
app.use(errorLogger);
app.use(errorResponder);

export { app };
