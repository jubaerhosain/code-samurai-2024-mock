"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;

    const Post = sequelize.define("Posts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(40),
        },
        content: {
            type: DataTypes.STRING,
        },
        published: {
            type: DataTypes.STRING,
        },
    });

    Post.associate = (models) => {};

    return Post;
};
