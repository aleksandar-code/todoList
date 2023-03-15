// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from "nanoid";
import Project from "./project";

class Todolist {
  constructor() {
    this.projectList = [];
  }

  createProject(title) {
    const project = new Project(title, nanoid());
    this.appendProject(project);
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
TodoList.createProject("Default");
export default TodoList;
