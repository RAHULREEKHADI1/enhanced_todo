import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, unique: true, sparse: true },
        email: { type: String, unique: true, sparse: true },
        password: { type: String, select: false },
        googleId: String,
        twitterId: String,
        facebookId: String,
        role: { type: String, default: "user", enum: ["user", "admin"] },
        token: {
            type: String,
        },
    }
);

const User = mongoose.model("User", userSchema);

export default User;
