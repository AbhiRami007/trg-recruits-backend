"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
export class CandidateDocuments extends Model {
  public id: number;
  public userId: string;
  public resume: string;
  public cover_letter: string;
  public other_documents: Array<object>;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  CandidateDocuments.init(
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
        type: dataTypes.STRING(200),
      },
      resume: {
        field: "resume",
        type: dataTypes.STRING(200),
      },
      video_resume: {
        field: "video_resume",
        type: dataTypes.STRING(200),
      },
      cover_letter: {
        field: "cover_letter",
        type: dataTypes.STRING(200),
      },
      other_documents: {
        field: "other_documents",
        type: dataTypes.JSON,
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
      tableName: "candidateDocuments",
    }
  );
  return CandidateDocuments;
};
