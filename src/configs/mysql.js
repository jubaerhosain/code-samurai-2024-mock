"use strict";

import { Sequelize, Op, DataTypes } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: config.mysql.dialect,
    define: {
        freezeTableName: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        },
    },
    logging: false,
});

import Book from "../models/Book.js";
import User from "../models/User.js";

const options = { sequelize, DataTypes, Sequelize, Op };
const models = {
    Book: Book(options),
    User: User(options),
};

// initialize associations
Object.entries(models).forEach(([name, model]) => {
    if (model.associate) {
        model.associate(models);
    }
});

// Test the connection
export function initializeMySqlConnection() {
    let count = 0;
    const interval = setInterval(() => {
        count += 1;
        sequelize
            .authenticate()
            .then(() => {
                console.log("MySql connection has been established successfully");
                {
                    sequelize.sync();
                    console.log("Sequelize synced with database");
                }
                clearInterval(interval);
            })
            .catch((err) => {
                console.log("\n");
                console.error(err.message + ",", "Trying again...");
            });
        if (count > 30) {
            console.error("Database connection failed");
        }
    }, 3000);
}

function dropAllTable() {
    sequelize.drop({ force: true });
}

// dropAllTable();
// initializeMySqlConnection();

export { Op, Sequelize, sequelize, models };
