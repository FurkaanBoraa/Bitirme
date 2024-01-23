const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");
class Location extends Model {}

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize, modelName: "Location", timestamps: false }
);

module.exports = Location;
