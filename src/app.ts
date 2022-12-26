import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { CONFIG } from './config/env';
import models from './models';
import router from './routes';

const app = express();

app.use(helmet());
app.set('etag', 'strong');

// Express configuration
app.use(cors());

// Internationalization (i18next)

// Middlewares and router
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(CONFIG.PORT || 3000, async () => {
  await models.sequelize.sync();
  console.log(`Server started listening on port ${CONFIG.PORT}`);
});

export default app;
