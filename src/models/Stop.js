"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const Stop = sequelize.define(
        "Stops",
        {
            train_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "Trains",
                    key: "train_id",
                },
            },
            station_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                // references: {
                //     model: "Stations",
                //     key: "station_id",
                // },
            },
            arrival_time: {
                type: DataTypes.STRING,
                
            },
            departure_time: {
                type: DataTypes.STRING,
            },
            fare: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
        }
    );

    Stop.associate = (models) => {};

    return Stop;
};
