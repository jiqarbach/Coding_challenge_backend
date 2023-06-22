import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class User extends Model {
    public userId!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'user',
        tableName: 'users',
        timestamps: true, // Add timestamps
    }
);

User.sync();

export default User;
