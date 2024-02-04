"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const Book = sequelize.define(
        "Books",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            // Disable createdAt and updatedAt
            timestamps: false, 
        }
    );

    Book.associate = (models) => {};

    return Book;
};
