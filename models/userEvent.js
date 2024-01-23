const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");
const User = require("./user");

class UserEvent extends Model {}

UserEvent.init({
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    eventID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: "id",
        },
    },
    isAttended:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "UserEvent",
    timestamps: false,
}
);

module.exports = UserEvent;
