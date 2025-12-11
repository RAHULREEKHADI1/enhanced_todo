import  { Router } from "express";
import { login, logout, register } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;
