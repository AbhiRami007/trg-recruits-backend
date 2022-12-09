import {Router} from 'express';
import authorization from '../middlewares/authentication';
import {empty} from '../middlewares/empty';
import {catchErrors} from '../middlewares/errorHandler';
import {RouteMethodWrapper} from '../types/router';

export const mapMethodsToRouter = (routeMethodObjects: RouteMethodWrapper[], router: Router) => {
  for (const routeMethodObject of routeMethodObjects) {
    for (const method of routeMethodObject.methods) {
      switch (method.restMethod) {
      case 'GET':
        router.get(
          routeMethodObject.route,
          method.noAuth ? empty : authorization.authenticate,
          method.validator ? method.validator : empty,
          catchErrors(method.control),
        );
        break;
      case 'POST':
        router.post(
          routeMethodObject.route,
          method.noAuth ? empty : authorization.authenticate,
          method.validator ? method.validator : empty,
          method.validator ? method.validator : empty,
          catchErrors(method.control),
        );
        break;
      case 'PUT':
        router.put(
          routeMethodObject.route,
          method.noAuth ? empty : authorization.authenticate,
          method.validator ? method.validator : empty,
          method.validator ? method.validator : empty,
          catchErrors(method.control),
        );
        break;
      case 'DELETE':
        router.delete(
          routeMethodObject.route,
          method.noAuth ? empty : authorization.authenticate,
          method.validator ? method.validator : empty,
          catchErrors(method.control),
        );
        break;
      case 'PATCH':
        router.patch(
          routeMethodObject.route,
          method.noAuth ? empty : authorization.authenticate,
          method.validator ? method.validator : empty,
          catchErrors(method.control),
        );
        break;
      default:
        break;
      }
    }
  }
};
