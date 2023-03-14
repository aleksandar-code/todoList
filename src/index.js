import "./index.css";
import TodoList from "./modules/todolist";

const getProjectIndex = (() => {
  const index = 0;
  return { index };
})();

const getProject = () => {
  const { index } = getProjectIndex;
  const project = TodoList.getProjectWithIndex(index);
  return project;
};

const emptyForm = () => {
  document.getElementById("title").value = "";
};

const viewTodo = (todo) => {
  const element = document.createElement("div");
  const todoBox = document.getElementById("todo-box");
  element.classList.add("todo");
  element.dataset.todoIndex = todo.getIndex();
  element.textContent = todo.getTitle();
  todoBox.appendChild(element);
};

const viewProject = () => {
  document.getElementById("todo-box").innerHTML = "";
  const project = getProject();
  const todos = project.getTodoList();
  todos.forEach((todo) => {
    viewTodo(todo);
  });
};

const formIsComplete = () => {
  const formTitle = document.getElementById("title");
  if (formTitle.value === "") {
    return false;
  }
  return true;
};

const getTodoValues = () => {
  const title = document.getElementById("title").value;
  const project = document.getElementById("project-name").textContent;
  return [title, project];
};

const addToProject = (e) => {
  const project = getProject();
  project.createTodo(getTodoValues()[0], getTodoValues()[1]);
  e.preventDefault();
};

const submitButton = document.querySelector("button[type=submit]");
submitButton.addEventListener("click", (e) => {
  if (formIsComplete() === true) {
    addToProject(e);
    viewProject();
    emptyForm();
  }
});

const projectName = document.getElementById("project-name");
projectName.onchange = (event) => {
  getProjectIndex.index =
    event.target.options[event.target.selectedIndex].dataset.projectIndex;

  viewProject();
};
