import {Router} from 'express';
import {RouteMethodWrapper} from '../types/router';
import {mapMethodsToRouter} from '../utils/routerHelper';
import candidateController from '../controllers/candidateDocuments';
const uploadRouter: Router = Router({
  mergeParams: true,
});

const uploadRoutes: any = {
    upload: '/upload',
    // list:'/list',
};

const uploadMethods: RouteMethodWrapper[] = [
  {
    route: uploadRoutes.upload,
    methods: [
      {
        control: candidateController.uploadDocuments,
        restMethod: 'POST',
        noAuth: true,
        param: candidateController.uploadFile.array("files"),
      },
    ],
  },
//   {
//     route: uploadRoutes.list,
//     methods: [
//       {
//         control: candidateController.listDocuments,
//         restMethod: 'get',
//       },
//     ],
//   },
];

mapMethodsToRouter(uploadMethods, uploadRouter);

export default uploadRouter;
