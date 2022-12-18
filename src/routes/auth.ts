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
  getUser:'/:email'
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
];

mapMethodsToRouter(authenticationMethods, authenticationRouter);

export default authenticationRouter;
