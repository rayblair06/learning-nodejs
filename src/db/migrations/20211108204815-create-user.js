
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('Users');
    }
};
