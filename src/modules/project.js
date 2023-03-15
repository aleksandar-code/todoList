// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from "nanoid";
import Todo from "./todo";

class Project {
  constructor(title, uuid) {
    this.title = title;
    this.todoList = [];
    this.uuid = uuid;
  }

  createTodo(title, dueDate, description) {
    const projectName = this.title;
    this.appendTodo(
      new Todo(title, projectName, dueDate, description, nanoid())
    );
  }

  removeTodo(uuid) {
    this.todoList.forEach((todo, index) => {
      if (todo.getUuid() === uuid) {
        this.todoList.splice(index, 1);
      }
    });
  }

  appendTodo(todo) {
    this.todoList.push(todo);
  }

  getTodoList() {
    return this.todoList;
  }

  getTodoWithUuid(uuid) {
    let result;
    this.todoList.forEach((todo, index) => {
      if (todo.getUuid() === uuid) {
        result = this.todoList[index];
      }
    });
    return result;
  }

  getUuid() {
    return this.uuid;
  }
}

export default Project;
