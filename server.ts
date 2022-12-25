import {AddressInfo} from 'net';
import app from './src/app';
import {CONFIG} from './src/config/env';
import models from './src/models';
import logger from './src/utils/logger';

const server = app.listen(CONFIG.PORT || 3000, async () => {
  await models.sequelize.sync();
  const {port} = server.address() as AddressInfo;
  logger.info(`Server started listening on port ${port}`);
});

export default server;
