import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Chat />
      </div>
    )
  }
}

export default App;
