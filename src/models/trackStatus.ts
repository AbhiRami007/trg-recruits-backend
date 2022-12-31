'use strict';
import {DataTypes, Model, Sequelize} from 'sequelize';
export class TrackStatus extends Model {
    public id: number;
    public email:string;
    public jobId:number;
    public isDelete: boolean;
    public isActive: boolean;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  TrackStatus.init(
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
      jobId: {
        allowNull: false,
        field: 'jobId',
        type: dataTypes.INTEGER,
      },
      status:{
        allowNull: false,
        field: 'status',
        type: dataTypes.ARRAY(DataTypes.STRING),
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
      tableName: 'trackStatus',
    },
  );
  return TrackStatus;
};
