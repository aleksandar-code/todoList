class Todo {
  constructor(title, project, uuid) {
    this.title = title;
    this.project = project;
    this.uuid = uuid;
  }

  getUuid() {
    return this.uuid;
  }

  getTitle() {
    return this.title;
  }
}

export default Todo;
