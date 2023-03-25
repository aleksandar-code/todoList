// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from "nanoid";
import Project from "./project";
import Todo from "./todo";

class Todolist {
  constructor() {
    this.projectList = [];
  }

  createProject(title) {
    const project = new Project(title, nanoid());
    this.appendProject(project);
  }

  setStorage(todolist) {
    this.projectList = [];
    const projects = JSON.parse(todolist);
    projects.projectList.forEach((element) => {
      const newProject = Object.assign(new Project(), element);
      this.projectList.push(newProject);
    });

    this.projectList.forEach((element) => {
      if (!(element.todoList === undefined)) {
        const todos = element.todoList;
        element.emptyTodoList();
        todos.forEach((todo) => {
          const newTodo = Object.assign(new Todo(), todo);
          element.appendTodo(newTodo);
        });
      }
    });
  }

  removeProject(uuid) {
    this.projectList.forEach((project, index) => {
      if (project.getUuid() === uuid) {
        this.projectList.splice(index, 1);
      }
    });
  }

  appendProject(project) {
    this.projectList.push(project);
  }

  getProjectList() {
    return this.projectList;
  }

  getProjectWithUuid(uuid) {
    let result = this.projectList[0].getUuid();
    let i;
    for (i = 0; i < this.projectList.length; i += 1) {
      if (this.projectList[i].getUuid() === uuid) {
        result = this.projectList[i];
      }
    }
    return result;
  }

  getTodoWithUuid(uuid) {
    const array = this.projectList;
    let result;
    array.forEach((project) => {
      const todos = project.todoList;
      todos.forEach((todo) => {
        if (todo.uuid === uuid) {
          result = todo;
        }
      });
    });
    return result;
  }
}

const TodoList = new Todolist();
const defaultProject = new Project("Default", "Default");
TodoList.appendProject(defaultProject);
export default TodoList;
