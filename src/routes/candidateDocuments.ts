import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import candidateController from "../controllers/candidateDocuments";
const uploadRouter: Router = Router({
  mergeParams: true,
});

const uploadRoutes: any = {
  upload: "/document/:type/:id",
  get: "/document",
  list: "/document/list",
  getById: "/document/:id",
  delete: "/document/:type/:id",
};

const uploadMethods: RouteMethodWrapper[] = [
  {
    route: uploadRoutes.upload,
    methods: [
      {
        control: candidateController.uploadDocument,
        restMethod: "POST",
        // noAuth: true,
        param: candidateController.uploadFile.single("file"),
      },
    ],
  },
  {
    route: uploadRoutes.getById,
    methods: [
      {
        control: candidateController.getDocument,
        restMethod: "GET",
        // noAuth: true,
      },
    ],
  },
  {
    route: uploadRoutes.delete,
    methods: [
      {
        control: candidateController.deleteDocument,
        restMethod: "PUT",
        // noAuth: true,
      },
    ],
  },
  {
    route: uploadRoutes.get,
    methods: [
      {
        control: candidateController.getDocsByIds,
        restMethod: "GET",
        // noAuth: true,
      },
      {
        control: candidateController.deleteDocument,
        restMethod: "DELETE",
        // noAuth: true,
      },
    ],
  },
  {
    route: uploadRoutes.list,
    methods: [
      {
        control: candidateController.listDocuments,
        restMethod: "GET",
        // noAuth: true,
      },
    ],
  },
];
mapMethodsToRouter(uploadMethods, uploadRouter);

export default uploadRouter;
