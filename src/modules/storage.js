function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function populateStorage(element) {
  localStorage.setItem("Todolist", JSON.stringify(element));
  // const projects = element.projectList;

  // projects.forEach((project, index) => {
  //   const value = JSON.stringify(project);
  //   const key = JSON.stringify(index);
  //   localStorage.setItem(key, value);
  //   const todos = project.todoList;
  //   todos.forEach((todo, todoIndex) => {
  //     const valueTodo = JSON.stringify(todo);
  //     const keyTodo = JSON.stringify(todoIndex);
  //     localStorage.setItem(keyTodo, valueTodo);
  //   });
  // });
}

function setStorage() {
  // how to use the local storage?

  const item = localStorage.getItem("Todolist");
  return item;
}

function storageType(element = null) {
  let toReturn;
  if (!(Storage.length || element == null)) {
    populateStorage(element);
  } else {
    toReturn = setStorage();
  }
  return toReturn;
}

function checkStorageAvailability() {
  if (storageAvailable("localStorage") === true) {
    return true;
  }
  return false;
}

export { checkStorageAvailability, storageType };

// add edit manipulations to the modules and do not do them in index.js
// decide how to change the data in storage and how to store it
