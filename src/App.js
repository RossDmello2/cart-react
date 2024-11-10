import React, { Component } from 'react';
import Toggle from './Toggle';

class App extends Component {
  handleToggle = () => {
    console.log("Toggle clicked!");
  };

  render() {
    return (
      <div>
        <h1>Toggle Button</h1>
        <Toggle handleToggle={this.handleToggle} />
      </div>
    );
  }
}

export default App;