import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './user.model';

class Question extends Model {
    public questionId!: number;
    public title!: string;
    public content!: string;
    public location!: string;
    public userId!: number;
}

Question.init(
    {
      questionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'questions',
      tableName: 'questions',
      timestamps: true,
    }
  );
  
  Question.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Question.sync();

  export default Question;
  
