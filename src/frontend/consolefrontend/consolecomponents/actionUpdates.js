import {commonUpdates} from "./comonUpdates";

export function welcome(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: 'Welcome to Camel.',
    interval: 80
  }, {
    delay: 800,
    clear: false,
    text: '\nYou have stolen a camel to make your way across the great Mobi desert.',
    interval: 40
  }, {
    delay: 800,
    clear: false,
    text: '\nThe natives want their camel back and are chasing you down!',
    interval: 40
  }, {
    delay: 800,
    clear: false,
    text: '\nSurvive your desert trek and outrun the natives.',
    interval: 40
  },
    ...commonUpdates(props)
  ]
}

export function travel(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: `You travelled ${props.milesTraveledLastRound} miles`,
    interval: 80
  },
    ...commonUpdates(props)
  ]
}

export function drink(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: `${props.canteenWarning ? 'Your bottle is empty!' : 'So refreshing!'}`,
    interval: 80
  },
    ...commonUpdates(props)
  ]
}

export function rest(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: 'Your camel is happy',
    interval: 80
  },
    ...commonUpdates(props)
  ]
}

export function statusCheck(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: `Miles travelled: ${props.milesTraveled}`,
    interval: 80
  }, {
    delay: 500,
    clear: false,
    text: `\nDrinks in canteen: ${props.canteen}`,
    interval: 80
  }, {
    delay: 500,
    clear: false,
    text: `\nThe natives are ${props.nativesDistance} miles behind you`,
    interval: 80
  },
    ...commonUpdates(props)
  ]
}
