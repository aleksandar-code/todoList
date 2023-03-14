import Project from "./project";

class Todolist {
  constructor() {
    this.projectList = [];
  }

  createProject(title) {
    const index = this.projectList.length;
    this.appendProject(new Project(title, index));
  }

  removeProject(index) {
    this.projectList.splice(index, 1);
  }

  appendProject(project) {
    this.projectList.push(project);
  }

  getProjectList() {
    return this.projectList;
  }

  getProjectWithIndex(index) {
    return this.projectList[index];
  }
}

const TodoList = new Todolist();
TodoList.createProject("Default");
export default TodoList;
