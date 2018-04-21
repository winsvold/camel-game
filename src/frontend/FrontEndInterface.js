// @flow
type FrontEndProps = {
  action: string,
  milesTraveled: number,
  milesTraveledLastRound: number,
  milesFinish: number,
  camelTiredStatus: string,
  thirstStatus: string,
  nativesClose: string,
  nativesDistance: number,
  canteen: number,
  canteenWarning: boolean,
  prevState: Object,
  causeOfDeath: {
    thirst: boolean,
    tiredness: boolean,
    natives: boolean
  }
  dead: boolean,
  done: boolean,
  actions: GameActions
}
