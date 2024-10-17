import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true, enum: ["low", "medium", "high"] },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
