import mongoose from 'mongoose';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';


export async function connectToDB() {
    try {
        const uri = process.env.MONGODB_URL;
        if (!uri) {
            throw new Error("Its not responding")
        }
        await mongoose.connect(uri)
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.error("Database connection error:", err);
    }
}
