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
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
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
app.use("/api", require("./controllers/AdminFoods"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = { app };
