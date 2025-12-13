import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateToken = async (userId) => {
  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is missing in environment variables");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ userId: user._id ,role: user.role}, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });

    await User.findByIdAndUpdate(userId, { token });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
