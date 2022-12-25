import {AddressInfo} from 'net';
import app from './app';
import {CONFIG} from './config/env';
import models from './models';
import logger from './utils/logger';

const server = app.listen(CONFIG.PORT || 3000, async () => {
  await models.sequelize.sync();
  const {port} = server.address() as AddressInfo;
  logger.info(`Server started listening on port ${port}`);
});

export default server;
