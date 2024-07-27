const express = require('express');
const app = express();
const cors = require("cors");

require('dotenv').config();

const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const port = 5000;

const mongoDB = require("./db");

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());

app.use(cors({
    origin: true, 
    credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.get('/', (req,res) => {
    res.redirect('/user');
});

mongoDB();

app.use("/api", require("./controllers/Foods"));
app.use("/api", require("./controllers/CreateAdmin"));
app.use("/api", require("./controllers/CreateUser"));
app.use("/api", require("./controllers/Orders"));
app.use("/api", require("./controllers/Shops"));
app.use("/api", require("./controllers/CheckOut"));
app.use("/api", require("./controllers/AdminFoods"));
app.use("/api", require("./controllers/SuperAdmin"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = { app };
