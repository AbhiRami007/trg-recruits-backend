import {ModelStatic, Sequelize} from 'sequelize/types';
import { Comments } from '../models/comments';
import { Jobs } from '../models/jobs';
import { TrackStatus } from '../models/trackStatus';
import {User} from '../models/user';

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ModelStatic<User>;
  Jobs: ModelStatic<Jobs>;
  Comments: ModelStatic<Comments>;
  TrackStatus: ModelStatic<TrackStatus>;
}
