const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const newTodo = {
    id: Date.now().toString(),
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      completed: req.body.completed,
    };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ message: "Todo deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
