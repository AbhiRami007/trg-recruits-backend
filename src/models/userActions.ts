import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user";
export class UserActions extends Model {
  public id: number;
  public timestamp: Date;
  public actionId: number;
  public action: string;
  public comments: string;
  public isAlert: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  UserActions.init(
    {
      id: {
        type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      timestamp: {
        type: dataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      actionId: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      comments: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      isAlert: {
        type: dataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: "userActions",
      paranoid: true,
      freezeTableName: true,
    }
  );
  UserActions.belongsTo(User, {
    foreignKey: "userId",
  });
  return UserActions;
};
