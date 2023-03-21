// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from "nanoid";
// eslint-disable-next-line import/no-cycle
import Project from "./project";
import Todo from "./todo";
// import { checkStorageAvailability, storageType } from "./storage";

class Todolist {
  constructor() {
    this.projectList = [];
  }

  // add edit manipulation here

  createProject(title) {
    const project = new Project(title, nanoid());
    this.appendProject(project);
  }

  setStorage(todolist) {
    this.projectList = [];
    console.log(JSON.parse(todolist));
    const projects = JSON.parse(todolist);
    projects.projectList.forEach((element) => {
      const newProject = Object.assign(new Project(), element);
      this.projectList.push(newProject);
    });

    console.log(this.projectList);

    this.projectList.forEach((element) => {
      if (!(element.TodoList === undefined)) {
        element.TodoList.forEach((todo) => {
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
}

const TodoList = new Todolist();
// TodoList.createProject("Default");
const defaultProject = new Project("Default", "Default");
TodoList.appendProject(defaultProject);
export default TodoList;
