import { StatusCodes } from 'http-status-codes';

import request from '../../utils/mocks/request.mock';


describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request
            .get('/');

        expect(response.statusCode).toBe(StatusCodes.OK);
    });
});
