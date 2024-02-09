"use strict";

// A train can visit a station multiple times at different time schedules.


export default (options) => {
    const { sequelize, DataTypes } = options;
    const Stop = sequelize.define(
        "Stops",
        {
            train_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            station_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            time_key: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                comment: 'arrival time + depature time,  A train can visit a station multiple times at different time schedules.'
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
