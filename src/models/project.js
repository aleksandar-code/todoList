export default class Project {
  constructor(title) {
    this.title = title;
  }

  appendTodo(todo) {
    this.todoList.push(todo);
  }
}
