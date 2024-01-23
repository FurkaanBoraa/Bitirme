const Event = require("../models/event");
const UserEvent = require("../models/userEvent");
const Foundation = require("../models/foundation");
const UserDonation = require("../models/userDonation");
UserEvent.belongsTo(Event, {
    foreignKey: "eventID",
});
UserDonation.belongsTo(Foundation, {
    foreignKey: "foundationID",
});
// exports.getEventsJoined = async (req, res, next) => {
//     try {
//         const userID = req.params.userid;
//         const eventsJoined = await Event.findAll({
//             include: [
//                 {
//                     model: UserEvent,
//                     where: {
//                         userID: userID,
//                     },
//                 },
//             ],
//         });
//         res.status(200).json({
//             status: 200,
//             message: "OK!",
//             data: eventsJoined,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: 400,
//             message: "Fail",
//             data: error,
//         });
//     }
// };
exports.getEventsRegistered = async (req, res, next) => {
    try {
        const userID = req.params.userid;

        const eventsJoined = await UserEvent.findAll({
            where: { userID: userID },
            include: [
                {
                    model: Event,
                    include: [
                        {
                            model: Foundation,
                            attributes: ["name", "logo"],
                        },
                    ],
                },
            ],
        });

        res.status(200).json({
            status: 200,
            message: "OK!",
            data: eventsJoined,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
};

exports.registerToEvent = async (req, res, next) => {
    try {
        const userID = req.body.userID;
        console.log(userID);
        const eventID = req.params.eventid;
        console.log(eventID);
        const checkRegister = await UserEvent.findOne({
            where: {
                userID: userID,
                eventID: eventID,
            },
        });
        if (!checkRegister) {
            const newRegister = UserEvent.build({
                userID: userID,
                eventID: eventID,
                isAttended: false,
            });
            await newRegister.save();
            res.status(201).json({
                status: 201,
                message: "Registered",
                data: newRegister,
            });
        } else {
            res.status(409).json({
                status: 409,
                message: "Conflict",
                data: "User is already registered to event",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
};

exports.joinToEvent = async (req, res, next) => {
    try {
        const today = new Date();
        const userID = req.params.userid;
        const eventID = req.body.eventID;
        const checkRegister = await UserEvent.findOne({
            where:{
                userID: userID,
                eventID: eventID
            }
        })
        const checkEvent = await Event.findByPk(eventID);
        if(checkEvent.dateTime.isBefore(today)){
            if (!checkRegister) {
                res.status(404).json({
                    status: 404,
                    message : "Not Registered",
                    data : "This user didn't registered the even"
                })
            } else {
                res.status(406).json({
                    status: 406,
                    message: "Not acceptable",
                    data : "Event date has past"
                })
            }
        } else {
            await UserEvent.update({isAttended : true}, {
                where:{
                    userID: userID,
                    eventID: eventID
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
};

exports.getDonations = async (req, res, next) => {
    try {
        const userID = req.params.userid;
        const donations = await UserDonation.findAll({
            include: {
                model: Foundation,
                attributes: ["name", "logo"],
            },
            where: {
                userID: userID,
            },
        });
        res.status(200).json({
            status: 200,
            message: "OK!",
            data: donations,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
};

exports.donateToFoundation = async (req, res, next) => {
    try {
        const userID = req.params.userid;
        const foundationID = req.body.foundationID;
        const price = req.body.price;
        const today = new Date();
        const donation = UserDonation.build({
            userID: userID,
            foundationID: foundationID,
            price: price,
            date: today,
        });
        await donation.save();
        res.status(201).json({
            status: 201,
            message: "Created",
            data: donation,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Fail",
            data: error,
        });
    }
};
