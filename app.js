const STATUS = ['Started', 'Holding', 'Finished', 'Incomplete'];

const lists = [
  {todo: '100 push-ups', status: STATUS[2]},
  {todo: '100 sit-ups', status: STATUS[0]},
  {todo: '100 squats', status: STATUS[1]},
  {todo: '10km running', status: STATUS[3]}
];

// add data to the lists array of objects.
const addData = () => {
  const data = document.getElementById("addListItem").value;
  let list = {
    todo: data,
    status: STATUS[0],
  };
  lists.push(list);
  document.getElementById("addListItem").value = "";
  
  init();
}

// remove data from the lists based on the clicked checkbox button
const removeData = (ev) => {
  const id = ev.target.id;
  const index = parseInt(id.charAt(id.length-1))-1;
  lists.splice(index, 1);
  
  init();
}

const updateData = (value) => {
 console.log(value);
}

// A listener function to display lists to the HTML DOM once user clicks a display button
function listsDisplayListener() {
  let rowTemplate = '';
  let columnTemplate = '';

  lists.forEach((list, i) => {
    let col = 0;
    columnTemplate = '';

    rowTemplate += '<div class="grid-row" id="row' + (i+1) + '">';
    columnTemplate += '<div class="grid-column" id="col' + (col+1) + '">' + list.todo + '</div>';  
    columnTemplate += '<div class="grid-column" id="col' + (col+2) + '">' + list.status + '</div>';
    columnTemplate += '<div class="grid-column" id="col' + (col+3) + '">' + 
    '<input type="checkbox" id="delBtn' + (i+1) + '">' + '</div>';
    rowTemplate += columnTemplate;
    rowTemplate += "</div>";
  });
  document.getElementById("box1").innerHTML = rowTemplate;
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

  btnIDs.forEach((id, index) => {
    document.getElementById(id).addEventListener('click', removeData);
  });
}

/*============================================================================================================
An initial event for the browser to finish reading and loading all HTMLs into the DOM first, and then 
perform the other events.
============================================================================================================*/
document.addEventListener('DOMContentLoaded', init);  
function init(){
  listsDisplayListener();
  document.getElementById("addBtn").addEventListener("click", addData);
  // document.getElementById("refreshBtn").addEventListener("click", listsDisplayListener);
  getCheckBoxIDs();
}
