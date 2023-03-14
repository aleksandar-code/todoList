import "./index.css";
// import projectModule from "./modules/project";

const formIsComplete = () => {
  const formTitle = document.getElementById("title");
  if (formTitle.value === "") {
    console.log("empty title");
    return false;
  }
  return true;
};
const submitButton = document.querySelector("button[type=submit]");
submitButton.addEventListener("click", () => {
  if (formIsComplete() === true) {
    console.log("create todo");
  }
});
