class Todo {
  constructor(title) {
    this.title = title;
  }
}

const createTodo = (title) => {
  const todo = new Todo(title);
  return todo;
};

export default createTodo;
