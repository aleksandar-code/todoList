class Todo {
  constructor(title, project) {
    this.title = title;
    this.project = project;
  }
}

const createTodo = (title, project) => {
  const todo = new Todo(title, project);
  console.log(todo);
  return todo;
};
export { createTodo };
