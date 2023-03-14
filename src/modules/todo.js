class Todo {
  constructor(title, project, index) {
    this.title = title;
    this.project = project;
    this.index = index;
  }

  getIndex() {
    return this.index;
  }

  getTitle() {
    return this.title;
  }
}

export default Todo;
