// A utility function to generate a dom node
export function domTemplate(element, btn_value, deleteHandler, moveHandler){
  // create row node
  const row_node = document.createElement('DIV');
  row_node.setAttribute("class", "grid-row");

  // create col1 node
  const col_node1 = document.createElement('DIV');
  col_node1.setAttribute('class', 'grid-column');
  // const text_node = document.createTextNode(done_lists[0][Object.keys(done_lists[0])]);
  const text_node = document.createTextNode(element.value);
  col_node1.appendChild(text_node);

  // create col2 node
  const col_node2 = document.createElement('DIV');
  col_node2.setAttribute('class', 'grid-column');

  const moveBtn = document.createElement('BUTTON');
  moveBtn.setAttribute('type', 'submit');
  moveBtn.innerHTML = btn_value;
  moveBtn.dataset.id = element.id;
  moveBtn.addEventListener('click', (e) => {
    moveHandler(e.target.dataset.id);
  });
  
  const delBtn = document.createElement('INPUT');
  delBtn.setAttribute('class', 'delete');
  delBtn.setAttribute('type', 'checkbox');
  delBtn.dataset.id = element.id;
  delBtn.addEventListener('click', (e) => {
    deleteHandler(e.target.dataset.id);
  });

  col_node2.appendChild(moveBtn);
  col_node2.appendChild(delBtn);
  // end of col2 node

  row_node.appendChild(col_node1);
  row_node.appendChild(col_node2);

  return row_node;
}