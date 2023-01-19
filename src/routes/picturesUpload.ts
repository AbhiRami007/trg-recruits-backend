import { Router } from "express";
import { RouteMethodWrapper } from "../types/router";
import { mapMethodsToRouter } from "../utils/routerHelper";
import picturesController from "../controllers/picturesUpload";
const imageRouter: Router = Router({
  mergeParams: true,
});

const uploadRoutes: any = {
  upload: "/profile/:email",
  get: "/profile/:user/:image",
  // list:'/list',
};

const uploadMethods: RouteMethodWrapper[] = [
  {
    route: uploadRoutes.upload,
    methods: [
      {
        control: picturesController.uploadImage,
        restMethod: "POST",
        noAuth: true,
        param: picturesController.uploadFile.single("file"),
      },
    ],
  },
  {
    route: uploadRoutes.get,
    methods: [
      {
        control: picturesController.getImage,
        restMethod: "GET",
        noAuth: true,
      },
      {
        control: picturesController.deleteFile,
        restMethod: "DELETE",
        noAuth: true,
      },
    ],
  },
];

mapMethodsToRouter(uploadMethods, imageRouter);

export default imageRouter;
