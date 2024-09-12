import express from 'express';
import cors from 'cors';
import { routes } from './app/router/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import bodyParser from 'body-parser';

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());

// Simplified CORS Configuration: Allow all origins
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://car-wash-booking-system-client-opal.vercel.app',
      'https://car-wash-booking-system-ten.vercel.app',
      '*',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

routes(app);

// Global error handler
app.use(globalErrorHandler);

export default app;
