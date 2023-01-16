"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class User extends Model {
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: number;
  public company: string;
  public country: string;
  public language: string;
  public time_zone: string;
  public currency: string;
  public password: string;
  public address: string;
  public avatar: string;
  public position: string;
  public otp: number;
  public expiration_time: Date;
  public joined_on: Date;
  public applied_jobs: Array<string>;
  public saved_jobs: Array<string>;
  public online: boolean;
  public is_delete: boolean;
  public is_active: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  User.init(
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
      phone: {
        field: "phone",
        unique: true,
        type: dataTypes.STRING(20),
      },
      company: {
        field: "company",
        type: dataTypes.STRING(200),
      },

      country: {
        field: "country",
        type: dataTypes.STRING(200),
      },
      language: {
        field: "language",
        type: dataTypes.STRING(200),
      },
      time_zone: {
        field: "time_zone",
        type: dataTypes.STRING(200),
      },
      currency: {
        field: "currency",
        type: dataTypes.STRING(200),
      },
      password: {
        field: "password",
        type: dataTypes.STRING(200),
      },
      address: {
        field: "address",
        type: dataTypes.STRING(200),
      },
      avatar: {
        field: "avatar",
        type: dataTypes.STRING(10000),
      },
      position: {
        field: "position",
        type: dataTypes.STRING(200),
      },
      online: {
        field: "online",
        defaultValue: false,
        type: dataTypes.BOOLEAN,
      },
      role: {
        field: "role",
        defaultValue: "candidate",
        type: dataTypes.STRING(200),
      },
      is_user_verified: {
        field: "is_user_verified",
        defaultValue: false,
        type: dataTypes.BOOLEAN,
      },
      is_delete: {
        field: "is_delete",
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        field: "is_active",
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
      otp: {
        field: "otp",
        type: dataTypes.STRING(200),
      },
      expiration_time: {
        field: "expiration_time",
        type: dataTypes.DATE,
      },
      applied_jobs: {
        field: "applied_jobs",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      saved_jobs: {
        field: "saved_jobs",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      joined_on: {
        field: "joined_on",
        type: dataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "users",
    }
  );
  return User;
};
