"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class Comments extends Model {
  public id: number;
  public email: string;
  public comments: Array<string>;
  public is_delete: boolean;
  public created_on: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Comments.init(
    {
      id: {
        field: "id",
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        allowNull: false,
        field: "email",
        type: dataTypes.STRING(200),
      },
      comments: {
        field: "comments",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      job_id: {
        field: "job_id",
        type: dataTypes.INTEGER,
      },
      candidate_id: {
        field: "candidate_id",
        type: dataTypes.INTEGER,
      },
      is_new: {
        field: "is_new",
        type: dataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_delete: {
        field: "is_delete",
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_on: {
        field: "created_on",
        type: dataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "comments",
    }
  );
  return Comments;
};
