// @flow
import {Actions} from "./enums";

type stateType = {
  done: boolean,
  dead: boolean,
  causeOfDeath: {
    thirst: boolean,
    tiredness: boolean,
    natives: boolean
  },
  milesTraveled: number,
  thirst: number,
  canteen: number,
  canteenWarning: boolean,
  thirstLimit: number,
  camelTired: number,
  camelTiredLimit: number,
  nativesTraveled: number,
  milesFinish: number
}

const defaultState: stateType = {
  done: false,
  dead: false,
  causeOfDeath: {
    thirst: false,
    tiredness: false,
    natives: false
  },
  milesTraveled: 0,
  thirst: 0,
  canteen: 3,
  canteenWarning: false,
  thirstLimit: 6,
  camelTired: 0,
  camelTiredLimit: 8,
  nativesTraveled: -20,
  milesFinish: 200
};

function randomRange(min: number, max: number) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

class GameLogic {
  state: stateType;
  updateFrontend: Function;
  stateLog: Array<any>;
  actionLog: Array<any>;

  constructor(fireUpdate: Function) {
    this.state = {...defaultState};
    this.stateLog = [this.state];
    this.actionLog = [Actions.InitializeGame];
    this.updateFrontend = fireUpdate;
  }

  getState() {
    return {
      ...this.state,
      action: this.actionLog[this.actionLog.length - 1]
    };
  }

  getLogs(){
    return {
      actionLog: this.actionLog,
      stateLog: this.stateLog
    }
  }

  updateState(stateUpdate: Object, action: typeof Actions) {
    if (this.isGameOver()) {
      console.log('Game is over');
      return;
    }
    this.actionLog.push(action);
    this.state = {
      ...this.state,
      ...stateUpdate
    };
    this.stateLog.push(this.state);
    this.state = {
      ...this.state,
      dead: this.isDead(),
      causeOfDeath: this.causeOfDeath(),
      done: this.victory()
    };
    this.updateFrontend();
  }

  isGameOver(){
    return (this.isDead()) || this.victory();
  }

  victory(){
    return this.state.milesTraveled > this.state.milesFinish;
  }

  causeOfDeath(){
    return {
      thirst: this.state.thirst > this.state.thirstLimit,
      tiredness: this.state.camelTired > this.state.camelTiredLimit,
      natives: this.state.milesTraveled < this.state.nativesTraveled
    };
  }

  isDead() {
    return Object.values(this.causeOfDeath()).some((cause) => cause);
  }

  lookForOasis(chance = 0.05) {
    if (chance > Math.random()) {
      const stateUpdate = {
        thirst: 0,
        camelTired: 0
      };
      this.updateState(stateUpdate, Actions.FoundOasis);
    }
  }

  drink() {
    let stateUpdate;
    if (this.state.canteen > 0) {
      stateUpdate = {
        thirst: 0,
        canteen: this.state.canteen - 1,
        canteenWarning: false
      };
    } else {
      stateUpdate = {
        canteenWarning: true
      };
    }
    this.updateState(stateUpdate, Actions.Drink);
  }

  moderateSpeed() {
    const stateUpdate = {
      camelTired: this.state.camelTired + randomRange(0, 1.5),
      milesTraveled: this.state.milesTraveled + randomRange(5, 12),
      thirst: this.state.thirst + 1,
      nativesTraveled: this.state.nativesTraveled + randomRange(7, 15)
    };
    this.updateState(stateUpdate, Actions.ModerateSpeed);
    this.lookForOasis();
  }

  fullSpeed() {
    const stateUpdate = {
      camelTired: this.state.camelTired + randomRange(1, 4),
      milesTraveled: this.state.milesTraveled + randomRange(10, 20),
      thirst: this.state.thirst + 1,
      nativesTraveled: this.state.nativesTraveled + randomRange(7, 15)
    };
    this.updateState(stateUpdate, Actions.FullSpeed);
    this.lookForOasis(0.1);
  }

  sleep() {
    const stateUpdate = {
      camelTired: 0,
      nativesTraveled: this.state.nativesTraveled + randomRange(7, 15)
    };
    this.updateState(stateUpdate, Actions.Rest)
  }

  statusCheck() {
    this.updateState({}, Actions.StatusCheck)
  }
}

export default GameLogic;
