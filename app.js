import Model from './modules/Model.js';
import {domTemplate} from './modules/lib/utils.js';

const ToDoListsDOM = document.querySelector('#to-do-list-box');
const CompleteListsDOM = document.querySelector("#done-list-box");

// To add data to the left UI dom
const addData = () => {
  const data = document.getElementById("addListItem").value;
  if(data == ''){
    document.getElementById('addBtn').setAttribute('disabled', true);
    document.getElementById('addBtn').removeAttribute("disabled");
  }else{
    const node = domTemplate(data, '&#8594;', 'to-do-list-buttons');  // create a row node
    const first_child = document.getElementById('to-do-list-box').childNodes[0];
    ToDoListsDOM.insertBefore(node, first_child);
  }
  init();
}

// To render the inital list data (dummy data)
function listsDisplayListener() {
  lists.forEach((list, index) => {
    const node = domTemplate(list.todo, '&#8594;', 'to-do-list-buttons');
    ToDoListsDOM.appendChild(node);
  });
}

// A function to update the right UI
const updateDoneListsUI = (node) => {
  node.getElementsByTagName('button')[0].innerHTML = '&#8592;'; 
  const n = node.getElementsByClassName('grid-column')[1];
  n.setAttribute('id', 'done-list-buttons');
  const first_child = document.getElementById('done-list-box').childNodes[0];
  CompleteListsDOM.insertBefore(node, first_child);
  init();
}

// A function to update the left UI
const updateToDoListsUI = (node) => {
  node.getElementsByTagName('button')[0].innerHTML = '&#8594;';  // changed back the arrow button
  const n = node.getElementsByClassName('grid-column')[1];
  n.setAttribute('id', 'to-do-list-buttons');
  ToDoListsDOM.appendChild(node); 
  init();
}

// A listener function to listen the done button
const doneButtonsListener = () => {
  const data = document.querySelectorAll('#to-do-list-buttons');
  // console.log(data[0].childNodes[0]);
  Object.entries(data).forEach(([key, val]) => {    // ES6 to loop through an object
    val.childNodes[0].addEventListener('click', () => {
      // console.log(val.parentNode.innerText.split('\n')[0]);
      // updateData(val.parentNode, val.parentNode.innerText.split('\n')[0]);
      updateDoneListsUI(val.parentNode);
    });
  });
}

// A listener function to listen the undone button
const undoneButtonsListener = () => {
  const data = document.querySelectorAll('#done-list-buttons');
  Object.entries(data).forEach(([key, val]) => {    
    val.childNodes[0].addEventListener('click', () => {
      // updateData(val.parentNode, val.parentNode.innerText.split('\n')[0]);
      updateToDoListsUI(val.parentNode);
    });
  });
}

// A listener function to keep listening delete buttons
// const deleteButtonsListener = () => {
//   const data = document.getElementsByTagName('INPUT');
//   Object.entries(data).forEach(([key, val]) => {    
//     if(val.getAttribute('type') === 'checkbox'){
//       val.addEventListener('click', () => {
//         const parent = val.parentNode.parentNode;
//         console.log('Row: ' + parent.innerText.split('\n')[0] + ', delete button has been clicked!');
//         parent.remove();
//       });
//     }
//   });
// }

/*============================================================================================================
An initial event for the browser to finish reading and loading all HTMLs into the DOM first, and then 
perform other events.
============================================================================================================*/
// document.addEventListener('DOMContentLoaded', init); 
// listsDisplayListener();
// function init(){
//   doneButtonsListener();
//   undoneButtonsListener();
//   deleteButtonsListener();
//   document.getElementById("addBtn").addEventListener("click", addData);
// }

const model = new Model();

// controller
document.getElementById('addBtn').addEventListener('click', () => {
  let value = document.getElementById('addListItem').value;
  if(value != ''){
    const node = {
      id: value,
      value: value,
      status: 'todo',
    }
    model.addElement(node);
    // console.log(model.getAllElements());
    updateDisplay(model.getAllElements());
  }
});


// handlers
function updateDisplay(data){
  const todoListBox = document.getElementById('to-do-list-box');
  const doneListBox = document.getElementById('done-list-box');
  todoListBox.innerHTML = '';
  doneListBox.innerHTML = '';

  // let element = data[data.length-1];
  if(data.length > 0){ 
    todoListBox.className = "border";
    doneListBox.className = 'border';
  }

  data.forEach((element, index) => {
    if(element.status == 'todo'){
      const rowNode = domTemplate(element, '&#8594;', deleteHandler, moveHandler);
      todoListBox.insertBefore(rowNode, todoListBox.firstElementChild);
    }else{
      const rowNode = domTemplate(element, '&#8592;', deleteHandler, moveHandler);
      doneListBox.appendChild(rowNode);
    }
  });
}

// A delete handler function to remove element
function deleteHandler(id){
  // console.log('Row: ' + e.target.dataset.id + ', delete button has been clicked!');
  model.removeElement(id);
  updateDisplay(model.getAllElements()); 
}

// A move button handler function to move element to other box
function moveHandler(id){
  const element = model.getElement(id);
  if(element.status === 'todo'){
    element.status = 'done';
  }else{
    element.status = 'todo';
  }
  
  model.updateElement(element);
  updateDisplay(model.getAllElements());
}


