import path from 'path';
import {Sequelize} from 'sequelize';
import {CONFIG} from '../config/env';
import sequelizeConfig from '../config/sequelize';
import {DB} from '../types/db';
import {getFiles} from '../utils/importHelper';
const basename = path.basename(module.filename);
const env = CONFIG.ENV || 'production';
const config = sequelizeConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.host,
  config.dialect,

);
const db = {
  sequelize,
  Sequelize,
};
const modelFiles: string[] = [];
(() => {
  for (const f of getFiles(__dirname)) {
    if (f.includes(basename)) {
      continue;
    }
    modelFiles.push(f);
  }
})();

for (const file of modelFiles) {
  const model = require(path.join(__dirname, file)).default(
    sequelize,
    Sequelize,
  );
  db[model.name] = model;
}

modelFiles.length = 0;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db as DB;
