import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    
    const tokenFromCookie = req.cookies.jwt;
    const authHeader = req.headers.authorization;
    let token;

    if (tokenFromCookie) {
        token = tokenFromCookie;
    } else if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No authentication token found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "Invalid Token: User not found." });
    }

    req.user = user;
    next();
    
  } catch (error) {
    res.clearCookie('jwt'); 
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};