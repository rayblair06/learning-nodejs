import Group from '../../../src/db/models/group';
import { GroupNotFoundError } from '../../../src/exceptions/errors';
import * as AuthService from '../../../src/services/auth';
import * as GroupService from '../../../src/services/group';


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

describe('Test the groups controller', () => {
    test('It should return all groups', async () => {
        // Mock Model findAll
        jest.spyOn(Group, 'findAll').mockImplementation(() => {
            return Promise.resolve([
                {
                    'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                    'name': 'Read only',
                    'permissions': [
                        'READ'
                    ]
                },
                {
                    'id': 'f5637788-3889-4a6e-9f5f-f38a1a144124',
                    'name': 'Read/Write',
                    'permissions': [
                        'READ',
                        'WRITE'
                    ]
                }
            ]);
        });

        const response = await supertest(app)
            .get('/groups')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining(
            [
                expect.objectContaining({
                    'id': 'f5637788-3889-4a6e-9f5f-f38a1a144124',
                    'name': 'Read/Write',
                    'permissions': [
                        'READ',
                        'WRITE'
                    ]
                })
            ])
        );
    });

    test('It should return individual group', async () => {
        // Mock Model findOne
        jest.spyOn(Group, 'findOne').mockImplementation(() => {
            return Promise.resolve(
                {
                    'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                    'name': 'Read only',
                    'permissions': [
                        'READ'
                    ]
                }
            );
        });

        const response = await supertest(app)
            .get('/groups/79836ba5-e47f-4322-a498-53e7744189ad')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                'name': 'Read only',
                'permissions': [
                    'READ'
                ]
            })
        );
    });

    test('It should 404 if group not found', async () => {
        // Mock Model findOne
        jest.spyOn(Group, 'findOne').mockImplementation(() => {
            throw new GroupNotFoundError();
        });

        const response = await supertest(app)
            .get('/groups/foo')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(
            expect.objectContaining({
                'name': 'GroupNotFoundError',
                'success': false,
                'status_code': 404,
                'errors': {
                    'message': 'Group Not Found'
                }
            })
        );
    });

    test('It can create new group', async () => {
        // Mock Model create
        jest.spyOn(Group, 'create').mockImplementation(() => {
            return Promise.resolve(
                {
                    'id': '14a8def7-8994-40b6-951c-5d8f40e2e476',
                    'name': 'New Group',
                    'permissions': [
                        'READ'
                    ]
                });
        });

        const response = await supertest(app)
            .post('/groups')
            .send({
                'name': 'New Group',
                'permissions': [
                    'READ'
                ]
            })
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                'name': 'New Group',
                'permissions': [
                    'READ'
                ]
            })
        );
    });

    test('It can add users to group', async () => {
        // Mock Service addUsersToGroup
        jest.spyOn(GroupService, 'addUsersToGroup').mockImplementation(() => {
            return true;
        });

        const response = await supertest(app)
            .post('/groups/79836ba5-e47f-4322-a498-53e7744189ad/addUsers')
            .send({
                'userIds': [
                    '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                    '7e4e5a21-42c2-46a8-add1-ea799f547d5f'
                ]
            })
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(204);
    });

    test('It throws validation error on creating group', async () => {
        const response = await supertest(app)
            .post('/groups')
            .send({
                'permissions': [
                    'READ'
                ]
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
                            'name'
                        ],
                        'message': '"name" is required'
                    }
                ]
            })
        );
    });

    test('It can update group', async () => {
        // Mock Model update
        jest.spyOn(Group, 'update').mockImplementation(() => {
            return Promise.resolve(
                {
                    'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                    'name' : 'Can now write',
                    'permissions' : [
                        'READ',
                        'WRITE'
                    ]
                });
        });

        jest.spyOn(Group, 'findOne').mockImplementation(() => {
            return Promise.resolve(
                {
                    'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                    'name' : 'Can now write',
                    'permissions' : [
                        'READ',
                        'WRITE'
                    ]
                });
        });

        const response = await supertest(app)
            .post('/groups/79836ba5-e47f-4322-a498-53e7744189ad')
            .send({
                'name' : 'Can now write',
                'permissions' : [
                    'READ',
                    'WRITE'
                ]
            })
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                'name': 'Can now write',
                'permissions': [
                    'READ',
                    'WRITE'
                ]
            })
        );
    });

    test('It can delete group', async () => {
        // Mock Model update
        jest.spyOn(Group, 'destroy').mockImplementation(() => {
            return Promise.resolve(
                {
                    'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                    'name': 'Read only',
                    'permissions': [
                        'READ'
                    ]
                });
        });

        const response = await supertest(app)
            .delete('/groups/79836ba5-e47f-4322-a498-53e7744189ad')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(204);
    });
});
