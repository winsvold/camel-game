import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CamelGame from "./frontend/camelgame";
import {mockProps} from "./frontend/mockProps";
import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 1em;
  box-sizing: border-box;
  background: linear-gradient(lightgoldenrodyellow, yellow);
  display: grid;
`;

class App extends Component {
  render() {
    return (
    <AppWrapper>
      <CamelGame {...mockProps} />
    </AppWrapper>
    ) || (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
