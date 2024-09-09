import express from 'express';
import cors from 'cors';
import { routes } from './app/router/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://car-wash-booking-system-client-opal.vercel.app',
        'http://localhost:5173',
        'https://car-wash-booking-system-ten.vercel.app',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }),
);

// routes
routes(app);

// global error handler
app.use(globalErrorHandler);

export default app;
