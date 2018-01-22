import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTable from './TodoTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '', todos: [], date: ''}
  }
  inputChanged = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  addTodo = (e) => {
    e.preventDefault();
    let todo = {};
    todo.description = this.state.description
    todo.date = this.state.date
    this.setState({
      todos: [...this.state.todos, todo ]
    });
  }
  deleteTodo = (e) => {
    let clickedIndex = Number(e.target.id)
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== clickedIndex)
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="Simple todo-list">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Todo-list:
        </p>
        <form onSubmit={this.addTodo}>
          Description:
          <input type="text" name="description" onChange={this.inputChanged} value={this.state.description}/>
          Date:
          <input type="date" name="date" onChange={this.inputChanged} value={this.state.date}/>
          <input type="submit" value="Add"/>
        </form>
        <TodoTable todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default App;
