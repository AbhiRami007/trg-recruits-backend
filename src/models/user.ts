'use strict';
import {DataTypes, Model, Sequelize} from 'sequelize';
export class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public phone: number;
  public password: string;
  public address: string;
  public avatar: string;
  public position: string;
  public online: boolean;
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
      first_name: {
        allowNull: false,
        field: 'firstname',
        type: dataTypes.STRING(50),
      },
      last_name: {
        allowNull: false,
        field: 'lastname',
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
        type: dataTypes.STRING(200),
      },
      avatar: {
        field: 'avatar',
        defaultValue:'../assets/user_avatar_default.png',
        type: dataTypes.STRING(200),
      },
      position: {
        field: 'position',
        type: dataTypes.STRING(200),
      },
      online: {
        field: 'online',
        defaultValue:false,
        type: dataTypes.BOOLEAN,
      },
      role: {
        field: 'role',
        defaultValue:'candidate',
        type: dataTypes.STRING(200),
      },

    },
    {
      sequelize,
      timestamps: false,
      tableName: 'users',
    },
  );
  return User;
};
