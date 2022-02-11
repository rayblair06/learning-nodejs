

export const up = (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
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
};

export const down = (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
};
