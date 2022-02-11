export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', {
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        permissions: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        }
    });
};

export const down = async (queryInterface) => {
    await queryInterface.dropTable('Groups');
};
