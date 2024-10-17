const Todo = (title, description, dueDate, priority) => {
  return {
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
};

const Project = (name) => {
  let todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
  };

  const removeTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
  };

  return { name, todos, addTodo, removeTodo };
};

const defaultProject = Project("My Todos");

const loadTodos = async () => {
  try {
    const response = await fetch("http://localhost:5000/todos");
    const todos = await response.json();
    defaultProject.todos = todos;
    renderProject(defaultProject);
  } catch (error) {
    console.error("Error loading todos:", error);
  }
};

const addTodoToBackend = async (newTodo) => {
  try {
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const addedTodo = await response.json();
    console.log("Todo added:", addedTodo);
    await loadTodos();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

const updateTodoInBackend = async (id, updatedTodo) => {
  try {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const updated = await response.json();
    console.log("Todo updated:", updated);
    await loadTodos();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const deleteTodoFromBackend = async (id) => {
  try {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    console.log("Todo deleted:", id);
    await loadTodos();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

const renderProject = (project) => {
  console.log("Rendering project with todos:", project.todos);
  const app = document.getElementById("app");
  app.innerHTML = "";

  project.todos.forEach((todo) => {
    const todoElement = renderTask(todo);
    app.appendChild(todoElement);
  });
};

const renderTask = (todo) => {
  const todoElement = document.createElement("div");
  todoElement.classList.add("todo-item");
  todoElement.innerHTML = `
    <input type="checkbox" ${
      todo.completed ? "checked" : ""
    } class="complete-checkbox" data-id="${todo.id}">
    <h3>${todo.title}</h3>
    <p>Description: ${todo.description}</p>
    <p>Due: ${todo.dueDate} | Priority: ${todo.priority}</p>
    <div class="todo-actions">
      <button class="edit-btn" data-id="${todo.id}">Edit</button>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    </div>
  `;
  return todoElement;
};

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();

  const form = document.getElementById("todo-form");
  const submitBtn = document.getElementById("submit-btn");
  const formTitle = document.getElementById("form-title");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("todo-title").value.trim();
    const description = document
      .getElementById("todo-description")
      .value.trim();
    const dueDate = document.getElementById("todo-due-date").value;
    const priority = document.getElementById("todo-priority").value;

    const editId = form.getAttribute("data-edit-id");

    if (editId) {
      const todoToEdit = defaultProject.todos.find(
        (todo) => todo.id === editId
      );
      if (todoToEdit) {
        const updatedTodo = {
          ...todoToEdit,
          title,
          description,
          dueDate,
          priority,
        };
        await updateTodoInBackend(editId, updatedTodo);
        form.removeAttribute("data-edit-id");
        submitBtn.textContent = "Add Todo";
        formTitle.textContent = "Add a To-Do";
      }
    } else {
      const newTodo = Todo(title, description, dueDate, priority);
      await addTodoToBackend(newTodo);
    }

    form.reset();
  });

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const id = e.target.dataset.id;
      const todoToEdit = defaultProject.todos.find((todo) => todo.id === id);
      if (todoToEdit) {
        document.getElementById("todo-title").value = todoToEdit.title;
        document.getElementById("todo-description").value =
          todoToEdit.description;
        document.getElementById("todo-due-date").value = todoToEdit.dueDate;
        document.getElementById("todo-priority").value = todoToEdit.priority;
        form.setAttribute("data-edit-id", id);
        submitBtn.textContent = "Update Todo";
        formTitle.textContent = "Update a To-Do";
      }
    }

    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;
      await deleteTodoFromBackend(id);
    }
  });

  document.addEventListener("change", async (e) => {
    if (e.target.classList.contains("complete-checkbox")) {
      const id = e.target.dataset.id;
      const todoToComplete = defaultProject.todos.find(
        (todo) => todo.id === id
      );
      if (todoToComplete) {
        todoToComplete.completed = e.target.checked;
        await updateTodoInBackend(id, todoToComplete);
      }
    }
  });

  document
    .getElementById("filter-tasks")
    .addEventListener("change", (event) => {
      const filter = event.target.value;
      const filteredTodos = defaultProject.todos.filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
        return true;
      });
      renderProject({ ...defaultProject, todos: filteredTodos });
    });
});
