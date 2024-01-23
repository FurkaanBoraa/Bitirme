const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        surname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        mail: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        timestamps: false,
    }
);

module.exports = User;
