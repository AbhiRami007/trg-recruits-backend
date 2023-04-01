"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class UserSocket extends Model {
  public id: number;
  public socketId: string;
  public userId: string;
  public created_on: Date;
  public updated_on: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  UserSocket.init(
    {
      id: {
        field: "id",
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      socketId: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
      userId: {
        type: dataTypes.INTEGER,
        allowNull: false,
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
      timestamps: false,
      tableName: "userSocket",
    }
  );
  return UserSocket;
};
