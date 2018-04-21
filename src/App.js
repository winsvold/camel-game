// @flow
import React, {Component} from 'react';
import CamelGame from "./frontend/camelgame";
import GameLogic from "./backend/gameLogic";
import {CamelTiredNess, Natives, Thirst} from "./backend/enums";
import SimpleFrontEnd from "./frontend/SimpleFrontEnd";
import styled from 'styled-components';
import ConsoleFrontEnd from "./frontend/consolefrontend/ConsoleFrontEnd";

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
  Simple: 'Simple',
  CamelGame: 'Camel Game',
  Console: 'Console'
};

const FrontEndButtons = styled.div`
  position: fixed;
  right: 0;
  top: 0;
`;

class App extends Component {
  gameLogic: GameLogic;

  constructor() {
    super();
    this.gameLogic = new GameLogic(() => this.setState({}));
    this.state = {
      frontEnd: FrontEnds.Console
    };
  }

  buttonRow() {
    return Object.values(FrontEnds).map((frontend) =>
      <button onClick={() =>
        this.setState({
          frontEnd: frontend
        })}
      >
        {frontend}
      </button>
    );
  }

  render() {
    console.log(this.state.frontEnd);
    const frontEndProps = getFrontEndPropsFromBackend(this.gameLogic);
    const frontEnd =
      this.state.frontEnd === FrontEnds.Simple
        ? <SimpleFrontEnd {...frontEndProps} />
        : this.state.frontEnd === FrontEnds.Console
        ? <ConsoleFrontEnd {...frontEndProps} />
        : <CamelGame {...frontEndProps} />;
    return (
      <div>
        {frontEnd}
        <FrontEndButtons>
          {this.buttonRow()}
        </FrontEndButtons>
      </div>
    )
  }
}

export default App;
