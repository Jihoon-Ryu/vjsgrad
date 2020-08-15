//🔴🔴🔴🔴🔴Def🔴🔴🔴🔴🔴
const inputParent = document.querySelector(".js-toDoForm");
const input2 = inputParent.querySelector(".input2");
const pending = document.querySelector(".js-toDoList");
const finished = document.querySelector(".js-finList");
let pendingSet = [];
let finishedSet = [];

//🔴🔴🔴🔴🔴(5)Refresh, remain on screen🔴🔴🔴🔴🔴

function loadPending() {
  const loadedPending = localStorage.getItem("Pending");
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(regainPending);
  }
}

function regainPending(toDo) {
  showUpPending(toDo.text);
}

function loadFinished() {
  const loadedFinished = localStorage.getItem("Finished");
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(regainFinished);
  }
}

function regainFinished(toDo) {
  showUpFinished(toDo.text);
}

function showUpFinished(inputValue) {
  const liFin = document.createElement("li");
  liFin.classList.add("liFin");
  finished.appendChild(liFin);
  const spanFin = document.createElement("span");
  spanFin.classList.add("spanFin");
  spanFin.innerText = inputValue;
  liFin.appendChild(spanFin);
  const returnBtnFin = document.createElement("button");
  returnBtnFin.classList.add("returnBtnFin");
  liFin.appendChild(returnBtnFin);
  returnBtnFin.innerText = "Return";
  returnBtnFin.addEventListener("click", clickReturn);
  const delBtnFin = document.createElement("button");
  delBtnFin.classList.add("delBtnFin");
  delBtnFin.innerText = "X";
  delBtnFin.addEventListener("click", clickDelFin);
  liFin.appendChild(delBtnFin);
  //ID number
  const finIDnumber = finishedSet.length + 1;
  liFin.id = finIDnumber;
  const finishedSetEle = {
    text: inputValue,
    id: finIDnumber,
  };
  finishedSet.push(finishedSetEle);
  saveFinished();
}

//🔴🔴🔴🔴🔴(4)Finished->Pending & Finished->delete🔴🔴🔴🔴🔴
function clickReturn() {
  //delete from finished
  const liFinToRemove = event.target.parentNode;
  finished.removeChild(liFinToRemove);
  const finishedSetLeft = finishedSet.filter(condtnSurviveFin);
  console.log(finishedSetLeft);
  finishedSet = finishedSetLeft;
  saveFinished();
  //add to pending
  //li span pending
  const spanFin = liFinToRemove.querySelector(".spanFin");
  const liPend = document.createElement("li");
  pending.appendChild(liPend);
  const spanPend = document.createElement("span");
  liPend.appendChild(spanPend);
  spanPend.classList.add("spanPend");
  spanPend.innerText = spanFin.innerText;
  //finished btn pending
  const finBtnPend = document.createElement("button");
  finBtnPend.classList.add("finBtnPend");
  liPend.appendChild(finBtnPend);
  finBtnPend.innerText = "Done";
  finBtnPend.addEventListener("click", clickFin);
  //delete btn pending
  const delBtnPend = document.createElement("button");
  delBtnPend.classList.add("delBtnPend");
  liPend.appendChild(delBtnPend);
  delBtnPend.innerText = "X";
  delBtnPend.addEventListener("click", clickDelPend);
  //IDnumber, Save
  const pendIDnumber = pendingSet.length + 1;
  liPend.id = pendIDnumber;
  const pendingSetEle = {
    text: spanFin.innerText,
    id: pendIDnumber,
  };
  pendingSet.push(pendingSetEle);
  savePending();
}

function condtnSurviveFin(survive) {
  const liFinToRemove = event.target.parentNode;
  return survive.id !== JSON.parse(liFinToRemove.id);
}

//🔴🔴🔴🔴🔴(3)Pending->Finished & Pending->delete🔴🔴🔴🔴🔴

function clickFin() {
  //delete from pending : same as (2)
  const liPendToRemove = event.target.parentNode;
  pending.removeChild(liPendToRemove);
  const pendingSetLeft = pendingSet.filter(condtnSurvivePend);
  console.log(pendingSetLeft);
  pendingSet = pendingSetLeft;
  savePending();

  //add to Finished
  //li, span Fin
  const spanPend = liPendToRemove.querySelector(".spanPend");
  const liFin = document.createElement("li");
  finished.appendChild(liFin);
  const spanFin = document.createElement("span");
  liFin.appendChild(spanFin);
  spanFin.classList.add("spanFin");
  spanFin.innerText = spanPend.innerText;
  //return btn Fin
  const returnBtnFin = document.createElement("button");
  returnBtnFin.classList.add("returnBtnFin");
  liFin.appendChild(returnBtnFin);
  returnBtnFin.innerText = "Return";
  returnBtnFin.addEventListener("click", clickReturn);
  //delete btn Fin
  const delBtnFin = document.createElement("button");
  delBtnFin.classList.add("delBtnFin");
  liFin.appendChild(delBtnFin);
  delBtnFin.innerText = "X";
  delBtnFin.addEventListener("click", clickDelFin);
  //IDnumber, Save
  const finIDnumber = finishedSet.length + 1;
  liFin.id = finIDnumber;
  const finishedSetEle = {
    text: spanPend.innerText,
    id: finIDnumber,
  };
  //saveLS
  finishedSet.push(finishedSetEle);
  saveFinished();
}

function saveFinished() {
  localStorage.setItem("Finished", JSON.stringify(finishedSet));
}

function clickDelFin() {
  const liFinToRemove = event.target.parentNode;
  finished.removeChild(liFinToRemove);
  const finishedSetLeft = finishedSet.filter(condtnSurviveFin);
  //console.log(pendingSetLeft);
  finishedSet = finishedSetLeft;
  saveFinished();
}

//🔴🔴🔴🔴🔴(2)Pending->Delete🔴🔴🔴🔴🔴
function clickDelPend(event) {
  const liPendToRemove = event.target.parentNode;
  pending.removeChild(liPendToRemove);
  const pendingSetLeft = pendingSet.filter(condtnSurvivePend);
  //console.log(pendingSetLeft);
  pendingSet = pendingSetLeft;
  savePending();
}

function condtnSurvivePend(survive) {
  const liPendToRemove = event.target.parentNode;
  return survive.id !== JSON.parse(liPendToRemove.id);
}

//🔴🔴🔴🔴🔴(1)Submit-ShowupPending-SaveLS🔴🔴🔴🔴🔴
function savePending() {
  localStorage.setItem("Pending", JSON.stringify(pendingSet));
}

function showUpPending(inputValue) {
  //Def

  /*ul pending
    li 
     span
     delBtn */

  const liPend = document.createElement("li");
  liPend.classList.add("liPend");
  pending.appendChild(liPend);
  const spanPend = document.createElement("span");
  spanPend.classList.add("spanPend");
  spanPend.innerText = inputValue;
  liPend.appendChild(spanPend);
  const finBtnPend = document.createElement("button");
  finBtnPend.classList.add("finBtnPend");
  finBtnPend.innerText = "Done";
  finBtnPend.addEventListener("click", clickFin);
  liPend.appendChild(finBtnPend);
  const delBtnPend = document.createElement("button");
  delBtnPend.classList.add("delBtnPend");
  delBtnPend.innerText = "X";
  delBtnPend.addEventListener("click", clickDelPend);
  liPend.appendChild(delBtnPend);
  //ID number
  const pendIDnumber = pendingSet.length + 1;
  liPend.id = pendIDnumber;
  const pendingSetEle = {
    text: inputValue,
    id: pendIDnumber,
  };
  //saveLS
  pendingSet.push(pendingSetEle);
  savePending();
}

function handleSubmit(event) {
  event.preventDefault();
  showUpPending(input2.value);
  input2.value = "";
}

//🔴🔴🔴🔴🔴(1)Submit-showUpPending-SaveLS🔴🔴🔴🔴🔴

function init() {
  inputParent.addEventListener("submit", handleSubmit);
  loadPending();
  loadFinished();
}

init();
