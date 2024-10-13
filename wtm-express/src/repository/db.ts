import mongoose from "mongoose";

const connection = async(): Promise<void> => {
    try {
        const mongoURI: string = process.env.MONGO_URI;
        await mongoose.connect(mongoURI);
        console.log("MongoDB has been connected by the divine grace of God.");
    }
    catch (error: any) {
        console.error("Error: MongoDB did not connect");
        process.exit(1);
    }
};