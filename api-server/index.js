import express from "express";
import "express-async-errors"; // handles async errors
import cookieParser from "cookie-parser";

import { initializeMySqlConnection } from "./src/configs/mysql.js";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler.js";
import { notFoundHandler } from "./src/middlewares/notFoundHandler.js";

import config from "./src/configs/config.js";
import authRoutes from "./src/api/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.cookie.secret));

app.use("/api/v1/auth", authRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.port, () => {
    console.log(`API Server listening on port ${config.port}...`);
    initializeMySqlConnection();
});
