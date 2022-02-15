import * as UserService from '../../../src/services/user';
import * as UserFake from '../../utils/fakes/user.fake';


const userService = UserService;


describe('Test the users service', () => {
    // Setup Fakes
    UserFake.findAll();
    UserFake.findOne();
    UserFake.create();
    UserFake.update();

    test('It should return all users', async () => {
        expect(
            await userService.findAll()
        ).toEqual(expect.arrayContaining(
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
        expect(
            await userService.findById('6f7a7188-5b7d-4dbb-8a43-12031b94971e')
        ).toEqual(
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
        UserFake.findOne({
            'name': 'UserNotFoundError',
            'success': false,
            'status_code': 404,
            'errors': {
                'message': 'User Not Found'
            }
        });

        expect(
            await userService.findById('foo')
        ).toEqual(
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

    test.each`
        login      | count | expectedResult
        ${'John'}  | ${2}  | ${'John Carmack'}
        ${'Jane'}  | ${1}  | ${'Jane Doe'}
    `('It can suggest $login username', async ({ login, count, expectedResult }) => {
        expect(
            await userService.getAutoSuggestUsers(login, count)
        ).toEqual(expect.arrayContaining([
            expect.objectContaining({
                'login': expectedResult
            })
        ]));
    });

    test('It can create user', async () => {
        expect(
            await userService.create({
                'login': 'Tim Hall',
                'password': 'secret',
                'age': 33
            })
        ).toEqual(
            expect.objectContaining({
                'login': 'Tim Hall',
                'password': 'secret',
                'age': 33
            })
        );
    });

    test('It can update user', async () => {
        UserFake.findOne(
            {
                id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
                'login': 'Tom Arnold',
                'password': 'secret',
                'age': 35,
                isDeleted: false
            });

        expect(
            await userService.update('6f7a7188-5b7d-4dbb-8a43-12031b94971e', {
                'login': 'Tom Arnold',
                'password': 'secret',
                'age': 35
            })
        ).toEqual(
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

        UserFake.findOne({
            id: '1ab97ffa-bbef-4619-89d6-7aa218444353',
            login: 'John Carmack',
            password: 'secret',
            age: 55,
            isDeleted: true
        });

        expect(
            await userService.markAsDeleted('1ab97ffa-bbef-4619-89d6-7aa218444353')
        ).toBe(true);
    });
});
