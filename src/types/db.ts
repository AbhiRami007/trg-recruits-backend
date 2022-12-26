import {ModelStatic, Sequelize} from 'sequelize/types';
import { Jobs } from '../models/jobs';
import {User} from '../models/user';

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ModelStatic<User>;
  Jobs: ModelStatic<Jobs>;
}
