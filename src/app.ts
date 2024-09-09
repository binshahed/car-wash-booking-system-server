import express from 'express';
import cors from 'cors';
import { routes } from './app/router/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});
app.use(
  cors({
    origin: 'https://car-wash-booking-system-client-opal.vercel.app/',
    credentials: true,
  }),
);

// routes
routes(app);

// global error handler
app.use(globalErrorHandler);

export default app;
