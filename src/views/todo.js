const todoForm = () => {
  const formContainer = document.createElement("div");
  const form = document.createElement("form");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const submitBtn = document.createElement("button");
  const content = document.getElementById("content");
  formContainer.setAttribute("class", "form-container");
  titleLabel.for = "title";
  titleLabel.textContent = "Title";
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  submitBtn.type = "submit";
  submitBtn.textContent = "Create todo";
  form.append(titleLabel, titleInput, submitBtn);
  formContainer.appendChild(form);
  content.appendChild(formContainer);
};

const displayTodo = (todo) => {
  const todoContainer = document.createElement("div");
  todoContainer.innerHTML = `Project: ${todo.project.title} Todo: ${todo.title}`;
  const content = document.getElementById("content");
  content.appendChild(todoContainer);
};
export { todoForm, displayTodo };
