export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserGroup', {
        userId: {
            type: Sequelize.STRING,

            references: {
                model: 'Users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        groupId: {
            type: Sequelize.STRING,

            references: {
                model: 'Groups',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    });
};

export const down = async (queryInterface) => {
    await queryInterface.dropTable('UserGroup');
};
