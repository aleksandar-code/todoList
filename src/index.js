import "./index.css";
import projectModule from "./modules/project";

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
  projectModule.createTodo(getTodoValues()[0], getTodoValues()[1]);
  e.preventDefault();
};

const submitButton = document.querySelector("button[type=submit]");
submitButton.addEventListener("click", (e) => {
  if (formIsComplete() === true) {
    addToProject(e);
    console.log(projectModule.getList());
  }
});
