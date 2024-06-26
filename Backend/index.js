const express = require('express');
const app = express();
const cors = require("cors");

const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const port = 5000;

const mongoDB = require("./db");

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your front-end URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = { app };
