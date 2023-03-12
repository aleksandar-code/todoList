import todoView from "../views/todo";

const addTodoBtn = document.getElementById("add-todo-button");
addTodoBtn.addEventListener("click", () => {
  // ask model for info and send it to view, display form to create todo
  todoView();
});
