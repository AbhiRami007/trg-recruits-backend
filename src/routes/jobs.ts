import { Router } from "express";
import jobs from "../controllers/jobs";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";

const authenticationRouter: Router = Router({
  mergeParams: true,
});

const authenticationRoutes: any = {
  jobs: "/jobs",
  jobsId: "/jobs/:id",
  remove: "/remove/jobs/:id",
  applied: "/applied/:id",
  filterJobs:"/jobs/search",
  saved: "/saved/:id",
};

const authenticationMethods: RouteMethodWrapper[] = [
  {
    route: authenticationRoutes.jobs,
    methods: [
      {
        control: jobs.createJobs,
        restMethod: "POST",
        //  noAuth: true,
        param: jobs.uploadFile.array("files", 2),
      },
      {
        control: jobs.listJobs,
        restMethod: "GET",
        //  noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.filterJobs,
    methods: [
      {
        control: jobs.getJobsByLocationOrTitle,
        restMethod: "GET",
        //  noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.jobsId,
    methods: [
      {
        control: jobs.getJobsById,
        restMethod: "GET",
        //  noAuth: true,
      },
      {
        control: jobs.updateJob,
        restMethod: "PUT",
        //  noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.remove,
    methods: [
      {
        control: jobs.removeJob,
        restMethod: "PUT",
        //  noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.applied,
    methods: [
      {
        control: jobs.updateAppliedJobs,
        restMethod: "PUT",
        //  noAuth: true,
      },
      {
        control: jobs.getAppliedJobs,
        restMethod: "GET",
        //  noAuth: true,
      },
    ],
  },
  {
    route: authenticationRoutes.saved,
    methods: [
      {
        control: jobs.updateSavedJobs,
        restMethod: "PUT",
        //  noAuth: true,
      },
      {
        control: jobs.getSavedJobs,
        restMethod: "GET",
        //  noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(authenticationMethods, authenticationRouter);

export default authenticationRouter;
