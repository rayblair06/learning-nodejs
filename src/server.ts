import { app } from './app';


const port: number = 3000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
