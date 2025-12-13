import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./db/db.js";
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://enhanced-todo-1.onrender.com"
  ],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/admin",adminRouter)

async function start() {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

start();
