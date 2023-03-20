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
  console.log(element.constructor.name);
  if (element.constructor.name === "Project") {
    console.log(element);
  } else if (element.constructor.name === "Todo") {
    console.log(element);
  }
}

function setStorage() {
  // how to use the local storage?
}

function useStorage(element) {
  if (!(Storage.length || element == null)) {
    populateStorage(element);
  } else {
    setStorage();
  }
}

function checkStorageAvailability(element = null) {
  if (storageAvailable("localStorage")) {
    // Yippee! We can use localStorage awesomeness
    useStorage(element);
  } else {
    // Too bad, no localStorage for us
    console.log("no storage :/");
  }
}

export default checkStorageAvailability;
