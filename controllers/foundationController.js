const Foundation = require("../models/foundation");
const Event = require("../models/event");
const Location = require("../models/location")

Foundation.hasMany(Event,{
    foreignKey:"foundationID"
});
exports.getFoundation = async (req, res, next) => {
    try {
        const foundation = await Foundation.findByPk(req.params.id, {
            include: {
                model : Event,
                order:[["dateTime", "DESC"]],
                include: {
                    model: Location
                }
            },
        });
        res.status(200).json({
            status: 200,
            message: "OK!",
            data: foundation,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
};
