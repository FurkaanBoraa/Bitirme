const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");
class Foundation extends Model {}

Foundation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        mail: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        logo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize, modelName: "Foundation", timestamps: false }
);

module.exports = Foundation;
