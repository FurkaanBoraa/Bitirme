const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/database");
const User = require("./user");
const Foundation = require("./foundation");
class UserDonation extends Model {}

UserDonation.init({
    userID: {
        type: DataTypes.INTEGER,
        allowNull : false,
        references: {
            model: User,
            key: "id",
        },
    },
    foundationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Foundation,
            key: "id",
        },
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date :{
        type: DataTypes.DATE,
        allowNull: false
    }

},
    {
        sequelize,
        modelName: "UserDonation",
        timestamps: false,
    }
);

module.exports = UserDonation;
