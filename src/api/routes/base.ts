import express from 'express';


export const router = express.Router();

router
    .get('/', async (request, response) => {
        return response.send('Blank');
    });

export default router;
