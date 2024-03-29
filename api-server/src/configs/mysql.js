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

import User from "../models/User.js";

const options = { sequelize, DataTypes, Sequelize, Op };
const models = {
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
                clearInterval(interval);
                console.log(`MySql connection has been established successfully.`);
                sequelize.sync();
            })
            .catch((err) => {
                console.log("\n");
                console.error(err.message + ",", "Trying again...");
            });
        if (count > 5) {
            console.error("Database connection failed");
        }
    }, 3000);
}

async function dropAllTable() {
    console.log("Dropping all table...");
    sequelize.drop({ force: true }).then(() => {
        console.log("Dropped all table successfully");
    });
}

// dropAllTable();
// initializeMySqlConnection();

export { Op, Sequelize, sequelize, models };
