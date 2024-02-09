"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const Station = sequelize.define(
        "Stations",
        {
            station_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            station_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            longitude: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
                
            },
            latitude: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
            }
        },
        {
            timestamps: false,
        }
    );

    Station.associate = (models) => {};

    return Station;
};
