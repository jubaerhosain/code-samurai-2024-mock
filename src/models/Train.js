"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const Train = sequelize.define(
        "Trains",
        {
            train_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            train_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                
            },
        },
        {
            timestamps: false,
        }
    );

    Train.associate = (models) => {
        // Train.belongsToMany(models.Station, {
        //     through: models.Stop,
        //     foreignKey: "train_id",
        // });
    };

    return Train;
};
