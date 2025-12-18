import User from "../model/user.model.js";
import {z } from 'zod';
import bcrypt from 'bcryptjs'
import { generateToken } from "../jwt/token.js";


const userSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    username: z.string().trim().regex(/^[a-zA-Z\s]+$/,{ message: "Username can only contain letters" }).min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" })
})


export const register = async (req, res) => {    
    try {
        const { username, email, password } = req.body;
        
        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const safeSchema = userSchema.safeParse({ email, username, password });
        if (!safeSchema.success) {
            const errorMessages = safeSchema.error.issues.map(err => err.message);
            return res.status(400).json({ errors: errorMessages });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashPassword
        });
        await newUser.save();

        const token = await generateToken(newUser._id, res);

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error registering user" });
    }
}


export const login = async (req, res) => {
  const { email, password,role } = req.body;  

  try {
    if (!email || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    const token = await generateToken(user._id);
    console.log(user.role);
    
    if(user.role==="admin"){
      const admin = user;
      return res.status(200).json({
        message:"Admin logged in successfully",
        token,
        admin
      })
    }
    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in user" });
  }
};


export const logout = (req, res) => {
  try {
    console.log("whats the error");
    
    return res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (error) {
    console.error(error,"am i reaching here or not");
    return res.status(500).json({ message: "Error logging out" });
  }
};
