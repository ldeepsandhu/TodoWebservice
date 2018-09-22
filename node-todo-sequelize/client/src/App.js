import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {todos: [], todoItem: ''}
  
  constructor(props)
  {
	  super(props);
	   this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
	   this.handleDeleteToDO = this.handleDeleteToDO.bind(this);
  }

  componentDidMount() {
    fetch('/api/todos')
      .then(res => res.json())
      .then(todosNew => this.setState({ todos: todosNew }));
  }
  
  handleChange(event) {
   
  }

  handleSubmit(event) {
    const data = new FormData(event.target);
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
  
  handleDeleteToDO(todoid,e)
  {
	  fetch('/api/todos/' +todoid+ '/delete');
	  fetch('/api/todos')
      .then(res => res.json())
      .then(todosNew => this.setState({ todos: todosNew }));
  
  }
  
  
  render() {
    return (
      <div className="App">
	  <form onSubmit={this.handleSubmit}>
	  <br/> <br/>
        <label>
          Enter Todo item: <input type="text"  id = "title" name = "title"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
        <h1>Todos</h1>
		<ul>
        {this.state.todos.map(todo =>
        <form onSubmit={(e) => this.handleDeleteToDO(todo.id, e)}>
        <li key = {todo.id} > {todo.title} </li> 
        <input type="submit" value="Delete" />
      </form>
	
        )}
		</ul>
      </div>
    );
  }
}

export default App;
