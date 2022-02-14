import User from '../../../src/db/models/user';
import { UserNotFoundError } from '../../../src/exceptions/errors';
import * as AuthService from '../../../src/services/auth';
import * as UserFake from '../../utils/fakes/user.fake';
import request from '../../utils/mocks/request.mock';


// Create our Test AuthToken
const authToken = AuthService.createToken({
    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
    login: 'John Doe',
    password: 'secret',
    age: 21,
    isDeleted: false
});

describe('Test the users controller', () => {
    // Setup Fakes
    UserFake.findAll();
    UserFake.findOne();
    UserFake.create();
    UserFake.update();

    test('It should return all users', async () => {
        const response = await request
            .get('/users')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining(
            [
                expect.objectContaining({
                    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                    login: 'John Doe',
                    password: 'secret',
                    age: 21,
                    isDeleted: false
                })
            ])
        );
    });

    test('It should return individual user', async () => {
        const response = await request
            .get('/users/6f7a7188-5b7d-4dbb-8a43-12031b94971e')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                login: 'John Doe',
                password: 'secret',
                age: 21,
                isDeleted: false
            })
        );
    });

    test('It should 404 if user not found', async () => {
        // Mock Model findOne
        jest.spyOn(User, 'findOne').mockImplementation(() => {
            throw new UserNotFoundError();
        });

        const response = await request
            .get('/users/foo')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(
            expect.objectContaining({
                'name': 'UserNotFoundError',
                'success': false,
                'status_code': 404,
                'errors': {
                    'message': 'User Not Found'
                }
            })
        );
    });

    test('It can suggest usernames', async () => {
        const response = await request
            .get('/users/suggest?login=John&limit=2')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                'id': '1ab97ffa-bbef-4619-89d6-7aa218444353',
                'login': 'John Carmack',
                'password': 'secret',
                'age': 55,
                'isDeleted': false
            })
        ]));
    });

    test('It can create user', async () => {
        const response = await request
            .post('/users')
            .send({
                'login': 'Tim Hall',
                'password': 'secret',
                'age': 33
            })
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                'login': 'Tim Hall',
                'password': 'secret',
                'age': 33
            })
        );
    });

    test('It throws validation error on create user', async () => {
        const response = await request
            .post('/users')
            .send({
                'login': 'Jane Doe',
                'password': 'secret',
                'isDeleted': false
            })
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                'name': 'ValidationError',
                'success': false,
                'status_code': 400,
                'errors': [
                    {
                        'path': [
                            'age'
                        ],
                        'message': '"age" is required'
                    }
                ]
            })
        );
    });

    test('It can update user', async () => {
        UserFake.findOne({
            id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
            'login': 'Tom Arnold',
            'password': 'secret',
            'age': 35,
            isDeleted: false
        });

        const response = await request
            .post('/users/6f7a7188-5b7d-4dbb-8a43-12031b94971e')
            .send({
                'login': 'Tom Arnold',
                'password': 'secret',
                'age': 35
            })
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                'id': '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                'login': 'Tom Arnold',
                'password': 'secret',
                'age': 35,
                'isDeleted': false
            })
        );
    });

    test('It can delete user', async () => {
        // Mock Model update
        UserFake.update({
            id: '1ab97ffa-bbef-4619-89d6-7aa218444353',
            login: 'John Carmack',
            password: 'secret',
            age: 55,
            isDeleted: true
        });

        const response = await request
            .delete('/users/1ab97ffa-bbef-4619-89d6-7aa218444353')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(204);
    });
});
