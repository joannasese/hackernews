import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component { //component is named 'App'
  render() { // element returned is specified in render method
    const helloWorld = 'Welcome to the Road to learn React with a variable';
    const starfish = 'This is a starfish';
    const user = {firstName: 'Jelly', lastName: 'Belly'};
    return (
      <div className="App">
        <h2>{helloWorld}</h2>
        <p>{starfish}.</p>
        <p>His first name is {user.firstName}.</p>
        <p>His last name is {user['lastName']}.</p>
      </div>
    );
  }
}

export default App;
