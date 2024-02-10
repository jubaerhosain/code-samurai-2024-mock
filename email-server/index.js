import express from "express";
import "express-async-errors"; // handles async errors
import dotenv from "dotenv";
dotenv.config();

const app = express();


app.listen(process.env.EMAIL_SERVER_PORT, () => {
    console.log(`Email Server listening on port ${process.env.EMAIL_SERVER_PORT}...`);
});
