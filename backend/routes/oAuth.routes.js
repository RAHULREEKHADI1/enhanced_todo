import express from 'express'
import passport from 'passport';
import { generateToken } from '../jwt/token.js';

const authRouter = express.Router();
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
// authRouter.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
authRouter.get("/twitter", passport.authenticate("twitter"));

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const token =await generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}welcome`);
  }
);

// authRouter.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
// authRouter.get("/facebook/callback",
//   passport.authenticate("facebook", { session: false }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
//   }
// );

authRouter.get("/twitter", passport.authenticate("twitter"));
authRouter.get("/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  async (req, res) => {
    const token = await generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}welcome`);
  }
);

export default authRouter
