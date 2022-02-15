import express from 'express';


export const router = express.Router();

router
    .get('/', async (request, response, next) => {
        return response.send('Blank');
    });

export default router;
