import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";

import { globalErrorHandler } from "./src/middlewares/globalErrorHandler.js";
import { notFoundHandler } from "./src/middlewares/notFoundHandler.js";
import { initializeMySqlConnection } from "./src/configs/mysql.js";

import config from "./src/configs/config.js";
import mainRoutes from "./src/routes/mainRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.cookie.secret));

app.use("/api", mainRoutes);

app.use(notFoundHandler);

app.use(globalErrorHandler);

initializeMySqlConnection();

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}...`);
});
