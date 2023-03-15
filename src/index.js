import "./index.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from "nanoid";
import TodoList from "./modules/todolist";

const userId = nanoid();
console.log(userId);
const getProjectIndex = (() => {
  const index = 0;
  return { index };
})();

const getProject = () => {
  const { index } = getProjectIndex;
  const project = TodoList.getProjectWithIndex(index);
  return project;
};

const appendProjectOptions = () => {
  const selection = document.getElementById("project-name");
  selection.innerHTML = "";
  const projectList = TodoList.getProjectList();

  projectList.forEach((project) => {
    const option = `<option data-project-index="${project.index}">${project.title}</option>`;
    selection.innerHTML += option;
  });
  selection.lastChild.selected = true;
  getProjectIndex.index = selection.lastChild.dataset.projectIndex;
};

const newProject = (name) => {
  TodoList.createProject(name);
  document.getElementById("todo-box").innerHTML = "";
  appendProjectOptions();
};

const emptyForm = () => {
  document.getElementById("title").value = "";
  document.getElementById("project-title").value = "";
};

const removeTodo = (index, htmlElement) => {
  console.log(index);
  htmlElement.remove();
  const project = getProject();
  project.removeTodo(index);
  console.log(project.getTodoList());
};

const viewTodo = (todo) => {
  const element = document.createElement("div");
  const todoBox = document.getElementById("todo-box");
  element.classList.add("todo");
  element.dataset.todoIndex = todo.getIndex();
  element.innerHTML = `<p>${todo.getTitle()}</p> <button class="remove-todo">Remove</button>`;
  console.log(element.lastChild);
  element.lastChild.onclick = (e) => {
    removeTodo(e.composedPath()[1].dataset.todoIndex, e.composedPath()[1]);
  };
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

const getProjectValue = () => {
  const title = document.getElementById("project-title").value;
  return title;
};

const getTodoValues = () => {
  const title = document.getElementById("title").value;
  return title;
};

const addToProject = (e) => {
  e.preventDefault();
  const project = getProject();
  project.createTodo(getTodoValues());
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

const newProjectBtn = document.getElementById("new-project");

newProjectBtn.addEventListener("click", (e) => {
  const projectTitle = document.getElementById("project-title").value;
  if (projectTitle !== "") {
    const name = getProjectValue();
    newProject(name);
    e.preventDefault();
    emptyForm();
  }
});
