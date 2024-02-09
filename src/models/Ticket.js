"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const Ticket = sequelize.define(
        "Tickets",
        {
            ticket_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            wallet_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "user_id",
                },
            },
            capactime_after: {
                type: DataTypes.STRING,
                allowNull: false,                
            },
            station_from: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            station_to: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.User, {
            foreignKey: "wallet_id",
        });
    };

    return Ticket;
};
