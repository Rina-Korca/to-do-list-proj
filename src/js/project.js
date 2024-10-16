// Example for Project.js
const Project = (name) => {
  let todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
  };

  return { name, todos, addTodo };
};

export default Project;
