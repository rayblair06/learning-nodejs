import * as GroupService from '../../../src/services/group';
import * as GroupFake from '../../utils/fakes/group.fake';


const groupService = GroupService;


describe('Test the groups service', () => {
    // Setup Fakes
    GroupFake.findAll();
    GroupFake.findOne();
    GroupFake.create();
    GroupFake.update();
    GroupFake.destroy();
    GroupFake.addUsersToGroup();

    test('It should return all groups', async () => {
        expect(
            await groupService.findAll()
        )
            .toEqual(expect.arrayContaining(
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
        expect(
            await groupService.findById('79836ba5-e47f-4322-a498-53e7744189ad')
        ).toEqual(
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
        GroupFake.findOne({
            'name': 'GroupNotFoundError',
            'success': false,
            'status_code': 404,
            'errors': {
                'message': 'Group Not Found'
            }
        });

        expect(
            await groupService.findById('foo')
        ).toEqual(
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
        expect(
            await groupService.create({
                'name': 'New Group',
                'permissions': [
                    'READ'
                ]
            })
        ).toEqual(
            expect.objectContaining({
                'name': 'New Group',
                'permissions': [
                    'READ'
                ]
            })
        );
    });

    test('It can update group', async () => {
        GroupFake.findOne({
            'name' : 'Can now write',
            'permissions' : [
                'READ',
                'WRITE'
            ]
        });

        expect(
            await groupService.update('79836ba5-e47f-4322-a498-53e7744189ad', {
                'name' : 'Can now write',
                'permissions' : [
                    'READ',
                    'WRITE'
                ]
            })
        )
            .toEqual(
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
        expect(await groupService.deleteGroup('79836ba5-e47f-4322-a498-53e7744189ad')).toBe(true);
    });
});
