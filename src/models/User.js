"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const User = sequelize.define(
        "Users",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "user",
                validate: {
                    isIn: [["admin", "user"]],
                },
            },
        },
        {
            timestamps: false,
        }
    );

    User.associate = (models) => {};

    return User;
};
