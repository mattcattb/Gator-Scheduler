const mongoose = require('mongoose');
require('dotenv').config();

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectdb = async () => {
    try {
        let mongoURI;

        if (process.env.NODE_ENV === 'test') {
            mongoServer = await MongoMemoryServer.create();
            mongoURI = mongoServer.getUri();
        } else {
            mongoURI = process.env.NODE_ENV === 'local'
                ? process.env.LOCAL_MONGO_URI
                : process.env.MONGO_URI;

        }

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

const disconnectdb = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (mongoServer) {
        await mongoServer.stop();
    }

};

module.exports = { connectdb, disconnectdb };
