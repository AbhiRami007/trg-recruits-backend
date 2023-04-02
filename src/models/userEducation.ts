"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class Education extends Model {
  public id: number;
  public userId: number;
  public college: string;
  public course: string;
  public current_course: boolean;
  public score: string;
  public specification: string;
  public start_date: Date;
  public end_date: Date;
  public type: string;
  public is_delete: boolean;
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
      college: {
        field: "college",
        allowNull: false,
        type: dataTypes.STRING(1000),
      },
      course: {
        field: "course",
        allowNull: false,
        type: dataTypes.STRING(1000),
      },
      specification: {
        field: "specification",
        type: dataTypes.STRING(1000),
      },
      score: {
        field: "score",
        type: dataTypes.STRING(10),
      },
      current_course: {
        field: "current_course",
        type: dataTypes.BOOLEAN,
        defaultValue: false,
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
      is_delete: {
        field: "is_delete",
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "userEducation",
    }
  );
  return Education;
};
