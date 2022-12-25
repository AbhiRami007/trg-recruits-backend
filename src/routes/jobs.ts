// import {Router} from 'express';
// import jobs from '../controllers/jobs';
// import {RouteMethodWrapper} from '../types/router';
// import {mapMethodsToRouter} from '../utils/routerHelper';

// const authenticationRouter: Router = Router({
//   mergeParams: true,
// });

// const authenticationRoutes: any = {
//     add: '/jobs',
//     getAll:'/all/jobs',
//     getByTitle: '/jobs',
//     getById: '/jobs/:id',
//     getByLocation: '/location/jobs',
//     remove:'/remove/jobs/:id',
//     update:'/jobs/:id',
  
// };

// const authenticationMethods: RouteMethodWrapper[] = [
//   {
//     route: authenticationRoutes.add,
//     methods: [
//       {
//         control: jobs.createJobs,
//         restMethod: 'POST',
//         noAuth: true,
//       },
//     ],
//   },
//  {
//     route: authenticationRoutes.getAll,
//     methods: [
//       {
//         control: jobs.listJobs,
//         restMethod: 'GET',
//         noAuth: true,
//       },
//     ],
//     },
//   {
//     route: authenticationRoutes.getByTitle,
//     methods: [
//       {
//         control: jobs.getJobsByTitle,
//         restMethod: 'GET',
//         noAuth: true,
//       },
//     ],
//     },
//    {
//     route: authenticationRoutes.getById,
//     methods: [
//       {
//         control: jobs.getJobsById,
//         restMethod: 'GET',
//         noAuth: true,
//       },
//     ],
//     },
//     {
//     route: authenticationRoutes.getByLocation,
//     methods: [
//       {
//         control: jobs.getJobsByLocationOrTitle,
//         restMethod: 'GET',
//         noAuth: true,
//       },
//     ],
//     },
//      {
//     route: authenticationRoutes.remove,
//     methods: [
//       {
//         control: jobs.removeJob,
//         restMethod: 'PUT',
//         noAuth: true,
//       },
//     ],
//     },
//       {
//     route: authenticationRoutes.update,
//     methods: [
//       {
//         control: jobs.updateJob,
//         restMethod: 'PUT',
//         noAuth: true,
//       },
//     ],
//   },
// ];

// mapMethodsToRouter(authenticationMethods, authenticationRouter);

// export default authenticationRouter;
