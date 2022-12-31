import {Router} from 'express';
import login from './auth';
import upload from './candidateDocuments'
import jobs from './jobs'
import profile from './picturesUpload'
import comments from './comments'
import status from './trackStatus'
import {apiPrefix} from '../config/env';

const router: Router = Router();
const userPrefix: string = `${apiPrefix.prefix}/user`;
// const prefix: string = `${apiPrefix.prefix}/`;

router.use(userPrefix, login);
router.use(userPrefix, upload);
router.use(userPrefix, jobs);
router.use(userPrefix, profile);
router.use(userPrefix, comments);
router.use(userPrefix, status);

export default router;
