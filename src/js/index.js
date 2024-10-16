// Example Todo function
const Todo = (title, description, dueDate, priority) => {
  return {
    id: Date.now().toString(), // Unique ID generation
    title,
    description,
    dueDate,
    priority,
    completed: false, // Add completed status if needed
  };
};

// Example Project function
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

const defaultProject = Project("My Todos");

// Load Todos from local storage
const loadTodos = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  storedTodos.forEach((todoData) => {
    const newTodo = Todo(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority
    );
    newTodo.id = todoData.id; // Restore the ID from storage
    defaultProject.addTodo(newTodo);
  });
  renderProject(defaultProject);
};

// Render all todos in the project
const renderProject = (project) => {
  const app = document.getElementById("app");
  app.innerHTML = ""; // Clear previous todos

  project.todos.forEach((todo) => {
    const todoElement = renderTask(todo);
    app.appendChild(todoElement);
  });
};

// Function to create and return todo element
const renderTask = (todo) => {
  const todoElement = document.createElement("div");
  todoElement.classList.add("todo-item");
  todoElement.innerHTML = `
    <input type="checkbox" ${
      todo.completed ? "checked" : ""
    } class="complete-checkbox" data-id="${todo.id}">
    <h3>${todo.title}</h3>
    <p>Due: ${todo.dueDate} | Priority: ${todo.priority}</p>
    <div class="todo-actions">
      <button class="edit-btn" data-id="${todo.id}">Edit</button>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    </div>
  `;
  return todoElement;
};

// Add event listeners and other functions
document.addEventListener("DOMContentLoaded", () => {
  loadTodos(); // Load todos when the application initializes

  // Form submission for adding/updating todos
  const form = document.getElementById("todo-form");
  const submitBtn = document.getElementById("submit-btn");
  const formTitle = document.getElementById("form-title");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("todo-title").value.trim();
    const description = document
      .getElementById("todo-description")
      .value.trim();
    const dueDate = document.getElementById("todo-due-date").value;
    const priority = document.getElementById("todo-priority").value;

    const editId = form.getAttribute("data-edit-id");

    if (editId) {
      // Update existing todo
      const todoToEdit = defaultProject.todos.find(
        (todo) => todo.id === editId
      );
      todoToEdit.title = title;
      todoToEdit.description = description;
      todoToEdit.dueDate = dueDate;
      todoToEdit.priority = priority;

      form.removeAttribute("data-edit-id");
      submitBtn.textContent = "Add Todo";
      formTitle.textContent = "Add a To-Do";
    } else {
      // Add new todo
      const newTodo = Todo(title, description, dueDate, priority);
      defaultProject.addTodo(newTodo);
    }

    form.reset();
    renderProject(defaultProject);
  });

  // Handling edit and delete actions
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const id = e.target.dataset.id;
      const todoToEdit = defaultProject.todos.find((todo) => todo.id === id);
      document.getElementById("todo-title").value = todoToEdit.title;
      document.getElementById("todo-description").value =
        todoToEdit.description;
      document.getElementById("todo-due-date").value = todoToEdit.dueDate;
      document.getElementById("todo-priority").value = todoToEdit.priority;
      form.setAttribute("data-edit-id", id);
      submitBtn.textContent = "Update Todo";
      formTitle.textContent = "Update a To-Do";
    }

    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;
      defaultProject.removeTodo(id);
      renderProject(defaultProject);
    }
  });

  // Checkbox functionality to mark todos as complete/incomplete
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("complete-checkbox")) {
      const id = e.target.dataset.id;
      const todoToComplete = defaultProject.todos.find(
        (todo) => todo.id === id
      );
      todoToComplete.completed = e.target.checked;
      renderProject(defaultProject);
    }
  });

  // Filtering todos based on the selected filter
  document
    .getElementById("filter-tasks")
    .addEventListener("change", (event) => {
      const filter = event.target.value;
      const filteredTodos = defaultProject.todos.filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
        return true; // Show all
      });
      renderProject({ ...defaultProject, todos: filteredTodos }); // Render filtered todos
    });
});
