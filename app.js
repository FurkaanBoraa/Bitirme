const express = require("express");
const { Sequelize, Model } = require("sequelize");
var sequelize = require("./configs/database");
const authRoute = require("./routes/authRoute");
const eventRoute = require("./routes/eventRoute");
const userRoute = require("./routes/userRoute");
const foundationRoute = require("./routes/foundationRoute");
const userDonation = require("./models/userDonation");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
app.use("/auth", authRoute);
app.use("/event", eventRoute);
app.use("/foundation", foundationRoute);
app.use("/user", userRoute);

const port = 5000;

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`app started on ${port}`);
        userDonation.sync();
    });
});
