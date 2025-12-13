import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllUsers, deleteUser, getTodosByUser, updateUserTodoByAdmin, deleteTodoByAdmin } from "../controller/admin.controller.js";
import { authenticate } from "../middlewares/authorised.js";

const adminRouter = express.Router();

adminRouter.get("/user",authenticate, isAdmin, getAllUsers);
adminRouter.get("/user/:userId/todo",authenticate,isAdmin,getTodosByUser)
adminRouter.delete("/user/:id",authenticate,isAdmin, deleteUser);
adminRouter.put("/user/:userId/todo/:todoId",authenticate,isAdmin,updateUserTodoByAdmin);
adminRouter.delete("/user/:userId/todo/:todoId",authenticate,isAdmin, deleteTodoByAdmin);
export default adminRouter;
