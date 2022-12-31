import {Router} from 'express';
import {RouteMethodWrapper} from '../types/router';
import {mapMethodsToRouter} from '../utils/routerHelper';
import commentsController from '../controllers/comments';
const commentRouter: Router = Router({
  mergeParams: true,
});

const commentRoutes: any = {
  add:'/comment/:email',
};

const commentMethods: RouteMethodWrapper[] = [
{
  route: commentRoutes.add,
  methods: [
    {
      control: commentsController.createComment,
      restMethod: 'POST',
      noAuth: true,
    },
    {
        control: commentsController.getComments,
        restMethod: 'GET',
        noAuth: true,
      },
  ],
},

];
mapMethodsToRouter(commentMethods, commentRouter);

export default commentRouter;
