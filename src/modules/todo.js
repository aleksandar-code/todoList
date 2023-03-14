class Todo {
  constructor(title, project) {
    this.title = title;
    this.project = project;
  }
}

const createTodo = (title, project) => {
  const todo = new Todo(title, project);
  return todo;
};

const modify = "dummy";
export { createTodo, modify };
