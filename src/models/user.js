import { DataTypes } from 'sequelize';
import db from '../loaders/db';

const User = db.define('user', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING
    },
    login: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    age: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    isDeleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false,
    tableName: 'Users'
});

export default User;
