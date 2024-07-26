import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI

const connectDB = async () => {

    try {
        await mongoose.connect( mongoUri)
        console.log('Database connected');
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
        process.exit(1)
    }
};

export default connectDB;