const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://root:root@cluster0.mzkopgz.mongodb.net";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToMongo;
