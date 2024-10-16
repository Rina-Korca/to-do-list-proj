const Project = (name) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const addTodo = (todo) => {
    todos.push(todo);
    saveTodos();
  };

  const removeTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
  };

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return { name, todos, addTodo, removeTodo };
};
