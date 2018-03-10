import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/popper.js/dist/popper.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Main />
            </div>
        );
    }
}

export default App;
