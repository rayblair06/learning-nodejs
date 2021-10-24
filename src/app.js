import express from 'express';
import { userRouter } from './users/userRouter';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
