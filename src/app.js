import express from 'express';
import { userRouter } from './users/userRouter';

import { errorLogger, errorResponder } from './middleware';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', userRouter);

// Middleware
app.use(errorLogger);
app.use(errorResponder);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
