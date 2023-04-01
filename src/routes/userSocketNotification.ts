import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import notificationController from "../controllers/userSocketNotification";
const notificationRouter: Router = Router({
  mergeParams: true,
});

const notificationRoutes: any = {
  get: "/notifications/:id",
  new: "/new-notifications/:id",
};

const notificationMethods: RouteMethodWrapper[] = [
  {
    route: notificationRoutes.get,
    methods: [
      {
        control: notificationController.list,
        restMethod: "GET",
      },
      {
        control: notificationController.update,
        restMethod: "PUT",
      },
    ],
  },
  {
    route: notificationRoutes.new,
    methods: [
      {
        control: notificationController.updateNew,
        restMethod: "PUT",
      },
      {
        control: notificationController.countNew,
        restMethod: "GET",
      },
    ],
  },
];
mapMethodsToRouter(notificationMethods, notificationRouter);

export default notificationRouter;
