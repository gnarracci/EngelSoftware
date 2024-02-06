import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import { createRoles } from "./libs/initialSetup";
import { createCompany } from "./libs/initialCompanies";
import { createUser } from "./libs/initialUser";

import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import companyRoutes from "./routes/companies";
import rolesRoutes from "./routes/roles";

const app: Application = express();
createRoles();
createCompany();
createUser();

// Middlewares
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4200" || "http://127.0.0.1:4200" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/roles", rolesRoutes);

// Settings
app.set("port", process.env.PORT || 4000);

export default app;
