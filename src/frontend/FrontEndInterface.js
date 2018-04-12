// @flow
import GameLogic from "../backend/gameLogic";

type FrontEndProps = {
  action: string,
  camelTired: number,
  camelTiredLimit: number,
  camelTiredStatus: string,
  canteen: number,
  causeOfDeath: {
    thirst: boolean,
    tiredness: boolean,
    natives: boolean
  }
  dead: boolean,
  done: boolean,
  milesFinish: number,
  milesTraveled: number,
  nativesTraveled: number,
  thirst: number,
  thirstLimit: number,
  thirstStatus: string,
  gameLogic: GameLogic
}
