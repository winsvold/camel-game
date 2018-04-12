// @flow
import React, {Component} from 'react';
import CamelGame from "./frontend/camelgame";
import {mockProps} from "./frontend/mockProps";
import GameLogic from "./backend/gameLogic";
import {CamelTiredNess, Thirst} from "./backend/enums";

function getTransientData(state) {
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

class App extends Component {
  gameLogic: GameLogic;

  constructor() {
    super();
    this.gameLogic = new GameLogic();
    this.gameLogic.moderateSpeed();
    this.gameLogic.moderateSpeed();
    this.gameLogic.moderateSpeed();
    this.gameLogic.moderateSpeed();
    this.gameLogic.fullSpeed();
    this.gameLogic.fullSpeed();
    this.gameLogic.sleep();
    this.gameLogic.fullSpeed();
    this.gameLogic.fullSpeed();
    this.gameLogic.drink();
    this.gameLogic.fullSpeed();
    this.gameLogic.sleep();
    this.gameLogic.fullSpeed();
    console.log(getTransientData(this.gameLogic.getState()));
    console.log(this.gameLogic.getLogs());
  }

  render() {
    return (
      <CamelGame {...mockProps} />
    )
  }
}

export default App;
