'use strict';
import {DataTypes, Model, Sequelize} from 'sequelize';

export class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public phone: number;
  public password: string;
  public address: string;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  User.init(
    {
      id: {
        field: 'id',
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        field: 'name',
        type: dataTypes.STRING(50),
      },
      email: {
        field: 'email',
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique:true,
        type: dataTypes.STRING(100),
      },
      phone: {
        field: 'phone',
        allowNull: false,
        unique: true,
        type: dataTypes.BIGINT,
      },
      password: {
        field: 'password',
        allowNull: false,
        type: dataTypes.STRING(200),
      },
      address: {
        field: 'address',
        allowNull: false,
        type: dataTypes.STRING(200),
      },
      userRole: {
        field: 'role',
        type: dataTypes.STRING(200),
        defaultValue:'candidate'
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'users',
    },
  );
  return User;
};
