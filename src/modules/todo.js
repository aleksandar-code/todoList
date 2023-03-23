class Todo {
  constructor(title, projectUuid, dueDate, description, priority, uuid) {
    this.title = title;
    this.projectUuid = projectUuid;
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
