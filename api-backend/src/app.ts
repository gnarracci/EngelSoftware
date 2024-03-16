import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import { createRoles } from "./libs/initialSetup";
import { createCompany } from "./libs/initialCompanies";

import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import companyRoutes from "./routes/companies";
import rolesRoutes from "./routes/roles";
import objectsRoutes from './routes/objects';
import templateRoutes from './routes/template';

const app: Application = express();
createRoles();
createCompany();

// Middlewares
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4200" || "http://127.0.0.1:4200" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/objects", objectsRoutes);
app.use("/api/templates", templateRoutes);

// Settings
app.set("port", process.env.PORT || 4000);

export default app;
