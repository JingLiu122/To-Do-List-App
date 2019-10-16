// Model
class Model {
  constructor(){
    this.list = [];
  }

  addElement(element){
    this.list.push(element);
    localStorage.setItem("todos", JSON.stringify([...this.list]));
  }

  removeElement(id){
    this.list = this.list.filter((ele) => {
      return ele.id !== id;
    });
  }

  getElement(id){
    return this.list.find((ele) => {
      return ele.id === id;
    });
  }

  getAllElements(){
    return this.list;
  }

  updateElement(element){
    this.list.forEach((item) => {
      if(item.id == element.id){
        item.value = element.value;
        item.status = element.status;
      }
    }); 
  }
}

export default Model;