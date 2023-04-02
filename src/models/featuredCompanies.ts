"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class Companies extends Model {
  public id: number;
  public logo: string;
  public company: string;
  public company_url: string;
  public location: number;
  public employee_count: string;
  public company_type: string;
  public sector: string;
  public created_on: Date;
  public is_delete: boolean;
  public is_active: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Companies.init(
    {
      id: {
        field: "id",
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      logo: {
        field: "logo",
        type: dataTypes.STRING(200),
      },

      company: {
        allowNull: false,
        field: "company",
        type: dataTypes.STRING(200),
      },
      company_url: {
        field: "company_url",
        type: dataTypes.STRING(200),
      },
      location: {
        field: "location",
        allowNull: false,
        type: dataTypes.STRING(200),
      },

      employee_count: {
        field: "employee_count",
        type: dataTypes.STRING(200),
      },
      company_type: {
        field: "company_type",
        type: dataTypes.STRING(200),
      },
      sector: {
        field: "sector",
        type: dataTypes.STRING(500),
      },

      created_on: {
        field: "created_on",
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
      tableName: "companies",
    }
  );
  return Companies;
};
