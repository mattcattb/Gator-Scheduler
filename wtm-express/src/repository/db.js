const mongoose = require('mongoose');
require('dotenv').config();

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Function to connect to the database.
const connectdb = async () => {
    try {
        // MongoDB connection URI.
        let mongoURI;

        // Check if the application is running in a test environment.
        if (process.env.NODE_ENV === 'test') {
            // Use an in-memory MongoDB instance for testing.
            mongoServer = await MongoMemoryServer.create();
            mongoURI = mongoServer.getUri();
        } else {
            mongoURI = process.env.NODE_ENV === 'local'
                ? process.env.LOCAL_MONGO_URI
                : process.env.MONGO_URI;

        }
        // Establish a connection to the MongoDB instance.
        await mongoose.connect(mongoURI, {
            authSource: process.env.NODE_ENV !== 'test' ? 'admin' : undefined,
            auth: process.env.NODE_ENV !== 'test' ? {
                username: process.env.MONGO_INITDB_ROOT_USERNAME,
                password: process.env.MONGO_INITDB_ROOT_PASSWORD
            } : undefined
        });

    } catch (error) {
        process.exit(1);
    }
};
// Function to close the database connection.
const disconnectdb = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    // Stop the in-memory MongoDB server if it was started.
    if (mongoServer) {
        await mongoServer.stop();
    }

};

module.exports = { connectdb, disconnectdb };
