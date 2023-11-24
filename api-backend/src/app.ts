import express, { Application } from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth';

const app: Application = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth',authRoutes);

// Settings
app.set('port', process.env.PORT || 4000);

export default app;