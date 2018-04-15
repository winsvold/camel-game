// @flow
import React, {Component} from 'react';
import CamelGame from "./frontend/camelgame";
import {mockProps} from "./frontend/mockProps";
import GameLogic from "./backend/gameLogic";
import {CamelTiredNess, Natives, Thirst} from "./backend/enums";
import SimpleFrontEnd from "./frontend/SimpleFrontEnd";

function getFrontEndPropsFromBackend(gameLogic: GameLogic) {
  const state = gameLogic.getState();

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

  const nativesDistance = state.milesTraveled - state.nativesTraveled;
  const nativesStatus =
    nativesDistance <= 0 ? Natives.CaughtUp :
      nativesDistance < 7 ? Natives.VeryClose :
        nativesDistance < 15 ? Natives.Close :
          Natives.Distant;

  const actions = {
    drink: () => gameLogic.drink(),
    travelModerateSpeed: () => gameLogic.moderateSpeed(),
    travelFullSpeed: () => gameLogic.fullSpeed(),
    rest: () => gameLogic.sleep(),
    statusCheck: () => gameLogic.statusCheck()
  };

  const prevState = gameLogic.getLogs().stateLog[gameLogic.getLogs().stateLog.length - 2];
  return {
    ...state,
    prevState: prevState,
    nativesStatus: nativesStatus,
    nativesDistance: nativesDistance,
    milesTraveledLastRound: prevState ? state.milesTraveled - prevState.milesTraveled : 0,
    camelTiredStatus,
    thirstStatus,
    actions: actions
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
    const frontEndProps = getFrontEndPropsFromBackend(this.gameLogic);
    const frontEnd =
      this.state.frontEnd === FrontEnds.Simple
        ? <SimpleFrontEnd {...frontEndProps} />
        : <CamelGame {...mockProps} />;
    return (
      frontEnd
    )
  }
}

export default App;
