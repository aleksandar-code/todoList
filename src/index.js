import "./index.css";
import projectModule from "./modules/project";

const displayTodo = (todo) => {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  todoContainer.innerHTML = `<p>Title: ${todo.title}</p> <button id="remove-todo">Remove</button>`;
  return todoContainer;
};

const displayProject = () => {
  const todoBox = document.getElementById("todo-box");
  todoBox.innerHTML = "";
  const todoList = projectModule.getList();
  todoList.forEach((todo) => {
    const todoContainer = displayTodo(todo);
    todoBox.appendChild(todoContainer);
    const removeBtn = document.getElementById("remove-todo");
    removeBtn.addEventListener("click", () => {});
  });
};

const getTodoInfo = () => {
  const todoTitle = document.getElementById("title").value;
  document.getElementById("title").value = "";
  return todoTitle;
};
const isComplete = () => {
  const todoTitle = document.getElementById("title").value;
  if (todoTitle.length < 1) {
    return false;
  }
  return true;
};
const createDisplayTodo = () => {
  if (isComplete() === true) {
    projectModule.createTodo(getTodoInfo(), "Default");
    displayProject();
  }
};

const addListener = () => {
  const addTodoBtn = document.querySelectorAll("button[type=submit]")[0];
  addTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createDisplayTodo();
  });
};

addListener();
