import User from '../../../src/db/models/user';
import { UserNotFoundError } from '../../../src/exceptions/errors';
import * as AuthService from '../../../src/services/auth';


const supertest = require('supertest');

const { app } = require('../../../src/app');

// Create our Test AuthToken
const authToken = AuthService.createToken({
    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
    login: 'John Doe',
    password: 'secret',
    age: 21,
    isDeleted: false
});

describe('Test the users controller', () => {
    test('It should return all users', async () => {
        // Mock Model findAll
        jest.spyOn(User, 'findAll').mockImplementation(() => {
            return Promise.resolve([
                {
                    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                    login: 'John Doe',
                    password: 'secret',
                    age: 21,
                    isDeleted: false
                },
                {
                    id: '7e4e5a21-42c2-46a8-add1-ea799f547d5f',
                    login: 'Jane Doe',
                    password: 'secret',
                    age: 25,
                    isDeleted: false
                },
                {
                    id: '1ab97ffa-bbef-4619-89d6-7aa218444353',
                    login: 'John Carmack',
                    password: 'secret',
                    age: 55,
                    isDeleted: false
                }
            ]);
        });

        const response = await supertest(app)
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
        // Mock Model findOne
        jest.spyOn(User, 'findOne').mockImplementation(() => {
            return Promise.resolve(
                {
                    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                    login: 'John Doe',
                    password: 'secret',
                    age: 21,
                    isDeleted: false
                }
            );
        });

        const response = await supertest(app)
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

        const response = await supertest(app)
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
        const response = await supertest(app)
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
        // Mock Model create
        jest.spyOn(User, 'create').mockImplementation(() => {
            return Promise.resolve(
                {
                    'login': 'Tim Hall',
                    'password': 'secret',
                    'age': 33
                });
        });

        const response = await supertest(app)
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
        const response = await supertest(app)
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
        // Mock Model update
        jest.spyOn(User, 'update').mockImplementation(() => {
            return Promise.resolve(
                {
                    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                    'login': 'Tom Arnold',
                    'password': 'secret',
                    'age': 35,
                    isDeleted: false
                });
        });

        jest.spyOn(User, 'findOne').mockImplementation(() => {
            return Promise.resolve(
                {
                    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                    'login': 'Tom Arnold',
                    'password': 'secret',
                    'age': 35,
                    isDeleted: false
                });
        });

        const response = await supertest(app)
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
        jest.spyOn(User, 'update').mockImplementation(() => {
            return Promise.resolve(
                {
                    id: '1ab97ffa-bbef-4619-89d6-7aa218444353',
                    login: 'John Carmack',
                    password: 'secret',
                    age: 55,
                    isDeleted: true
                });
        });

        const response = await supertest(app)
            .delete('/users/1ab97ffa-bbef-4619-89d6-7aa218444353')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(204);
    });
});
