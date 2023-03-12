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

const careerMethods: RouteMethodWrapper[] = [
  {
    route: careerRoutes.profile,
    methods: [
      {
        control: careerProfile.createCareerProfile,
        restMethod: "POST",
      },
    ],
  },
  {
    route: careerRoutes.manageProfile,
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

mapMethodsToRouter(careerMethods, careerRouter);

export default careerRouter;
