import "./index.css";
import TodoList from "./modules/todolist";

const getProject = () => {
  const project = TodoList.getProjectWithIndex(0);
  return project;
};
const viewProject = () => {
  const project = getProject();
  const todos = project.getTodoList();
  console.log(todos);
};

const formIsComplete = () => {
  const formTitle = document.getElementById("title");
  if (formTitle.value === "") {
    return false;
  }
  return true;
};

const setProject = () => {
  const project = getProject();
  document.getElementById("project-name").textContent = project.title;
};

const getTodoValues = () => {
  setProject();
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
  }
});
