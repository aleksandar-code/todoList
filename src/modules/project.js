import * as todoModel from "./todo";

class Project {
  constructor(title) {
    this.title = title;
    this.todoList = [];
  }

  createTodo(title, project) {
    this.appendTodo(todoModel.createTodo(title, project));
  }

  removeTodo(index) {
    console.log(this.todoList.at(index));
    this.todoList.splice(index, 1);
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
