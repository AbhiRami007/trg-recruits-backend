import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import picturesController from "../controllers/picturesUpload";
const imageRouter: Router = Router({
  mergeParams: true,
});

const uploadRoutes: any = {
  upload: "/profile/:id",
  get: "/profile/:id",
  // list:'/list',
};

const uploadMethods: RouteMethodWrapper[] = [
  {
    route: uploadRoutes.upload,
    methods: [
      {
        control: picturesController.uploadImage,
        restMethod: "POST",
        // noAuth: true,
        param: picturesController.uploadFile.single("image"),
      },
    ],
  },
  {
    route: uploadRoutes.get,
    methods: [
      {
        control: picturesController.getImage,
        restMethod: "GET",
        // noAuth: true,
      },
      {
        control: picturesController.deleteFile,
        restMethod: "PUT",
        // noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(uploadMethods, imageRouter);

export default imageRouter;
