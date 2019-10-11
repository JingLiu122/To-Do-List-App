import Model from './modules/Model.js';
import {domTemplate} from './modules/lib/utils.js';

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


