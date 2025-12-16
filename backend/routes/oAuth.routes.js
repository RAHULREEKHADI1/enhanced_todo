import express from 'express'
import passport from 'passport';
import { generateToken } from '../jwt/token.js';

const authRouter = express.Router();

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const token =await generateToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}welcome?jwt=${token}`);
  }
);



export default authRouter
