"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class Education extends Model {
  public id: number;
  public userId: number;
  public course: string;
  public start_date: Date;
  public end_date: Date;
  public type: string;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Education.init(
    {
      id: {
        field: "id",
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        allowNull: false,
        field: "userId",
        type: dataTypes.INTEGER,
      },
      course: {
        field: "course",
        allowNull: false,
        type: dataTypes.STRING(300),
      },

      start_date: {
        field: "start_date",
        type: dataTypes.DATE,
      },
      end_date: {
        field: "end_date",
        type: dataTypes.DATE,
      },
      type: {
        field: "type",
        type: dataTypes.STRING(100),
        defaultValue: "Full Time",
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "user_education",
    }
  );
  return Education;
};
