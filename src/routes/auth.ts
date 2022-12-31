import {Router} from 'express';
import {RouteMethodWrapper} from '../types/router';
import {mapMethodsToRouter} from '../utils/routerHelper';
import authController from '../controllers/auth';
const authenticationRouter: Router = Router({
  mergeParams: true,
});

const authenticationRoutes: any = {
  login: '/login',
  register: '/register',
  verify: '/verify_token',
  verifyStatus: '/verify/:id',
  updateUser: '/update/:id',
  getUser:'/id/:id',
  verifyotp:'/verify-otp',
  applied:'/applied-jobs/:email',
  saved:'/saved/:email',
  resend:'/resend-otp'
};

const authenticationMethods: RouteMethodWrapper[] = [
  {
    route: authenticationRoutes.login,
    methods: [
      {
        control: authController.login,
        restMethod: 'POST',
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.register,
    methods: [
      {
        control: authController.register,
        restMethod: 'POST',
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verify,
    methods: [
      {
        control: authController.verify,
        restMethod: 'POST',
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verifyStatus,
    methods: [
      {
        control: authController.verifyRegistration,
        restMethod: 'PUT',
        noAuth: true,
      },
    ],
  },
   {
    route: authenticationRoutes.updateUser,
    methods: [
      {
        control: authController.updaterUserInfo,
        restMethod: 'PUT',
        noAuth: true,
      },
    ],
  },
   {
    route: authenticationRoutes.getUser,
    methods: [
      {
        control: authController.getUser,
        restMethod: 'GET',
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verifyotp,
    methods: [
      {
        control: authController.verifyOtp,
        restMethod: 'PUT',
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.resend,
    methods: [
      {
        control: authController.resendOtp,
        restMethod: 'PUT',
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.applied,
    methods: [
      {
        control: authController.appliedJobs,
        restMethod: 'PUT',
        noAuth: true,
      },
      {
        control: authController.getAppliedJobs,
        restMethod: 'GET',
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.saved,
    methods: [
      {
        control: authController.savedJobs,
        restMethod: 'PUT',
        noAuth: true,
      },
      {
        control: authController.getSavedJobs,
        restMethod: 'GET',
        noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(authenticationMethods, authenticationRouter);

export default authenticationRouter;
