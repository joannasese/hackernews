// UNIDIRECTIONAL DATA FLOW:
// onClick() triggers an action
// a function or class method modifies the internal component state
// render() method runs again to update the view

import React, { Component } from 'react';
import './App.css';
// import Search from './Search.js';
// import Table from './Table.js';

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

// ES5
// function isSearched(searchTerm) {
//   return function(item) {
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }

// ES6
const isSearched = searchTerm => item => // two arrows bc two functions / higher order function (function which returns a function) ?
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component { //component is named 'App'
  constructor(props) {
    super(props); // must call super because App component is subclass of Component

    this.state = {
      list, // ES6 shorthand for list: list,
      searchTerm: '',
    };

    // to define onDismiss() as a class method, we must bind it to constructor
    // class methods don’t automatically bind 'this' to the class instance.

    // we could also not bind in the constructor by writing class methods as arrow functions
    // this.onSearchChange = this.onSearchChange.bind(this);
    // this.onDismiss = this.onDismiss.bind(this);
    }

  // class method logic should be located outside of constructor
  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value});
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id
    // another way to write this would be
    // function isNotId(item) {
    //   return item.objectID !== id
    // }
    const updatedList = this.state.list.filter(isNotId)
    // if item.objectID !== id, item stays in the list
    this.setState({ list: updatedList });
    // returns new list instead of mutating original list
  }

  render() { // element returned is specified in render method
    // ES6 destructuring
    const {list, searchTerm } = this.state;

    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
     );
    }
  }

class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children}<input type="text"
        value={value}
        onChange={onChange}/>
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const {list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          // const onHandleDismiss = () => this.onDismiss(item.objectID);
          // one option would be to pass { onHandleDismiss } within the click event
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </button>
            </span>
          </div>
      )}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      // when there is no className property, value will be empty string instead of undefined
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    )
  }
}



export default App;
