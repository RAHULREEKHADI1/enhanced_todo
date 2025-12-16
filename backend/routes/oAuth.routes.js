import express from 'express'
import passport from 'passport';
import { generateToken } from '../jwt/token.js';

const authRouter = express.Router();

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const token =await generateToken(req.user);
    res.send(token)
    res.redirect(`${process.env.FRONTEND_URL}welcome`);
  }
);



export default authRouter
