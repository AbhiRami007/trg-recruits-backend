import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import userEducation from "../controllers/userEducation";
const educationRouter: Router = Router({
  mergeParams: true,
});

const educationRoutes: any = {
  education: "/education",
  manageEducation: "/education/:id",
};

const educationMethods: RouteMethodWrapper[] = [
  {
    route: educationRoutes.education,
    methods: [
      {
        control: userEducation.createEducation,
        restMethod: "POST",
      },
    ],
  },
  {
    route: educationRoutes.manageEducation,
    methods: [
      {
        control: userEducation.updateEducation,
        restMethod: "PUT",
      },
      {
        control: userEducation.getEducation,
        restMethod: "GET",
      },
      {
        control: userEducation.deleteEducation,
        restMethod: "DELETE",
      },
    ],
  },
];

mapMethodsToRouter(educationMethods, educationRouter);

export default educationRouter;
