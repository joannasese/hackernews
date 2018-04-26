// UNIDIRECTIONAL DATA FLOW:
// onClick() triggers an action
// a function or class method modifies the internal component state
// render() method runs again to update the view

import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

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
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    // to define onDismiss() as a class method, we must bind it to constructor
    // class methods don’t automatically bind 'this' to the class instance.

    // we could also not bind in the constructor by writing class methods as arrow functions
    // this.onSearchChange = this.onSearchChange.bind(this);
    // this.onDismiss = this.onDismiss.bind(this);
  }

  // class method logic should be located outside of constructor

  setSearchTopStories = (result) => {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
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
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
     );
    }
  }

const Search = ({value, onChange, children}) =>
  <form>
    {children}<input
    type="text"
    value={value}
    onChange={onChange}/>
  </form>

const Table = ({list, pattern, onDismiss}) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      // const onHandleDismiss = () => this.onDismiss(item.objectID);
      // one option would be to pass { onHandleDismiss } within the click event
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

const Button = ({onClick, className='', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App;
