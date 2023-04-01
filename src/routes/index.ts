import { Router } from "express";
import login from "./auth";
import education from "./userEducation";
import careerProfile from "./careerProfile";
import upload from "./candidateDocuments";
import adminLogin from "./adminAuth";
import ClientLogin from "./clientAuth";
import jobs from "./jobs";
import profile from "./picturesUpload";
import comments from "./comments";
import status from "./trackStatus";
import notification from "./userSocketNotification"
import { apiPrefix } from "../config/env";

const router: Router = Router();
const userPrefix: string = `${apiPrefix.prefix}/user`;
const prefix: string = `${apiPrefix.prefix}/admin`;
const clientPrefix: string = `${apiPrefix.prefix}/client`;

router.use(userPrefix, login);
router.use(userPrefix, education);
router.use(userPrefix, careerProfile);
router.use(userPrefix, upload);
router.use(userPrefix, jobs);
router.use(userPrefix, profile);
router.use(userPrefix, comments);
router.use(userPrefix, status);
router.use(userPrefix, notification);

router.use(prefix, adminLogin);

router.use(clientPrefix, ClientLogin);

export default router;
