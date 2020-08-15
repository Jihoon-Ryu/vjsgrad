const toDoform = document.querySelector(".js-toDoForm");
const toDoInput = toDoform.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
let toDos = [];

function filterFn(toDo) {
  const li = event.target.parentNode;
  return toDo.id !== parseInt(li.id);
}

function deleteToDo(event) {
  const li = event.target.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(filterFn);
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  const newId = toDos.length + 1;
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  paintToDo(toDoInput.value);
  toDoInput.value = "";
}

function something(toDo) {
  paintToDo(toDo.text);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(something);
  } else {
  }
}

function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}

init();
