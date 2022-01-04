
import { DataTypes } from 'sequelize';
import db from '../../loaders/db';

const UserGroup = db.define('user_group', {
    userId: {
        type: DataTypes.STRING
    },
    groupId: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'UserGroup'
});

UserGroup.removeAttribute('id');

UserGroup.associate = models => {
    UserGroup.belongsTo(models.User);
    UserGroup.belongsTo(models.Group);
};

export default UserGroup;
