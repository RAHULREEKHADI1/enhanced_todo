import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            completed: req.body.completed,
            user: req.user.id,
        });

        const newTodo = await todo.save();

        res.status(201).json({ message: "Todo created successfully", newTodo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error occurred in todo creation" });
    }
};

export const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error occurred in todo fetching" });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!todo) return res.status(404).json({ message: "Todo not found" });

        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error occurred in updating the todo" });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        console.log("hi");
        
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!todo) return res.status(404).json({ message: "Todo not found" });

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error occurred in deleting todo" });
    }
};
