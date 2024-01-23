const hashPassword = require("../middlewares/hashPassword");
const User = require("../models/user");

exports.createUser = async (req, res, next) => {
    try {
        const name = req.body.name.trim();
        const surname = req.body.surname.trim();
        const password = req.body.password;
        const mail = req.body.mail.trim();
        const phone = req.body.phone;
        const birthdate = req.body.birthdate;
        const phoneCheck = await User.findOne({
            where: {
                phone: phone,
            },
        });
        const mailCheck = await User.findOne({
            where: {
                mail: mail,
            },
        });
        if (!phoneCheck) {
            if (!mailCheck) {
                const hashedPass = await hashPassword.hashPassword(password);
                const newUser = User.build({
                    password: hashedPass,
                    name: name,
                    surname: surname,
                    mail: mail,
                    phone: phone,
                    birthdate: birthdate,
                    role_id: 1,
                });
                await newUser.save();
                res.status(201).json({
                    status: 201,
                    message: "Created",
                    data: newUser,
                });
            } else {
                res.status(409).json({
                    status: 409,
                    message: "Conflict",
                    data: "This mail is already in use",
                });
            }
        } else {
            res.status(409).json({
                status: 409,
                message: "Conflict",
                data: "This phone is already in use",
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

exports.loginUser = async (req, res, next) => {
    try {
        const mail = req.body.mail;
        const password = req.body.password;
        const checkedUser = await User.findOne({
            where: {
                mail: mail,
            },
        });
        if (checkedUser) {
            const comparePass = await hashPassword.comparePassword(
                password,
                checkedUser.password
            );
            if (comparePass) {
                res.status(200).json({
                    status: 200,
                    message: "OK!",
                    data: {
                        id: checkedUser.id,
                        mail: checkedUser.mail,
                        name: checkedUser.name,
                        surname: checkedUser.surname,
                        phone: checkedUser.phone,
                        birthdate: checkedUser.birthdate,
                    },
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "Not Found",
                    data: "Giriş Bilgileri Hatali!",
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                message: "Not Found",
                data: "Böyle Bir Hesap Yok",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "400",
            message: "fail",
            data: "Bilinmeyen Hata",
        });
    }
};
