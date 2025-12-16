import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: function () {
                return !this.googleId && !this.twitterId;
            },
        },
        email: {
            type: String,
            required: function () {
                return !this.googleId && !this.twitterId;
            },
            unique: true,
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId && !this.twitterId;
            },
            select: false,
        },
        token: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        }
    }
);

const User = mongoose.model("User", userSchema);

export default User;
