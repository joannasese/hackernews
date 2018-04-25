import React, { Component } from 'react';

class ExplainBindingsComponent extends Component {
  // constructor() {
  //   super();
  //
  //   this.onClickMe = this.onClickMe.bind(this);
  // }

  // in theory this class method binding can be placed inside the render() class method,
  // but that's not great practice
  // one could also place this logic inside the constructor
  // but that's not recommended either bc it can crowd your constructor over time

  // onClickMe() {
  //   console.log(this);
  // }


  // or if you don't want to deal with binding in your constructor,
  // you can use an arrow function!
  onClickMe = () => {
    console.log(this);
  }

  render() {
    return (
      <button
        // onClick={this.onClickMe.bind(this)} but not great practice due to performance
        // the bind will run every time the component updates. no bueno!
        // better to do it only once when the component is instantiated
        onClick={this.onClickMe}
        type="button"
      >
        Click Me
      </button>
    );
  }
}

export default ExplainBindingsComponent;
