import Model from './modules/Model.js';
import {domTemplate} from './modules/lib/utils.js';

// const lists = [
//   {todo: '100 push-ups'},
//   {todo: '100 sit-ups'},
//   {todo: '100 squats'},
//   {todo: '10km running'},
//   {todo: 'Read Eloquent JavaScript'}
// ];

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

let model = new Model();

function updateDisplay(data){
  const todoListBox = document.getElementById('to-do-list-box');
  todoListBox.innerHTML = '';
  // let element = data[data.length-1];
  if(data.length > 0){ 
    todoListBox.className = "border";
  }
  data.forEach((element, index) => {
    const rowNode = domTemplate(element, '&#8594;', deleteHandler);
    todoListBox.insertBefore(rowNode, todoListBox.firstElementChild);
  });
}

function deleteHandler(id){
  // console.log('Row: ' + e.target.dataset.id + ', delete button has been clicked!');
  // model.removeElement(element.id);
  // console.log(model.getAllElements());
  // row_node.remove();
  model.removeElement(id);
  updateDisplay(model.getAllElements()); 
}

// A listener function to keep listening delete buttons
function deleteButtonListener(){
  const gridRowBox = document.querySelector('.grid-row');
  if(gridRowBox){
    // listen delete buttons
    let deleteButtons = document.querySelectorAll('.delete');
    Object.entries(deleteButtons).forEach(([key, val]) => {
      val.addEventListener('click', () => {
        let rowNode = val.parentNode.parentNode;
        let rowId = rowNode.firstElementChild.innerText;
        console.log('Row: ' + rowId + ', delete button has been clicked!');
        model.removeElement(rowId);
        rowNode.remove();
        return ;
        // parent.innerText.split('\n')[0]
      });
    });
  }
}

// controller
document.getElementById('addBtn').addEventListener('click', () => {
  let value = document.getElementById('addListItem').value;
  if(value != ''){
    const node = {
      id: value,
      value: value
    }
    model.addElement(node);
    // console.log(model.getAllElements());
    updateDisplay(model.getAllElements());
  }
});



