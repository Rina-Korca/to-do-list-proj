// Existing code...

const renderProject = (project) => {
  const projectElement = document.createElement("div");
  projectElement.className = "project";

  project.todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Due: ${todo.dueDate} | Priority: ${todo.priority}</p>
        `;
    projectElement.appendChild(todoElement);
  });

  app.appendChild(projectElement);
};

// Add Todo form functionality
const form = document.getElementById("todo-form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the page from refreshing

  const title = document.getElementById("todo-title").value;
  const description = document.getElementById("todo-description").value;
  const dueDate = document.getElementById("todo-due-date").value;
  const priority = document.getElementById("todo-priority").value;

  const newTodo = Todo(title, description, dueDate, priority);
  defaultProject.addTodo(newTodo);

  // Render the updated project
  renderProject(defaultProject);

  // Clear the form
  form.reset();
});

// Initial render
renderProject(defaultProject);
