"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class Admin extends Model {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public avatar: string;
  public status: string;
  public otp: number;
  public expiration_time: Date;
  public online: boolean;
  public is_delete: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Admin.init(
    {
      id: {
        field: "id",
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        field: "name",
        type: dataTypes.STRING(50),
      },
      email: {
        field: "email",
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
        type: dataTypes.STRING(100),
      },
      
      password: {
        field: "password",
        type: dataTypes.STRING(200),
      },
      
      avatar: {
        field: "avatar",
        type: dataTypes.STRING(10000),
      },
      
      online: {
        field: "online",
        defaultValue: false,
        type: dataTypes.BOOLEAN,
      },
      role: {
        field: "role",
        defaultValue: "superAdmin",
        type: dataTypes.STRING(200),
      },
      
      is_delete: {
        field: "is_delete",
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        field: "status",
        type: dataTypes.STRING(100),
        defaultValue: "pending",
      },
      otp: {
        field: "otp",
        type: dataTypes.STRING(200),
      },
      expiration_time: {
        field: "expiration_time",
        type: dataTypes.DATE,
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: "admins",
    }
  );
  return Admin;
};
