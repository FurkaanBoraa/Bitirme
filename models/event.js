const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");
const Location = require("./location");
const Foundation = require("./foundation");

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        foundationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Foundation,
                key: "id",
            },
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        locationID: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: Location,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Event",
        timestamps: false,
    }
);

module.exports = Event;
