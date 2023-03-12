import todoView from "../views/todo";

const addListener = () => {
  const addTodoBtn = document.querySelectorAll("button[type=submit]")[0];
  addTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
};
const showTodoForm = document.getElementById("show-todo-form");
showTodoForm.addEventListener("click", () => {
  todoView();
  addListener();
});
