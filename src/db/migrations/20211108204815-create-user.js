
export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.BOOLEAN
        }
    });
};

export const down = async (queryInterface) => {
    await queryInterface.dropTable('Users');
};
