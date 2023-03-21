import "./index.css";
import { format } from "date-fns";
import TodoList from "./modules/todolist";
import { checkStorageAvailability, storageType } from "./modules/storage";

function setLocalStorage() {
  TodoList.setStorage(storageType());
}

function setDom() {
  const selection = document.getElementById("project-name");
  selection.innerHTML = "";
  const projectList = TodoList.getProjectList();

  projectList.forEach((project) => {
    const option = `<option data-project-uuid="${project.uuid}">${project.title}</option>`;
    selection.innerHTML += option;
  });
}

if (checkStorageAvailability() === true) {
  if (localStorage.length) {
    setLocalStorage();
    setDom();
  }
}

function triggerLocalStorage() {
  if (checkStorageAvailability() === true) {
    storageType(TodoList);
  }
}

const setDate = () => {
  const date = document.querySelector("input[type=datetime-local]");
  const today = format(new Date(), "yyyy-MM-dd--HH:mm");
  date.value = today.replace("--", "T");
};
const myForm = document.getElementById("creation-form");

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

const createEditForm = (uuid) => {
  const project = getProject();
  const myTodo = project.getTodoWithUuid(uuid);
  const editForm = document.createElement("div");
  editForm.setAttribute("id", "edit-form");
  document.body.appendChild(editForm);

  const form = document.createElement("form");

  form.id = "edit-form";
  form.action = "";
  form.method = "post";
  editForm.appendChild(form);
  form.innerHTML += `
  <label for="title-edit">Todo title</label>
  <input
    type="text"
    id="title-edit"
    name="title-edit"
    placeholder="Todo Title"
    value="${myTodo.title}"
    required
  />
  <label for="priority-edit">Priority</label>
  <select name="priority-edit" id="priority-edit">
    <option value="not important">Not important</option>
    <option value="not urgent">Not urgent</option>
    <option value="important">Important</option>
    <option value="urgent">Urgent</option>
  </select>
  <label for="due-date">Due date</label>
  <input id="due-date-edit" type="datetime-local" value="${myTodo.dueDate}" />
  <label for="description-edit">Description</label>
  <input
    type="text"
    id="description-edit"
    name="description-edit"
    placeholder="Todo Description"
    value="${myTodo.description}"
  />
  <button id="submit-edit">Edit todo</button>
  <button id="cancel-edit">Cancel</button>
`;
};

const showTodoBox = () => {
  const todoBox = document.getElementById("todo-box");
  todoBox.style.display = "flex";
};

const hideTodoBox = () => {
  const todoBox = document.getElementById("todo-box");
  todoBox.style.display = "none";
};

const createProjectCard = (project) => {
  const element = document.createElement("div");
  element.setAttribute("class", "project-card");
  const title = document.createElement("h3");
  title.textContent = project.title;
  element.appendChild(title);
  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "remove-project");
  removeBtn.textContent = "Remove";
  element.appendChild(removeBtn);
  return element;
};

const createProjectsBox = () => {
  const projectBox = document.createElement("div");
  projectBox.setAttribute("id", "project-box");
  const h2 = document.createElement("h2");
  h2.textContent = "Projects";
  projectBox.appendChild(h2);
  document.getElementById("content").appendChild(projectBox);
  const projectList = TodoList.getProjectList();
  projectList.forEach((project) => {
    const card = createProjectCard(project);
    projectBox.appendChild(card);
  });
};
// .remove-project
const projectsBtn = document.getElementById("show-projects");
projectsBtn.addEventListener("click", () => {
  hideTodoBox();
  createProjectsBox();
  document.getElementById("show-projects").style.pointerEvents = "none";
  document.getElementById("midbar").style.display = "none";
  document.getElementById("todo-box").remove();
  document.getElementById("creation-form").remove();
});

const hideProjects = () => {
  document.getElementById("show-projects").style.pointerEvents = "all";
  document.getElementById("midbar").style.display = "flex";
  if (document.getElementById("project-box")) {
    document.getElementById("project-box").remove();
  }
};

const removeEditForm = () => {
  document.getElementById("edit-form").remove();
};

let viewProject;

const editValues = (uuid) => {
  const title = document.getElementById("title-edit").value;
  const priority = document.getElementById("priority-edit").value;
  const dueDate = document.getElementById("due-date-edit").value;
  const description = document.getElementById("description-edit").value;

  const project = getProject();
  const myTodo = project.getTodoWithUuid(uuid);

  myTodo.title = title;
  myTodo.priority = priority;
  myTodo.dueDate = dueDate;
  myTodo.description = description;
};

const addEditListener = (uuid) => {
  const cancelEditBtn = document.getElementById("cancel-edit");
  const submitEditBtn = document.getElementById("submit-edit");

  cancelEditBtn.onclick = (e) => {
    e.preventDefault();
    removeEditForm();
    showTodoBox();
    document.getElementById("project-name").style.pointerEvents = "all";
  };

  submitEditBtn.onclick = (e) => {
    e.preventDefault();
    editValues(uuid);
    removeEditForm();
    showTodoBox();
    viewProject();
    document.getElementById("project-name").style.pointerEvents = "all";
    triggerLocalStorage();
  };
};

const editTodo = (uuid) => {
  document.getElementById("project-name").style.pointerEvents = "none";
  createEditForm(uuid);
  addEditListener(uuid);
  hideTodoBox();
};
// up there edit functionality

const hideForm = () => {
  myForm.style.display = "none";
  document.getElementById("show-form").style.pointerEvents = "all";
  document.getElementById("show-form").style.backgroundColor = "green";
  showTodoBox();
};

const showFormBtn = document.getElementById("show-form");
showFormBtn.addEventListener("click", () => {
  myForm.style.display = "flex";
  document.getElementById("show-form").style.pointerEvents = "none";
  document.getElementById("show-form").style.backgroundColor = "red";
  hideTodoBox();
  hideProjects();
});

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
    triggerLocalStorage();
  };
  element.children[8].onclick = (e) => {
    editTodo(e.composedPath()[1].dataset.todoUuid);
  };

  todoBox.appendChild(element);
};

viewProject = () => {
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
  triggerLocalStorage();
  hideForm();
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

const moreInfo = document.getElementById("more-info");
moreInfo.addEventListener("click", () => {
  const p = document.getElementById("info");
  p.style.display = "block";
  setTimeout(() => {
    p.style.display = "none";
  }, 30000);
});

setDate();

myForm.style.display = "none";

window.onload = () => {
  viewProject();
};
