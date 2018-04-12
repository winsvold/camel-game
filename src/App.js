// @flow
import React, {Component} from 'react';
import CamelGame from "./frontend/camelgame";
import {mockProps} from "./frontend/mockProps";
import GameLogic from "./backend/gameLogic";
import {CamelTiredNess, Thirst} from "./backend/enums";
import SimpleFrontEnd from "./frontend/SimpleFrontEnd";

function getFrontEndPropsFromGameState(state) {
  const tiredness = state.camelTired;
  const camelTiredStatus =
    tiredness < 5 ? CamelTiredNess.Happy :
      tiredness <= 8 ? CamelTiredNess.Tired :
        CamelTiredNess.Dead;

  const thirst = state.thirst;
  const thirstStatus =
    thirst < 3 ? Thirst.NotThirsty :
      thirst < 5 ? Thirst.Thirsty :
        thirst <= 6 ? Thirst.VeryThirsty :
          Thirst.Dead;

  return {
    ...state,
    camelTiredStatus,
    thirstStatus
  };
}

const FrontEnds = {
  Simple: 'simple'
};

class App extends Component {
  gameLogic: GameLogic;

  constructor() {
    super();
    this.gameLogic = new GameLogic(() => this.setState({}));
    this.state = {
      frontEnd: FrontEnds.Simple
    };
  }

  render() {
    const gameState = this.gameLogic.getState();
    const frontEnd =
      this.state.frontEnd === FrontEnds.Simple
        ? <SimpleFrontEnd {...getFrontEndPropsFromGameState(gameState)} gameLogic={this.gameLogic} />
        : <CamelGame {...mockProps} />;
    return (
      frontEnd
    )
  }
}

export default App;
