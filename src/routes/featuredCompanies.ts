import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import featuredCompanies from "../controllers/featuredCompanies";

const authenticationRouter: Router = Router({
  mergeParams: true,
});

const authenticationRoutes: any = {
  createClient: "/company",
  getFeaturedCompany: "/company/:id",
};

const authenticationMethods: RouteMethodWrapper[] = [
  {
    route: authenticationRoutes.createClient,
    methods: [
      {
        control: featuredCompanies.createFeaturedCompany,
        restMethod: "POST",
        noAuth: true,
        param: featuredCompanies.uploadFile.array("files", 2),
      },
    ],
  },
  {
    route: authenticationRoutes.getFeaturedCompany,
    methods: [
      {
        control: featuredCompanies.getFeaturedCompany,
        restMethod: "GET",
        noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(authenticationMethods, authenticationRouter);

export default authenticationRouter;
