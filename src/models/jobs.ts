'use strict';
import {DataTypes, Model, Sequelize} from 'sequelize';
export class Jobs extends Model {
  public id: number;
  public logo: string;
  public title: string;
  public company: string;
  public location: number;
  public job_type: string;
  public level: string;
  public employee_count: string;
  public company_type: string;
    public alumni_info: boolean;
    public overview: Array<string>;
  public job_description: Array<string>;
  public job_responsibilities: Array<string>;
    public qualifications: Array<string>;
  public preference: Array<string>;
  public working_at: Array<string>;
    public about_company: Array<string>;
     public isDelete: boolean;
    public isActive: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Jobs.init(
    {
      id: {
        field: 'id',
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      logo: {
        allowNull: false,
        field: 'title',
        type: dataTypes.STRING(200),
      },
      title: {
        allowNull: false,
        field: 'title',
        type: dataTypes.STRING(200),
      },
      company: {
        allowNull: false,
        field: 'company',
        type: dataTypes.STRING(200),
      },
      location: {
        field: 'location',
        allowNull: false,
        type: dataTypes.STRING(200),
      },
      job_type: {
        field: 'job_type',
        type: dataTypes.STRING(20),
      },
      level: {
        field: 'level',
        type: dataTypes.STRING(200),
      },
      employee_count: {
        field: 'employee_count',
        type: dataTypes.STRING(200),
      },
      company_type: {
        field: 'company_type',
        type: dataTypes.STRING(200),
      },
      alumni_info: {
        field: 'alumni_info',
        type: dataTypes.STRING(200),
      },
      overview: {
        field: 'overview',
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      job_description: {
        field: 'job_description',
        allowNull: false,
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      job_responsibilites: {
        field: 'job_responsibilites',
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      qualifications: {
        field: 'qualifications',
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      preference: {
        field: 'preference',
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      working_at: {
        field: 'working_at',
        type: dataTypes.ARRAY(DataTypes.STRING),
      },
      about_company: {
        field: 'about_company',
        type: dataTypes.ARRAY(DataTypes.STRING)
          },
      isDelete: {
        field: 'isDelete',
        type: dataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        field: 'isActive',
        type: dataTypes.BOOLEAN,
        defaultValue: true,
      },

    },
    {
      sequelize,
      timestamps: false,
      tableName: 'jobs',
    },
  );
  return Jobs;
};
