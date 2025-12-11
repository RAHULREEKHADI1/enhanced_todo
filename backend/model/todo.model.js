import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
