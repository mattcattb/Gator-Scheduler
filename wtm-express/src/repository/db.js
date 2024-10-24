const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI);
        console.log("MongoDB has been connected by the divine grace of God.");
    } 
    catch (error) {
        console.error("Error: MongoDB did not connect", error);
        process.exit(1);
    }   
};

module.exports = connectdb;
