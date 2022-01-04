import { DataTypes } from 'sequelize';
import db from '../../loaders/db';

export const Permissions = [
    'READ',
    'WRITE',
    'DELETE',
    'SHARE',
    'UPLOAD_FILES'
];

const Group = db.define('group', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    permissions: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, {
    timestamps: false,
    tableName: 'Groups'
});

Group.associate = models => {
    Group.hasMany(models.User);
};

export default Group;
