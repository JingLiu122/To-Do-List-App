// Model
class Model {
  constructor(){
    this.list = [];
  }

  addElement(element){
    this.list.push(element);
  }

  removeElement(id){
    this.list = this.list.filter((ele) => {
      return ele.id !== id;
    });
  }

  getAllElements(){
    return this.list;
  }
}

export default Model;