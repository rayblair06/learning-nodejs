
import dotenv from 'dotenv';
import express from 'express';

import routes from './api/routes';
import { serviceLogger, errorLogger, errorResponder } from './loaders/middleware';


dotenv.config();


const app = express();
const port = 3000;

// Logging Middleware
app.use(serviceLogger);

// Router
app.use(express.json());
app.use(routes);

// Error Middleware
app.use(errorLogger);
app.use(errorResponder);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
