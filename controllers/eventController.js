const { Op } = require("sequelize");

const Location = require("../models/location");
const Foundation = require("../models/foundation");
const Event = require("../models/event");
const UserEvent = require("../models/userEvent");

Event.belongsTo(Foundation, {
    foreignKey: "foundationID",
});
Event.belongsTo(Location, {
    foreignKey: "locationID",
});


exports.getFutureEvents = async (req, res, next) => {
    const today = new Date();
    try {
        const futureEvents = await Event.findAll({
            where: {
                dateTime: {
                    [Op.gte]: today,
                },
            },
            order: [["dateTime", "DESC"]],
            include: {
                all: true,
                nested: true,
            },
        });
        res.status(200).json({
            status: 200,
            message: "OK!",
            data: futureEvents,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
};



exports.getEventInfo = async (req,res, next)=>{
    try {
        const event = await Event.findByPk(req.params.id,{
            include:{
                model: Location,
                model: Foundation
            }
        })
        res.status(200).json({
            status: 200,
            message: "OK!",
            data: event,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
}

// exports.createEvent = async (req,res,next)=>{
//     try {
//         const name = req.body.name;
//     } catch (error) {

//     }
// }
