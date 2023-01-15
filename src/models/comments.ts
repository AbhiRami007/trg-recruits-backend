'use strict';
import {DataTypes, Model, Sequelize} from 'sequelize';
export class Comments extends Model {
  public id: number;
  public email: string;
  public comments: Array<string>;
  public is_delete: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Comments.init(
    {
      id: {
        field: 'id',
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        allowNull: false,
        field: 'email',
        type: dataTypes.STRING(200),
      },
        comments: {
        field: 'comments',
        type: dataTypes.ARRAY(DataTypes.STRING)
          },
      is_delete: {
        field: 'is_delete',
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'comments',
    },
  );
  return Comments;
};
