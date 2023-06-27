import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './user.model';

class Question extends Model {
  public questionId!: number;
  public title!: string;
  public content!: string;
  public lat!: string;
  public lng!: string;
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
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    lng: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    }
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

