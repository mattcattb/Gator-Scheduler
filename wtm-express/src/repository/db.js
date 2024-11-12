const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const connectdb = async () => {
    try {
        const mongoURI = process.env.NODE_ENV === 'local' ? process.env.LOCAL_MONGO_URI : process.env.MONGO_URI;
        console.log("Attempting to connect to MongoDB at:", mongoURI);
        await mongoose.connect(mongoURI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            auth: {
                username: process.env.MONGO_INITDB_ROOT_USERNAME,
                password: process.env.MONGO_INITDB_ROOT_PASSWORD
            },
            authSource: "admin"
        });
        console.log("MongoDB has been connected successfully.");
    } catch (error) {
        console.error("Error: MongoDB did not connect", error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
};

module.exports = connectdb;