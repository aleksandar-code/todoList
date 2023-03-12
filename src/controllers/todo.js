import * as todoView from "../views/todo";
import * as todoModel from "../models/todo";
import defaultProject from "../models/project";

const addListener = () => {
  const addTodoBtn = document.querySelectorAll("button[type=submit]")[0];
  addTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const todo = todoModel.createTodo("Read book", defaultProject);
    defaultProject.appendTodo(todo);
    todoView.displayTodo(todo);
  });
};
const showTodoForm = document.getElementById("show-todo-form");
showTodoForm.addEventListener("click", () => {
  todoView.todoForm();
  addListener();
});

// setInterval(() => {
//   console.log(defaultProject.showList());
// }, 2000);
