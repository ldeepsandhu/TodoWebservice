import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css"
 
class App extends Component {
	
  state = { todos : [] };
  constructor(props)
  {
	  super(props);
	  this.addTodo = this.addTodo.bind(this);
	  this.deleteItem = this.deleteItem.bind(this);
  }
  
  componentDidMount() {
    fetch('/api/todos')
      .then(res => res.json())
      .then(todosNew => this.setState({ todos: todosNew }));
  }
  
  
  addTodo(e)
  {
	const data = new FormData(e.target);
    fetch('/api/todos', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    title: data.get("title"),
    })
   })
   fetch('/api/todos')
      .then(res => res.json())
      .then(todosNew => this.setState({ todos: todosNew })); 
  }
  
  
  deleteItem(todoid)
  {
	  fetch('/api/todos/' +todoid+ '/delete');
	  fetch('/api/todos')
      .then(res => res.json())
      .then(todosNew => this.setState({ todos: todosNew }));
  }
  
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit = {this.addTodo}>
            <input placeholder="enter task" name = "title">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
       <TodoItems entries={this.state.todos}
	              delete={this.deleteItem}/>
      </div>
    );
  }
}
 


export default App;
