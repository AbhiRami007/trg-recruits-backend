import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import { UserActions } from "./userActions";
export class UserActionsMap extends Model {
  public id: number;
  public userActionId: number;
  public notifyUserId: number;
  public isRead: boolean;
  public created_on: Date;
  public updated_on: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  UserActionsMap.init(
    {
      id: {
        type: dataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      userActionId: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      notifyUserId: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      isRead: {
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
      isNew: {
        type: dataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_on: {
        type: dataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_on: {
        type: dataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      tableName: "userActionsMap",
      paranoid: true,
      freezeTableName: true,
    }
  );

  UserActionsMap.belongsTo(User, {
    foreignKey: "notifyUserId",
  });

  UserActionsMap.belongsTo(UserActions, {
    foreignKey: "userActionId",
  });
  return UserActionsMap;
};
