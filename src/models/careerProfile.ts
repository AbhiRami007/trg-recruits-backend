"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class CareerProfile extends Model {
  public id: number;
  public userId: number;
  public current_industry: string;
  public department: string;
  public role_category: string;
  public job_role: string;
  public desired_job_type: string;
  public desired_employment_type: string;
  public preferred_shift: string;
  public preferred_work_location: string;
  public salary_expected: string;
  public is_delete: boolean;
	
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  CareerProfile.init(
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
      current_industry: {
        field: "current_industry",
				allowNull: false,
        type: dataTypes.STRING(200),
      },
      department: {
        field: "department",
        allowNull: false,
        type: dataTypes.STRING(200),
      },
      role_category: {
        field: "role_category",
        type: dataTypes.STRING(200),
      },
      job_role: {
        field: "job_role",
        type: dataTypes.STRING(200),
      },
      desired_job_type: {
        field: "desired_job_type",
        type: dataTypes.STRING(200),
      },
      desired_employment_type: {
        field: "desired_employment_type",
        type: dataTypes.STRING(200),
      },
      preferred_shift: {
        field: "preferred_shift",
        type: dataTypes.STRING(200),
      },
      preferred_work_location: {
        field: "preferred_work_location",
        type: dataTypes.STRING(200),
      },
			salary_expected: {
        field: "salary_expected",
        type: dataTypes.STRING(200),
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
      tableName: "career_profile",
    }
  );
  return CareerProfile;
};
