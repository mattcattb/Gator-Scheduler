const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectdb = async () => {
    try {
        let mongoURI;
        console.log(process.env.NODE_ENV);

        if (process.env.NODE_ENV === 'test') {
            mongoServer = await MongoMemoryServer.create();
            mongoURI = mongoServer.getUri();
            console.log(`Using in-memory MongoDB for testing at: ${mongoURI}`);
        } else {
            mongoURI = process.env.NODE_ENV === 'local'
                ? process.env.LOCAL_MONGO_URI
                : process.env.MONGO_URI;

            console.log(`Attempting to connect to MongoDB at: ${mongoURI}`);
        }

        await mongoose.connect(mongoURI, {
            authSource: process.env.NODE_ENV !== 'test' ? 'admin' : undefined,
            auth: process.env.NODE_ENV !== 'test' ? {
                username: process.env.MONGO_INITDB_ROOT_USERNAME,
                password: process.env.MONGO_INITDB_ROOT_PASSWORD
            } : undefined
        });

        console.log('MongoDB has been connected successfully.');
    } catch (error) {
        console.error('Error: MongoDB did not connect', error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
};

const disconnectdb = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (mongoServer) {
        await mongoServer.stop();
    }

    console.log('MongoDB connection closed.');
};

module.exports = { connectdb, disconnectdb };
