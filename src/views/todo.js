const todoView = () => {
  const text = document.createElement("div");
  text.textContent = "hi";
  const content = document.getElementById("content");
  content.appendChild(text);
};
export default todoView;
