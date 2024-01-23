const bcrypt = require("bcrypt");

const saltsRound = 12;
const prefixText = "GdI50sNReRWu";

const hashPassword = async (password) => {
    return bcrypt.hash(prefixText + password, saltsRound);
};

const comparePassword = async (password, hashedText) => {
    return bcrypt.compare(prefixText + password, hashedText);
};
module.exports = {
    hashPassword,
    comparePassword,
};
