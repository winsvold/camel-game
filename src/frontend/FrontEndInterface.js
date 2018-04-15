// @flow
type FrontEndProps = {
  action: string,
  milesTraveled: number,
  milesTraveledLastRound: number,
  camelTiredStatus: string,
  thirstStatus: string,
  nativesClose: string,
  nativesDistance: number,
  canteen: number,
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
