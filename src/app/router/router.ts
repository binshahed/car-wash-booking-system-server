import { Application, Request, Response } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { serviceRouter } from '../modules/service/service.routes';

const modulesRouters = [
  {
    path: '/api/auth',
    route: userRoutes,
  },
  {
    path: '/api/services',
    route: serviceRouter,
  },
];

export const routes = (app: Application) => {
  // root route
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  // all routes
  modulesRouters.forEach((router) => app.use(router.path, router.route));

  // not found route
  app.route('*').all((req: Request, res: Response) => {
    res.send({
      success: false,
      statusCode: 404,
      message: 'Not Found',
    });
  });
};
