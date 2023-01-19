import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import clientAuthController from "../controllers/client";
const clientAuthenticationRouter: Router = Router({
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
        control: clientAuthController.login,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.google,
    methods: [
      {
        control: clientAuthController.googleLogin,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },

  {
    route: authenticationRoutes.forgotPass,
    methods: [
      {
        control: clientAuthController.forgotPassword,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.register,
    methods: [
      {
        control: clientAuthController.register,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verify,
    methods: [
      {
        control: clientAuthController.verify,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.updateUser,
    methods: [
      {
        control: clientAuthController.updaterUserInfo,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.getUser,
    methods: [
      {
        control: clientAuthController.getUser,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.getUserIds,
    methods: [
      {
        control: clientAuthController.getUserByIds,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.allUsers,
    methods: [
      {
        control: clientAuthController.getAllUsers,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verifyotp,
    methods: [
      {
        control: clientAuthController.verifyOtp,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.resend,
    methods: [
      {
        control: clientAuthController.resendOtp,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.checkPass,
    methods: [
      {
        control: clientAuthController.checkPassword,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(authenticationMethods, clientAuthenticationRouter);

export default clientAuthenticationRouter;
