import express from "express";
import "express-async-errors";

import postRoutes from "./src/routes/postRoutes.js";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler.js";
import { notFoundHandler } from "./src/middlewares/notFoundHandler.js";
import { initializeMySqlConnection } from "./src/configs/mysql.js";

import config from "./src/configs/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoutes);

app.use(notFoundHandler);

app.use(globalErrorHandler);

initializeMySqlConnection();

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}...`);
});
