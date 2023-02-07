"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class TrackStatus extends Model {
  public id: number;
  public email: string;
  public jobId: number;
  public added_on: Date;
  public is_delete: boolean;
  public is_active: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  TrackStatus.init(
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
      jobId: {
        allowNull: false,
        field: "jobId",
        type: dataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        field: "status",
        type: dataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],

      },
      added_on: {
        field: "added_on",
        type: dataTypes.DATE,
      },
      is_delete: {
        field: "is_delete",
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        field: "is_active",
        type: dataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "trackStatus",
    }
  );
  return TrackStatus;
};
