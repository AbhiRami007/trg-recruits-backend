import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import adminAuthController from "../controllers/adminAuth";
const adminAuthenticationRouter: Router = Router({
  mergeParams: true,
});

const authenticationRoutes: any = {
  login: "/login",
  register: "/register",
  verify: "/verify_token",
  updateUser: "/update/:id",
  getUser: "/id/:id",
  getUserIds: "/candidates",
  verifyotp: "/verify-otp",
  resend: "/resend-otp",
  forgotPass: "/forgot-password",
  checkPass: "/check-password",
  google: "/google/login",
  allUsers: "/list",
};

const authenticationMethods: RouteMethodWrapper[] = [
  {
    route: authenticationRoutes.login,
    methods: [
      {
        control: adminAuthController.login,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.google,
    methods: [
      {
        control: adminAuthController.googleLogin,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },

  {
    route: authenticationRoutes.forgotPass,
    methods: [
      {
        control: adminAuthController.forgotPassword,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.register,
    methods: [
      {
        control: adminAuthController.register,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verify,
    methods: [
      {
        control: adminAuthController.verify,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.updateUser,
    methods: [
      {
        control: adminAuthController.updaterUserInfo,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.getUser,
    methods: [
      {
        control: adminAuthController.getUser,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.getUserIds,
    methods: [
      {
        control: adminAuthController.getUserByIds,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.allUsers,
    methods: [
      {
        control: adminAuthController.getAllUsers,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verifyotp,
    methods: [
      {
        control: adminAuthController.verifyOtp,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.resend,
    methods: [
      {
        control: adminAuthController.resendOtp,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.checkPass,
    methods: [
      {
        control: adminAuthController.checkPassword,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(authenticationMethods, adminAuthenticationRouter);

export default adminAuthenticationRouter;
