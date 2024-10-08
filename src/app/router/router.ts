import { Application, Request, Response } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { serviceRouter } from '../modules/service/service.routes';
import { slotRouter } from '../modules/slot/slot.routes';
import {
  bookingRouter,
  myBookingRouter,
} from '../modules/booking/booking.routes';
import { reviewRouter } from '../modules/review/review.routes';
import { userRouter } from '../modules/user/user.routes';
import { paymentRouter } from '../modules/payment/payment.routes';

const modulesRouters = [
  {
    path: '/api/auth',
    route: authRoutes,
  },
  {
    path: '/api/services',
    route: serviceRouter,
  },
  {
    path: '/api/slots',
    route: slotRouter,
  },
  {
    path: '/api/bookings',
    route: bookingRouter,
  },
  {
    path: '/api/reviews',
    route: reviewRouter,
  },
  {
    path: '/api/my-bookings',
    route: myBookingRouter,
  },
  {
    path: '/api/users',
    route: userRouter,
  },
  {
    path: '/api/payment',
    route: paymentRouter,
  },
];

export const routes = (app: Application) => {
  // root route
  app.get('/', (req: Request, res: Response) => {
    res.send('Car wash booking system');
  });

  // all routes
  modulesRouters.forEach((router) => app.use(router.path, router.route));

  // not found route
  app.route('*').all((req: Request, res: Response) => {
    res.send({
      success: false,
      statusCode: 404,
      message: 'Route Not Found',
    });
  });
};
