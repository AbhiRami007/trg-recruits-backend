import {ModelStatic, Sequelize} from 'sequelize/types';
import {User} from '../models/user';

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ModelStatic<User>;
}
