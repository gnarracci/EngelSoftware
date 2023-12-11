import express, { Application } from 'express';
import morgan from 'morgan';

import { createRoles } from './libs/initialSetup';

import authRoutes from './routes/auth';

const app: Application = express();
createRoles();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth',authRoutes);

// Settings
app.set('port', process.env.PORT || 4000);

export default app;