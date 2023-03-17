import "./index.css";
import { format } from "date-fns";
import TodoList from "./modules/todolist";

const setDate = () => {
  const date = document.querySelector("input[type=datetime-local]");
  const today = format(new Date(), "yyyy-MM-dd--HH:mm");
  date.value = today.replace("--", "T");
};
const myForm = document.querySelector("form");

const hideTodoBox = () => {
  const todoBox = document.getElementById("todo-box");
  todoBox.style.display = "none";
};

const showTodoBox = () => {
  const todoBox = document.getElementById("todo-box");
  todoBox.style.display = "flex";
};

const hideForm = () => {
  myForm.style.display = "none";
  document.getElementById("show-form").style.display = "block";
  showTodoBox();
};

const showFormBtn = document.getElementById("show-form");
showFormBtn.addEventListener("click", () => {
  myForm.style.display = "flex";
  document.getElementById("show-form").style.display = "none";
  hideTodoBox();
});

const getProjectUuid = (() => {
  const list = TodoList.getProjectList();
  document.querySelector("option").dataset.projectUuid = list[0].getUuid();
  const base = list[0].getUuid();
  const uuid = base;
  return { uuid };
})();

const getProject = () => {
  const { uuid } = getProjectUuid;
  const project = TodoList.getProjectWithUuid(uuid);
  return project;
};

const appendProjectOptions = () => {
  const selection = document.getElementById("project-name");
  selection.innerHTML = "";
  const projectList = TodoList.getProjectList();

  projectList.forEach((project) => {
    const option = `<option data-project-uuid="${project.uuid}">${project.title}</option>`;
    selection.innerHTML += option;
  });
  selection.lastChild.selected = true;
  getProjectUuid.uuid = selection.lastChild.dataset.projectUuid;
};

const newProject = (name) => {
  TodoList.createProject(name);
  document.getElementById("todo-box").innerHTML = "";
  appendProjectOptions();
};

const emptyForm = () => {
  document.getElementById("title").value = "";
  document.getElementById("project-title").value = "";
  document.getElementById("description").value = "";
  setDate();
};

const removeTodo = (uuid, htmlElement) => {
  htmlElement.remove();
  const project = getProject();
  project.removeTodo(uuid);
  console.log(project.getTodoList());
};

const viewTodo = (todo) => {
  const element = document.createElement("div");
  const todoBox = document.getElementById("todo-box");
  element.classList.add("todo");
  element.dataset.todoUuid = todo.getUuid();
  element.innerHTML = `<span>Title</span><p>${todo.getTitle()}</p><span>Due date</span><p>${
    todo.dueDate
  }</p><span>Priority</span><p>${todo.priority}</p><span>Description</span><p>${
    todo.description
  }</p><button class="edit-todo">Edit/Details</button><button class="remove-todo">Remove</button>`;

  element.lastChild.onclick = (e) => {
    removeTodo(e.composedPath()[1].dataset.todoUuid, e.composedPath()[1]);
  };
  // element.children[8] expand todo here

  todoBox.appendChild(element);
};

const viewProject = () => {
  document.getElementById("todo-box").innerHTML = "";
  const project = getProject();
  const todos = project.getTodoList();
  todos.forEach((todo) => {
    viewTodo(todo);
  });
  console.log(project);
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
  const dueDate = document.querySelector("input[type=datetime-local]").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  return [title, dueDate, description, priority];
};

const addToProject = (e) => {
  e.preventDefault();
  const project = getProject();
  project.createTodo(
    getTodoValues()[0],
    getTodoValues()[1],
    getTodoValues()[2],
    getTodoValues()[3]
  );
};

const submitButton = document.querySelector("button[type=submit]");
submitButton.addEventListener("click", (e) => {
  const projectTitle = document.getElementById("project-title").value;
  if (projectTitle !== "") {
    const name = getProjectValue();
    newProject(name);
    e.preventDefault();
  }
  if (formIsComplete() === true) {
    addToProject(e);
    viewProject();
  }
  emptyForm();
});

const closeFormButton = document.getElementById("close-form");

closeFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  hideForm();
});

const projectName = document.getElementById("project-name");
projectName.onchange = (event) => {
  getProjectUuid.uuid =
    event.target.options[event.target.selectedIndex].dataset.projectUuid;

  viewProject();
};

setDate();

myForm.style.display = "none";
