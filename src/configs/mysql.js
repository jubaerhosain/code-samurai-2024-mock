"use strict";

import { Sequelize, Op, DataTypes } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: config.mysql.dialect,
    define: {
        freezeTableName: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
    },
    logging: false,
});

import Post from "../models/Post.js";
const options = { sequelize, DataTypes, Sequelize, Op };
const models = {
    Post: Post(options),
};

// initialize associations
Object.entries(models).forEach(([name, model]) => {
    if (model.associate) {
        model.associate(models);
    }
});

console.log("Number of table: ", Object.keys(models).length);

// Test the connection
export function initializeMySqlConnection() {
    let count = 0;
    const interval = setInterval(() => {
        count += 1;
        sequelize
            .authenticate()
            .then(() => {
                console.log("MySql connection has been established successfully...");
                sequelize.sync();
                clearInterval(interval);
            })
            .catch((err) => {
                console.log("Database is not ready till now. Wait a while. Connecting to the database...");
                console.error(err.message);
            });
        if (count > 10) {
            console.error("Database connection failed");
        }
    }, 5000);
}

// function dropAllTable() {
//     sequelize.drop({ force: true });
// }

// dropAllTable();
// initializeMySqlConnection();

export { Op, Sequelize, sequelize, models };
