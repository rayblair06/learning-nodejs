import Group from '../../../src/db/models/group';
import * as GroupService from '../../../src/services/group';


describe('Test the groups service', () => {
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

        const output = await GroupService.findAll();

        expect(output).toEqual(expect.arrayContaining(
            [
                expect.objectContaining({
                    'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                    'name': 'Read only',
                    'permissions': [
                        'READ'
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

        const output = await GroupService.findById('79836ba5-e47f-4322-a498-53e7744189ad');

        expect(output).toEqual(
            expect.objectContaining({
                'id': '79836ba5-e47f-4322-a498-53e7744189ad',
                'name': 'Read only',
                'permissions': [
                    'READ'
                ]
            })
        );
    });

    test('It should return exception if group not found', async () => {
        // Mock Model findOne
        jest.spyOn(Group, 'findOne').mockImplementation(() => {
            return Promise.resolve({
                'name': 'GroupNotFoundError',
                'success': false,
                'status_code': 404,
                'errors': {
                    'message': 'Group Not Found'
                }
            });
        });

        const output = await GroupService.findById('foo');

        expect(output).toEqual(
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

    test('It can create group', async () => {
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

        const output = await GroupService.create({
            'name': 'New Group',
            'permissions': [
                'READ'
            ]
        });

        expect(output).toEqual(
            expect.objectContaining({
                'name': 'New Group',
                'permissions': [
                    'READ'
                ]
            })
        );
    });

    test('It can update group', async () => {
        // Mock Model update
        jest.spyOn(Group, 'update').mockImplementation(() => {
            return Promise.resolve(
                {
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
                    'name' : 'Can now write',
                    'permissions' : [
                        'READ',
                        'WRITE'
                    ]
                });
        });

        const output = await GroupService.update('79836ba5-e47f-4322-a498-53e7744189ad', {
            'name' : 'Can now write',
            'permissions' : [
                'READ',
                'WRITE'
            ]
        });

        expect(output).toEqual(
            expect.objectContaining({
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

        const output = await GroupService.deleteGroup('79836ba5-e47f-4322-a498-53e7744189ad');

        expect(output).toBe(true);
    });
});
