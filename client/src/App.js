import React, { Component } from 'react';
import Navbar from './components/Navbar/navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <img src="logo.png" className="App-logo" alt="Tame Your Job Search" />
      </div>
    );
  }
}

export default App;
