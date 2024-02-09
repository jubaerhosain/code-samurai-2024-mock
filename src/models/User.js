"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const User = sequelize.define(
        "Users",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                
            }
        },
        {
            timestamps: false,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Ticket, {
            foreignKey: "wallet_id",
        });
    };

    return User;
};
