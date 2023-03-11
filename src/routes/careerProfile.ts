import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import careerProfile from "../controllers/careerProfile";
const careerRouter: Router = Router({
  mergeParams: true,
});

const careerRoutes: any = {
  profile: "/career-profile",
  manageProfile: "/career-profile/:id",
};

const educationMethods: RouteMethodWrapper[] = [
  {
    route: careerRoutes.education,
    methods: [
      {
        control: careerProfile.createCareerProfile,
        restMethod: "POST",
      },
    ],
  },
  {
    route: careerRoutes.manageEducation,
    methods: [
      {
        control: careerProfile.updateCareerProfile,
        restMethod: "PUT",
      },
      {
        control: careerProfile.getCareerProfile,
        restMethod: "GET",
      },
      {
        control: careerProfile.deleteCareerProfile,
        restMethod: "DELETE",
      },
    ],
  },
];

mapMethodsToRouter(educationMethods, careerRouter);

export default careerRouter;
