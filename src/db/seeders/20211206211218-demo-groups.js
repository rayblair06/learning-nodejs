

export const up = (queryInterface) => {
    return queryInterface.bulkInsert('Groups', [
        {
            id: '79836ba5-e47f-4322-a498-53e7744189ad',
            name: 'Read only',
            permissions: [
                'READ'
            ]
        },
        {
            id: 'f5637788-3889-4a6e-9f5f-f38a1a144124',
            name: 'Read/Write',
            permissions: [
                'READ',
                'WRITE'
            ]
        }
    ]);
};

export const down = (queryInterface) => {
    return queryInterface.bulkDelete('Groups', null, {});
};
