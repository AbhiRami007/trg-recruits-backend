import {Router} from 'express';
import {RouteMethodWrapper} from '../types/router';
import {mapMethodsToRouter} from '../utils/routerHelper';
import tracksController from '../controllers/trackStatus';
const trackRouter: Router = Router({
  mergeParams: true,
});

const trackRoutes: any = {
  add:'/track',
  get:'/track/:id',
};

const trackMethods: RouteMethodWrapper[] = [
{
  route: trackRoutes.add,
  methods: [
    {
      control: tracksController.addStatus,
      restMethod: 'POST',
      noAuth: true,
    }
  ],
},
{
  route: trackRoutes.get,
  methods: [
    {
        control: tracksController.getStatus,
        restMethod: 'GET',
        noAuth: true,
      },
  ],
},

];
mapMethodsToRouter(trackMethods, trackRouter);

export default trackRouter;
