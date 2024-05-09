const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const mongoDB = async() => {

    const USERNAME = process.env.DB_USERNAME
    const PASSWORD = process.env.DB_PASSWORD

    const mongoURL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.a01uyjm.mongodb.net/Assignment?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    }
    catch (error) {
      console.error('MongoDB connection error:', error);
    }
}

module.exports = mongoDB;
