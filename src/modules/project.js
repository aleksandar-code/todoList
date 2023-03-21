// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from "nanoid";
import Todo from "./todo";
// eslint-disable-next-line import/no-cycle
import TodoList from "./todolist";
import { checkStorageAvailability, storageType } from "./storage";

class Project {
  constructor(title, uuid) {
    this.title = title;
    this.todoList = [];
    this.uuid = uuid;
  }

  // add edit manipulation here

  createTodo(title, dueDate, description, priority) {
    const projectName = this.title;
    const myTodo = new Todo(
      title,
      projectName,
      dueDate,
      description,
      priority,
      nanoid()
    );
    this.appendTodo(myTodo);

    // store
    if (checkStorageAvailability() === true) {
      storageType.call(this, TodoList);
    }
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
