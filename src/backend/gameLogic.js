// @flow
import {Actions} from "./enums";

type stateType = {
  done: boolean,
  dead: boolean,
  milesTraveled: number,
  thirst: number,
  thirstLimit: number,
  camelTired: number,
  camelTiredLimit: number,
  nativesTraveled: number,
  canteen: number,
  milesFinish: number
}

const defaultState: stateType = {
  done: false,
  dead: false,
  milesTraveled: 0,
  thirst: 0,
  thirstLimit: 6,
  camelTired: 0,
  camelTiredLimit: 8,
  nativesTraveled: -20,
  canteen: 3,
  milesFinish: 200
};

function randomRange(min: number, max: number) {
  return min + Math.random() * max;
}

class GameLogic {
  state: stateType;
  stateChangeLog: Array<any>;
  actionLog: Array<any>;

  constructor() {
    this.state = {...defaultState};
    this.stateChangeLog = [this.state];
    this.actionLog = [Actions.InitializeGame];
  }

  getState() {
    return {
      ...this.state,
      action: this.actionLog[this.actionLog.length - 1]
    };
  }

  updateState(stateUpdate: any, action: typeof Actions) {
    if (this.state.dead || this.state.done) {
      console.log('Game Is Over');
      return;
    }
    this.actionLog.push(action);
    this.stateChangeLog.push(stateUpdate);
    this.state = {
      ...this.state,
      ...stateUpdate
    };
    this.state = {
      ...this.state,
      dead: this.isDead()
    };
    console.log(this.getState());
  }

  isDead() {
    return this.state.thirst > this.state.thirstLimit ||
      this.state.camelTired > this.state.camelTiredLimit ||
      this.state.milesTraveled < this.state.nativesTraveled;
  }

  foundOasis() {
    const stateUpdate = {
      thirst: 0,
      camelTired: 0
    };
    this.updateState(stateUpdate, Actions.FoundOasis);
  }

  drink() {
    let stateUpdate;
    if(this.state.canteen > 0){
      stateUpdate = {
        thirst: 0,
        canteen: this.state.canteen - 1
      };
    } else {
      stateUpdate = {};
    }
    this.updateState(stateUpdate, Actions.Drink);
  }

  moderateSpeed() {
    const stateUpdate = {
      camelTired: this.state.camelTired + randomRange(0, 1),
      milesTraveled: this.state.milesTraveled + randomRange(5, 12),
      thirst: this.state.thirst + 1,
      nativesTraveled: this.state.nativesTraveled + randomRange(7, 15)
    };
    this.updateState(stateUpdate, Actions.ModerateSpeed);
    if (randomRange(0, 20) < 1) {
      this.foundOasis();
    }
  }

  fullSpeed() {
    const stateUpdate = {
      camelTired: this.state.camelTired + randomRange(1, 4),
      milesTraveled: this.state.milesTraveled + randomRange(10, 20),
      thirst: this.state.thirst + 1,
      nativesTraveled: this.state.nativesTraveled + randomRange(7, 15)
    };
    this.updateState(stateUpdate, Actions.FullSpeed);
    if (randomRange(0, 20) < 1) {
      this.foundOasis();
    }
  }

  sleep() {
    const stateUpdate = {
      camelTired: 0,
      nativesTraveled: this.state.nativesTraveled + randomRange(7, 15)
    };
    this.updateState(stateUpdate, Actions.Rest)
  }
}

export default GameLogic;
