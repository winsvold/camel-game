// @flow
import {Choices} from "./choicesEnum";

type stateType = {
  done: boolean,
  milesTraveled: number,
  thirst: number,
  camelTired: number,
  nativesTraveled: number,
  canteen: number,
  milesFinish: number
}

const defaultState: stateType = {
  done: false,
  milesTraveled: 0,
  thirst: 0,
  camelTired: 0,
  nativesTraveled: -20,
  canteen: 3,
  milesFinish: 300
};

function randomRange(min, max){
  return min + Math.random * max;
}

class GameLogic {
    constructor(){
      this.state = { ...defaultState };
      this.stateChangeLog = [defaultState];
    }
    action(choice){
      switch(choice){
        case Choices.Drink:
          this.drink();
          break;
        case Choices.ModerateSpeed:
          this.moderateSpeed();
          break;
        default:
          return new Error('Action not implemented');
      }
    }
    updateState(stateChange: stateType){
      const newState: stateType = {
        ...this.state,
        milesTraveled: this.state.milesTraveled + stateChange.milesTraveled || 0,
        thirst: this.state.thirst + stateChange.thirst || 0,
        camelTired: this.state.camelTired + stateChange.camelTired || 0,
        nativesTraveled: this.state.nativesTraveled + stateChange.nativesTraveled || 0,
        canteen: this.state.canteen + stateChange.canteen || 0
      };
      this.stateChangeLog.push(stateChange);
      this.state = newState;
    }
    drink(){
      const stateChange: stateType = { thirst: - this.state.thirst };
      this.updateState(stateChange);
    }
    moderateSpeed(){
      const stateChange: stateType = {
        camelTired: randomRange(0,1),
        milesTraveled: randomRange(5,12),
        thirst: 1,
      };
      this.updateState(stateChange);
    }
}

export default GameLogic;
