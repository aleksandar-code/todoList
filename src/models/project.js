class Project {
  constructor(title) {
    this.title = title;
    this.todoList = [];
  }

  appendTodo(todo) {
    this.todoList.push(todo);
  }

  showList() {
    return this.todoList;
  }
}

const defaultProject = new Project("Default");
export default defaultProject;
