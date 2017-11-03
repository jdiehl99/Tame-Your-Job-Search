import React, { Component } from 'react';
import Nav from './components/Nav/nav';
import Main from './components/Main/main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Main />
      </div>
    );
  }
}

export default App;
