class Todo {
  constructor(title, project, dueDate, description, uuid) {
    this.title = title;
    this.project = project;
    this.dueDate = dueDate;
    this.description = description;
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
