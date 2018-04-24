import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component { //component is named 'App'
  constructor(props) {
    super(props); // must call super because App component is subclass of Component

    this.state = {
      list, // ES6 shorthand for list: list,
    };

    this.onDismiss = this.onDismiss.bind(this); // to define onDismiss() as a class method, we must bind it to constructor
  }

  onDismiss(id){
    function isNotId(item){
      return item.objectID !== id;
    }

    const updatedList = this.state.list.filter(isNotId)
  }

  render() { // element returned is specified in render method
    return (
      <div className="App">
        {this.state.list.map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author} </span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span> // create 'Dismiss' button
              <button onClick={() => this.onDismiss(item.objectID)} type='button'>
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
