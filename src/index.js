import "./index.css";
import TodoList from "./modules/todolist";

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
  element.innerHTML = `<p>${todo.getTitle()}</p> <button class="remove-todo">Remove</button>`;
  element.lastChild.onclick = (e) => {
    removeTodo(e.composedPath()[1].dataset.todoUuid, e.composedPath()[1]);
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
  getProjectUuid.uuid =
    event.target.options[event.target.selectedIndex].dataset.projectUuid;

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
