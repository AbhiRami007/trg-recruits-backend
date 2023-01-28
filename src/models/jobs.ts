"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class Jobs extends Model {
  public id: number;
  public logo: string;
  public description_image: string;
  public title: string;
  public company: string;
  public company_url: string;
  public location: number;
  public job_type: string;
  public level: string;
  public salary_offered: string;
  public employee_count: string;
  public company_type: string;
  public requirements: Array<string>;
  public job_description: Array<string>;
  public job_responsibilities: Array<string>;
  public qualifications: Array<string>;
  public preference: Array<string>;
  public working_at: Array<string>;
  public about_company: Array<string>;
  public created_on: Date;
  public is_delete: boolean;
  public is_active: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Jobs.init(
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
      description_image: {
        field: "description_image",
        type: dataTypes.STRING(200),
      },
      title: {
        allowNull: false,
        field: "title",
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
      job_type: {
        field: "job_type",
        type: dataTypes.STRING(200),
      },
      salary_offered: {
        field: "salary_offered",
        type: dataTypes.STRING(300),
      },
      level: {
        field: "level",
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

      requirements: {
        field: "requirements",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      job_description: {
        field: "job_description",
        allowNull: false,
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      job_responsibilites: {
        field: "job_responsibilites",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      qualifications: {
        field: "qualifications",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      preference: {
        field: "preference",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      working_at: {
        field: "working_at",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      about_company: {
        field: "about_company",
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      applied_candidates: {
        field: "applied_candidates",
        type: dataTypes.ARRAY(DataTypes.STRING),
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
      tableName: "jobs",
    }
  );
  return Jobs;
};
