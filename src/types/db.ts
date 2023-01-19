import { ModelStatic, Sequelize } from "sequelize/types";
import { Comments } from "../models/comments";
import { Jobs } from "../models/jobs";
import { TrackStatus } from "../models/trackStatus";
import { User } from "../models/user";
import { CandidateDocuments } from "../models/candidateDocuments";
import { Admin } from "../models/admin";
import { Client } from "../models/client";

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ModelStatic<User>;
  Jobs: ModelStatic<Jobs>;
  Comments: ModelStatic<Comments>;
  TrackStatus: ModelStatic<TrackStatus>;
  CandidateDocuments: ModelStatic<CandidateDocuments>;
  Admin: ModelStatic<Admin>;
  Client: ModelStatic<Client>;
}
