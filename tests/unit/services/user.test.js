import User from '../../../src/db/models/user';
import * as UserService from '../../../src/services/user';


describe('Test the users service', () => {
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

        const output = await UserService.findAll();

        expect(output).toEqual(expect.arrayContaining(
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

        const output = await UserService.findById('6f7a7188-5b7d-4dbb-8a43-12031b94971e');

        expect(output).toEqual(
            expect.objectContaining({
                id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                login: 'John Doe',
                password: 'secret',
                age: 21,
                isDeleted: false
            })
        );
    });

    test('It should return exception if user not found', async () => {
        // Mock Model findOne
        jest.spyOn(User, 'findOne').mockImplementation(() => {
            return Promise.resolve({
                'name': 'UserNotFoundError',
                'success': false,
                'status_code': 404,
                'errors': {
                    'message': 'User Not Found'
                }
            });
        });

        const output = await UserService.findById('foo');

        expect(output).toEqual(
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

        const output = await UserService.getAutoSuggestUsers('John', 2);

        expect(output).toEqual(expect.arrayContaining([
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

        const output = await UserService.create({
            'login': 'Tim Hall',
            'password': 'secret',
            'age': 33
        });

        expect(output).toEqual(
            expect.objectContaining({
                'login': 'Tim Hall',
                'password': 'secret',
                'age': 33
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

        const output = await UserService.update('6f7a7188-5b7d-4dbb-8a43-12031b94971e', {
            'login': 'Tom Arnold',
            'password': 'secret',
            'age': 35
        });

        expect(output).toEqual(
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

        jest.spyOn(User, 'findOne').mockImplementation(() => {
            return Promise.resolve(
                {
                    id: '1ab97ffa-bbef-4619-89d6-7aa218444353',
                    login: 'John Carmack',
                    password: 'secret',
                    age: 55,
                    isDeleted: true
                });
        });

        const output = await UserService.markAsDeleted('1ab97ffa-bbef-4619-89d6-7aa218444353');

        expect(output).toBe(true);
    });
});
