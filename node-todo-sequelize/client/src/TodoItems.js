import React, { Component } from "react";
 
class TodoItems extends Component {
 /* createTasks(item) {
    return <li key={item.id}>{item.title}</li>
  } */
  
  constructor(props)
  {
	  super(props);
	  this.delete = this.delete.bind(this);
  }
  
  delete(key) 
  {
    this.props.delete(key);
  }
  
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(todo => <li onClick={() => this.delete(todo.id)} key={todo.id}>{todo.title}</li>);
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};
 
export default TodoItems;