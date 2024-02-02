import express from "express";
import "express-async-errors";

import { initializeMySqlConnection } from "./src/configs/mysql.js";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler.js";
import { notFoundHandler } from "./src/middlewares/notFoundHandler.js";
import postRoutes from "./src/routes/postRoutes.js";

import config from "./src/configs/config.js";
import bookRoutes from "./src/routes/bookRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoutes);
app.use("/api", bookRoutes);

app.use(notFoundHandler);

app.use(globalErrorHandler);

initializeMySqlConnection();

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}...`);
});
