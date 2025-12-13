import mongoose from "mongoose";
import Todo from "../model/todo.model.js";
import User from "../model/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "name email role");
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error" });
    }
};
export const getTodosByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const todos = await Todo.find({ user: userId });

        res.status(200).json(todos);
    } catch (err) {
        console.error("Error fetching user todos:", err);
        res.status(500).json({ message: "Server error" });
    }
};
export const updateUserTodoByAdmin = async (req, res) => {
    try {
        console.log("here is the error");

        const { userId, todoId } = req.params;
        const { title, completed } = req.body;
        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(todoId)
        ) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const todo = await Todo.findOne({ _id: todoId, user: userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found for this user" });
        }
        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();

        res.status(200).json({
            message: "Todo updated by admin",
            todo,
        });
    }
    catch (err) {
        console.error("Error updating user todos:", err);
        res.status(500).json({ message: "Server error" });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user._id.toString() === req.user.userId) {
            return res.status(403).json({ message: "You cannot delete yourself" });
        }

        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteTodoByAdmin = async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const todoUserId = todo.user._id ? todo.user._id.toString() : todo.user.toString();
    if (todoUserId !== userId) {
      return res.status(404).json({ message: "Todo does not belong to this user" });
    }
    await todo.deleteOne();

    res.json({ message: "Todo deleted successfully by admin" });

  } catch (error) {
    console.error("Admin error deleting todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};


