import cookieParser from "cookie-parser";
import express from "express";
import "express-async-errors";

import { initializeMySqlConnection } from "./src/configs/mysql.js";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler.js";
import { notFoundHandler } from "./src/middlewares/notFoundHandler.js";

import config from "./src/configs/config.js";
import authRoutes from "./src/routes/authRoutes.js";
import stationRoutes from "./src/routes/stationRoutes.js";
import ticketRoutes from "./src/routes/ticketRoutes.js";
import trainRoutes from "./src/routes/trainRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import walletRoutes from "./src/routes/walletRoutes.js";
import planRoutes from './src/routes/planningRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.cookie.secret));

// add versioning
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/routes", planRoutes)

app.use(notFoundHandler);

app.use(globalErrorHandler);

initializeMySqlConnection();

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}...`);
});
