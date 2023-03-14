import Todo from "./todo";

class Project {
  constructor(title, index) {
    this.title = title;
    this.todoList = [];
    this.index = index;
  }

  createTodo(title) {
    const index = this.todoList.length;
    const projectName = this.title;
    this.appendTodo(new Todo(title, projectName, index));
  }

  removeTodo(index) {
    console.log(this.todoList.at(index));
    this.todoList.splice(index, 1);
  }

  appendTodo(todo) {
    this.todoList.push(todo);
  }

  getTodoList() {
    return this.todoList;
  }
}

export default Project;
