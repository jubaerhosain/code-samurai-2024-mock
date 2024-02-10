"use strict";

// A train can visit a station multiple times at different time schedules.

export default (options) => {
    const { sequelize, DataTypes } = options;
    const Stoppage = sequelize.define(
        "Stoppages",
        {
            stoppage_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            train_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Trains",
                    key: "train_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            station_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Stations",
                    key: "station_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            arrival_time: {
                type: DataTypes.STRING,
            },
            departure_time: {
                type: DataTypes.STRING,
            },
            fare: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
        }
    );

    Stoppage.associate = (models) => {
        Stoppage.belongsTo(models.Train, {
            foreignKey: "train_id",
        });
        Stoppage.belongsTo(models.Station, {
            foreignKey: "station_id",
        });
    };

    return Stoppage;
};
