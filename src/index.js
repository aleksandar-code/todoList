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

function createProjectCard(project) {
  const element = document.createElement("div");
  element.setAttribute("class", "project-card");
  const title = document.createElement("h3");
  title.textContent = project.title;
  element.appendChild(title);

  if (project.title !== "Default") {
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-project");
    removeBtn.textContent = "Remove";
    element.dataset.projectUuid = project.uuid;
    element.appendChild(removeBtn);
  }
  return element;
}

const createProjectsBox = () => {
  const projectBox = document.createElement("div");
  projectBox.setAttribute("id", "project-box");
  const h2 = document.createElement("h2");
  h2.textContent = "Projects";
  projectBox.appendChild(h2);
  document.getElementById("content").appendChild(projectBox);
  const projectList = TodoList.getProjectList();
  if (projectList.length > 0) {
    projectList.forEach((project) => {
      const card = createProjectCard(project);

      projectBox.appendChild(card);
    });
  }
};
let hideForm;

const removeProjectTodos = (uuid) => {
  const project = TodoList.getProjectWithUuid(uuid);
  const todos = document.getElementById("todo-box").children;

  const array = project.todoList;
  array.forEach((todo) => {
    for (let i = 0; i < todos.length; i += 1) {
      if (todos[i].dataset.todoUuid === todo.uuid) {
        document.getElementById("todo-box").children[i].remove();
      }
    }
  });
  project.emptyTodoList();
};

const removeProject = (uuid) => {
  removeProjectTodos(uuid);
  TodoList.removeProject(uuid);
  triggerLocalStorage(TodoList);
};

const removeProjectFromDom = (element) => {
  const uuid = element.dataset.projectUuid;
  const projectSelector = document.getElementById("project-name");
  const array = projectSelector.children;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].dataset.projectUuid === uuid) {
      projectSelector.children[i].remove();
      element.remove();
    }
  }
};

const addRemoveProjectListener = () => {
  const removeBtns = document.querySelectorAll(".remove-project");
  for (let i = 0; i < removeBtns.length; i += 1) {
    removeBtns[i].onclick = (e) => {
      removeProject(e.composedPath()[1].dataset.projectUuid);
      removeProjectFromDom(e.composedPath()[1]);
      triggerLocalStorage();
    };
  }
};

const projectsBtn = document.getElementById("show-projects");
projectsBtn.addEventListener("click", () => {
  createProjectsBox();
  document.getElementById("show-projects").style.pointerEvents = "none";
  document.getElementById("midbar").style.display = "none";
  hideForm();
  hideTodoBox();
  addRemoveProjectListener();
});

const hideProjects = () => {
  document.getElementById("show-projects").style.pointerEvents = "all";
  document.getElementById("midbar").style.display = "flex";

  if (document.getElementById("project-box")) {
    document.getElementById("project-box").remove();
  }
};

const todosBtn = document.getElementById("show-todos");
todosBtn.addEventListener("click", () => {
  hideProjects();
  hideForm();
});
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

hideForm = () => {
  myForm.style.display = "none";
  document.getElementById("show-form").style.pointerEvents = "all";
  document.getElementById("show-form").style.backgroundColor = "green";
  showTodoBox();
};

const showFormBtn = document.getElementById("show-form");
showFormBtn.addEventListener("click", () => {
  myForm.style.display = "flex";
  document.getElementById("show-form").style.pointerEvents = "none";
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

const setRemover = () => {
  const info = document.getElementById("info-card");
  const cancel = document.createElement("li");
  cancel.textContent = "X";
  cancel.style.color = "blue";
  cancel.style.borderRadius = "10px";
  cancel.style.border = "1px solid black";
  cancel.style.width = "15px";
  cancel.style.fontSize = "1.2rem";
  info.appendChild(cancel);

  cancel.onclick = () => {
    const moreInfo2 = document.getElementById("more-info");

    moreInfo2.style.pointerEvents = "all";
    document.getElementById("content").style.pointerEvents = "all";
    document.body.style.backgroundColor = "green";
    document.querySelector("header").style.background = "#f5b642";
    info.remove();
  };
  return cancel;
};

const moreInfo = document.getElementById("more-info");
moreInfo.addEventListener("click", () => {
  const infoCard = document.createElement("div");
  document.getElementById("content").appendChild(infoCard);
  infoCard.setAttribute("id", "info-card");
  const cancel = setRemover();
  const p = document.createElement("p");
  p.textContent =
    "You can add a todo to whatever project you've previously created using the selector (set on Project: Default). You can create your projects and todos, and both at the same time works! You can select any project and view all the todos you've created for it, you can remove todos and edit them.";

  infoCard.appendChild(p);
  document.getElementById("content").style.pointerEvents = "none";
  document.body.style.backgroundColor = "gray";
  document.querySelector("header").style.background = "gray";
  cancel.style.pointerEvents = "all";
});

setDate();

myForm.style.display = "none";

window.onload = () => {
  viewProject();
};
