/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (() => {

eval("// Existing code...\r\n\r\nconst renderProject = (project) => {\r\n  const projectElement = document.createElement(\"div\");\r\n  projectElement.className = \"project\";\r\n\r\n  project.todos.forEach((todo) => {\r\n    const todoElement = document.createElement(\"div\");\r\n    todoElement.innerHTML = `\r\n            <h3>${todo.title}</h3>\r\n            <p>Due: ${todo.dueDate} | Priority: ${todo.priority}</p>\r\n        `;\r\n    projectElement.appendChild(todoElement);\r\n  });\r\n\r\n  app.appendChild(projectElement);\r\n};\r\n\r\n// Add Todo form functionality\r\nconst form = document.getElementById(\"todo-form\");\r\nform.addEventListener(\"submit\", (e) => {\r\n  e.preventDefault(); // Prevent the page from refreshing\r\n\r\n  const title = document.getElementById(\"todo-title\").value;\r\n  const description = document.getElementById(\"todo-description\").value;\r\n  const dueDate = document.getElementById(\"todo-due-date\").value;\r\n  const priority = document.getElementById(\"todo-priority\").value;\r\n\r\n  const newTodo = Todo(title, description, dueDate, priority);\r\n  defaultProject.addTodo(newTodo);\r\n\r\n  // Render the updated project\r\n  renderProject(defaultProject);\r\n\r\n  // Clear the form\r\n  form.reset();\r\n});\r\n\r\n// Initial render\r\nrenderProject(defaultProject);\r\n\n\n//# sourceURL=webpack://to-do-list-proj/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/index.js"]();
/******/ 	
/******/ })()
;