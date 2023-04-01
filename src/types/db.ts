import { ModelStatic, Sequelize } from "sequelize/types";
import { Comments } from "../models/comments";
import { Jobs } from "../models/jobs";
import { TrackStatus } from "../models/trackStatus";
import { User } from "../models/user";
import { Education } from "../models/userEducation";
import { CandidateDocuments } from "../models/candidateDocuments";
import { Admin } from "../models/admin";
import { Client } from "../models/client";
import { UserSocket } from "../models/userSocket";
import { UserActions } from "../models/userActions";
import { UserActionsMap } from "../models/userActionsMap";
import { CareerProfile } from "../models/careerProfile";
import { Companies } from "../models/featuredCompanies";

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ModelStatic<User>;
  Education: ModelStatic<Education>;
  CareerProfile: ModelStatic<CareerProfile>;
  Jobs: ModelStatic<Jobs>;
  Comments: ModelStatic<Comments>;
  TrackStatus: ModelStatic<TrackStatus>;
  CandidateDocuments: ModelStatic<CandidateDocuments>;
  Admin: ModelStatic<Admin>;
  Client: ModelStatic<Client>;
  UserSocket: ModelStatic<UserSocket>;
  UserActionsMap: ModelStatic<UserActionsMap>;
  UserActions: ModelStatic<UserActions>;
  Companies: ModelStatic<Companies>;
}
