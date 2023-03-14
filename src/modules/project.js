import * as todoModel from "./todo";

class Project {
  constructor(title) {
    this.title = title;
    this.todoList = [];
  }

  createTodo(title, project) {
    this.appendTodo(todoModel.createTodo(title, project));
  }

  appendTodo(todo) {
    this.todoList.push(todo);
  }

  getList() {
    return this.todoList;
  }
}

const defaultProject = new Project("Default");

export default defaultProject;
