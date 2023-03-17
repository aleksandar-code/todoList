class Todo {
  constructor(title, project, dueDate, description, priority, uuid) {
    this.title = title;
    this.project = project;
    this.dueDate = dueDate;
    this.description = description;
    this.priority = priority;
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
