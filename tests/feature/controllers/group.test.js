import Group from '../../../src/db/models/group';
import { GroupNotFoundError } from '../../../src/exceptions/errors';
import * as AuthService from '../../../src/services/auth';
import * as GroupFake from '../../utils/fakes/group.fake';
import request from '../../utils/mocks/request.mock';


// Create our Test AuthToken
const authToken = AuthService.createToken({
    id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
    login: 'John Doe',
    password: 'secret',
    age: 21,
    isDeleted: false
});

describe('Test the groups controller', () => {
    // Setup Fakes
    GroupFake.findAll();
    GroupFake.findOne();
    GroupFake.create();
    GroupFake.update();
    GroupFake.destroy();
    GroupFake.addUsersToGroup();

    test('It should return all groups', async () => {
        const response = await request
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
        const response = await request
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

        const response = await request
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
        const response = await request
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
        const response = await request
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
        const response = await request
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
        GroupFake.findOne({
            'id': '79836ba5-e47f-4322-a498-53e7744189ad',
            'name' : 'Can now write',
            'permissions' : [
                'READ',
                'WRITE'
            ]
        });

        const response = await request
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
        const response = await request
            .delete('/groups/79836ba5-e47f-4322-a498-53e7744189ad')
            .set('x-access-token', `${authToken}`);

        expect(response.statusCode).toBe(204);
    });
});
