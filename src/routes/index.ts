import {Router} from 'express';
import login from './auth';
import upload from './candidateDocuments'
import {apiPrefix} from '../config/env';


const router: Router = Router();

// const adminPrefix: string = `${apiPrefix.prefix}/accounts`;
const userPrefix: string = `${apiPrefix.prefix}/user`;

router.use(userPrefix, login);
router.use(userPrefix, upload);
// router.use(adminPrefix, authAdminProjectRouter);

// router.use(apiPrefix.prefix, project);
// router.use(apiPrefix.prefix, featureFlagRouter);
// router.use(apiPrefix.prefix, rules);
// router.use(apiPrefix.prefix, rulesParams);
// router.use(apiPrefix.prefix, condition);
// router.use(apiPrefix.prefix, operators);
// router.use(apiPrefix.prefix, parameterTypeRouter);

// router.use(clientPrefix, authClientProjectRouter);
// router.use(clientPrefix, RegisterRouter);
// router.use(clientPrefix, featureFlagClientRouter);


export default router;
