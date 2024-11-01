import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import authController from "../controllers/auth";
const authenticationRouter: Router = Router({
  mergeParams: true,
});

const authenticationRoutes: any = {
  login: "/login",
  register: "/register",
  verify: "/verify-token",
  verifyStatus: "/verify/:id",
  updateUser: "/update/:id",
  getUser: "/id/:id",
  verifyotp: "/verify-otp",
  resend: "/resend-otp",
  update_email:"/update-email",
  forgotPass: "/forgot-password",
  checkPass: "/check-password",
  google: "/google/login",
  allUsers: "/list",
  createUser: "/create",
};

const authenticationMethods: RouteMethodWrapper[] = [
  {
    route: authenticationRoutes.login,
    methods: [
      {
        control: authController.login,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.google,
    methods: [
      {
        control: authController.googleLogin,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },

  {
    route: authenticationRoutes.forgotPass,
    methods: [
      {
        control: authController.forgotPassword,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.register,
    methods: [
      {
        control: authController.register,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.createUser,
    methods: [
      {
        control: authController.createNewUser,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verify,
    methods: [
      {
        control: authController.verify,
        restMethod: "POST",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verifyStatus,
    methods: [
      {
        control: authController.verifyRegistration,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.updateUser,
    methods: [
      {
        control: authController.updaterUserInfo,
        restMethod: "PUT",
      },
    ],
  },
  {
    route: authenticationRoutes.getUser,
    methods: [
      {
        control: authController.getUserData,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.allUsers,
    methods: [
      {
        control: authController.getAllUsers,
        restMethod: "GET",
        // noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.verifyotp,
    methods: [
      {
        control: authController.verifyOtp,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.resend,
    methods: [
      {
        control: authController.resendOtp,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
{
    route: authenticationRoutes.update_email,
    methods: [
      {
        control: authController.resendOtp,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.checkPass,
    methods: [
      {
        control: authController.checkPassword,
        restMethod: "PUT",
        noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(authenticationMethods, authenticationRouter);

export default authenticationRouter;
