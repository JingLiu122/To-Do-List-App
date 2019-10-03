const lists = [
  {todo: '100 push-ups'},
  {todo: '100 sit-ups'},
  {todo: '100 squats'},
  {todo: '10km running'}
];
const done_lists = [{}];

const ToDoListsDOM = document.querySelector('#to-do-list-box');
const CompleteListsDOM = document.querySelector("#done-list-box");

// add data to the lists array of objects.
const addData = () => {
  const data = document.getElementById("addListItem").value;
  // let list = {
  //   todo: data,
  // };
  // lists.push(list);
  // document.getElementById("addListItem").value = "";

  const node = domTemplate(data, '&#8594;', '#to-do-list-buttons');
  const first_child = document.getElementById('to-do-list-box').childNodes[0];
  ToDoListsDOM.insertBefore(node, first_child);
}

// remove data from the lists based on the clicked checkbox button
const removeData = (ev) => {
  const id = ev.target.id;
  const index = parseInt(id.charAt(id.length-1))-1;
  lists.splice(index, 1);
  
  init();
}

const updateData = (node, value) => {
  if(node.parentNode.id == 'to-do-list-box'){
    // append the clicked-row-value to the done-lists
    if(Object.keys(done_lists[0]).length == 0){
      done_lists[0][value] = value;
    }else{
      const temp = {
        [value]: value,
      }
      done_lists.push(temp);
    }
    // remove an element based on object property
    lists.forEach((list, index) => {
      if(list.todo == value){
        lists.splice(index, 1);
      }
    });
    updateDoneListsUI(value);
  }else{
    let list = {
      todo: value,
    };
    lists.push(list);
    updateToDoListsUI(node);
  }

  document.getElementById('to-do-list-buttons').removeEventListener('click', updateData);
  document.getElementById('done-list-buttons').removeEventListener('click', updateData);
  init();
}

function listsDisplayListener() {
  lists.forEach((list, index) => {
    const node = domTemplate(list.todo, '&#8594;', '#to-do-list-buttons');
    ToDoListsDOM.appendChild(node);
  });
}

const updateDoneListsUI = (value) => {
  // console.log(CompleteListsDOM);
  if(Object.keys(done_lists[0]).length !== 0){
    // create row node
    const row_node = document.createElement('DIV');
    row_node.setAttribute("class", "grid-row");

    // create col1 node
    const col_node1 = document.createElement('DIV');
    col_node1.setAttribute('class', 'grid-column');
    // const text_node = document.createTextNode(done_lists[0][Object.keys(done_lists[0])]);
    const text_node = document.createTextNode(value);
    col_node1.appendChild(text_node);

    // create col2 node
    const col_node2 = document.createElement('DIV');
    col_node2.setAttribute('class', 'grid-column');
    col_node2.setAttribute('id', 'done-list-buttons');
  
    const moveBtn = document.createElement('BUTTON');
    moveBtn.setAttribute('type', 'submit');
    moveBtn.innerHTML = '&#8592;';
    
    const delBtn = document.createElement('INPUT');
    delBtn.setAttribute('type', 'checkbox');
    delBtn.setAttribute('id', 'delBtn');

    col_node2.appendChild(moveBtn);
    col_node2.appendChild(delBtn);
    // end of col2 node

    row_node.appendChild(col_node1);
    row_node.appendChild(col_node2);
    CompleteListsDOM.appendChild(row_node);
  }
}

const updateToDoListsUI = (node) => {
  node.getElementsByTagName('button')[0].innerHTML = '&#8594;';  // changed back the arrow button
  ToDoListsDOM.appendChild(node); 
}

const doneButtonsListener = () => {
  const data = document.querySelectorAll('#to-do-list-buttons');
  Object.entries(data).forEach(([key, val]) => {    // ES6 to loop through an object
    val.addEventListener('click', () => {
      // console.log(val.parentNode.innerText.split('\n')[0]);
      updateData(val.parentNode, val.parentNode.innerText.split('\n')[0]);
    });
  });
}

const undoneButtonsListener = () => {
  const data = document.querySelectorAll('#done-list-buttons');
  Object.entries(data).forEach(([key, val]) => {    
    val.addEventListener('click', () => {
      updateData(val.parentNode, val.parentNode.innerText.split('\n')[0]);
    });
  });
}

// this function is getting all the checkbox ids,
// and then make an event listener to listen all checkbox clicks
function getCheckBoxIDs() {
  const tags = document.getElementsByTagName('INPUT');  // an object
  const btnIDs = [];
  for(let i = 0; i < tags.length; i++){
    if(tags[i].getAttribute('type') === 'checkbox'){
      btnIDs.push(tags[i].id);   
    }
  }

  // btnIDs.forEach((id, index) => {
  //   document.getElementById(id).addEventListener('click', removeData);
  // });
}

// to generate a node
const domTemplate = (value, btn_value, container_id) => {
  // create row node
  const row_node = document.createElement('DIV');
  row_node.setAttribute("class", "grid-row");

  // create col1 node
  const col_node1 = document.createElement('DIV');
  col_node1.setAttribute('class', 'grid-column');
  // const text_node = document.createTextNode(done_lists[0][Object.keys(done_lists[0])]);
  const text_node = document.createTextNode(value);
  col_node1.appendChild(text_node);

  // create col2 node
  const col_node2 = document.createElement('DIV');
  col_node2.setAttribute('class', 'grid-column');
  col_node2.setAttribute('id', container_id);

  const moveBtn = document.createElement('BUTTON');
  moveBtn.setAttribute('type', 'submit');
  moveBtn.innerHTML = btn_value;
  
  const delBtn = document.createElement('INPUT');
  delBtn.setAttribute('type', 'checkbox');

  col_node2.appendChild(moveBtn);
  col_node2.appendChild(delBtn);
  // end of col2 node

  row_node.appendChild(col_node1);
  row_node.appendChild(col_node2);

  return row_node;
}

/*============================================================================================================
An initial event for the browser to finish reading and loading all HTMLs into the DOM first, and then 
perform other events.
============================================================================================================*/
document.addEventListener('DOMContentLoaded', init);  
function init(){
  listsDisplayListener();
  document.getElementById("addBtn").addEventListener("click", addData);
  doneButtonsListener();
  undoneButtonsListener();
  getCheckBoxIDs();
}









// let rowTemplate = '', columnTemplate = '';
// const row_doms = document.querySelector("#done-list-box").querySelectorAll('.grid-row');
// // Object.entries(row_doms).forEach(([key, val]) => {
// //   console.log(key, val);
// // });
// if(done_lists.length > 1){
//   // do the condition rendering here
//   done_lists.forEach((list, index) => {
//     // if(row_doms[index-1].innerText == list[Object.keys(list)]){
//     //   console.log('yea they are the same');
//     // }
//     // if(index > 0){
//       rowTemplate += '<div class="grid-row">';
//       columnTemplate += '<div class="grid-column">' + list[Object.keys(list)] + '</div>';  
//       columnTemplate += '<div class="grid-column" id="to-do-list-buttons">' + 
//       '<button type="submit" >&#8593;</button>' +
//       '<input type="checkbox" id="delBtn' + (index+1) + '">' + '</div>';
//       rowTemplate += columnTemplate;
//       rowTemplate += "</div>";       
    
//   });
// }

// document.getElementById("done-list-box").innerHTML = rowTemplate;

 