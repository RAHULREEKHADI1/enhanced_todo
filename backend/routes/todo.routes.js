import { Router } from "express";
import { createTodo,updateTodo,deleteTodo,getTodo } from "../controller/todo.controller.js";
import { authenticate } from "../middlewares/authorised.js";

const todoRouter = Router();

todoRouter.post("/create", authenticate, createTodo);
todoRouter.get("/fetch", authenticate, getTodo);
todoRouter.put("/update/:id", authenticate, updateTodo);
todoRouter.delete("/delete/:id", authenticate, deleteTodo);

export default todoRouter;
