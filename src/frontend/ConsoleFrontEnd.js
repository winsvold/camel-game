// @flow
import React, {Component} from 'react';
import SelfWritingConsole from './selfWritingConsole/SelfWritingConsole';
import {Actions} from "../backend/enums";

const clearComponent = [{
  delay: 100,
  clear: true,
  text: ' ',
  interval: 10
}];

const actionsTextComponents = [{
  delay: 1000,
  clear: false,
  text: '\n\nWhat do you want to do?',
  interval: 20
}, {
  delay: 500,
  clear: false,
  text: '\nA. Drink from your canteen.',
  interval: 20
}, {
  delay: 500,
  clear: false,
  text: '\nB. Ahead moderate speed.',
  interval: 20
}, {
  delay: 500,
  clear: false,
  text: '\nC. Ahead full speed.',
  interval: 20
}, {
  delay: 500,
  clear: false,
  text: '\nD. Stop for the night.',
  interval: 20
}, {
  delay: 500,
  clear: false,
  text: '\nE. Status check.',
  interval: 20
},{
  delay: 50000,
  clear: false,
  text: '',
  interval: 10
}];

function welcome(props: FrontEndProps) {
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
    ...actionsTextComponents
  ]
}

function travel(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: `You travelled ${props.milesTraveledLastRound} miles`,
    interval: 80
  },
    ...actionsTextComponents
  ]
}

function drink(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: `${props.canteenWarning ? 'Your bottle is empty!' : 'So refreshing!'}`,
    interval: 80
  },
    ...actionsTextComponents
  ]
}

function rest(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: 'Your camel is happy',
    interval: 80
  },
    ...actionsTextComponents
  ]
}

function statusCheck(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: `Miles travelled: ${props.milesTraveled}`,
    interval: 80
  },{
    delay: 500,
    clear: false,
    text: `\nDrinks in canteen: ${props.canteen}`,
    interval: 80
  },{
    delay: 500,
    clear: false,
    text: `\nThe natives are ${props.nativesDistance} miles behind you`,
    interval: 80
  },
    ...actionsTextComponents
  ]
}

function endCredits(props: FrontEndProps) {
  return [
    props.done ?
      {
        delay: 500,
        clear: true,
        text: 'You made it, you\'re safely through the desert!',
        interval: 80
      } : props.causeOfDeath.natives ?
      {
        delay: 500,
        clear: true,
        text: 'The natives caught up and chopped of your head',
        interval: 80
      } : props.causeOfDeath.thirst ?
        {
          delay: 500,
          clear: true,
          text: 'You died of thirst',
          interval: 80
        } : {
            delay: 500,
            clear: true,
            text: 'The camel is dead',
            interval: 80
          },
    {
      delay: 50000,
      clear: true,
      text: '',
      interval: 80
    }
   ]
}

class ConsoleFrontEnd extends Component {

  constructor(props: FrontEndProps) {
    super(props);
    this.state = {
      textComponents: clearComponent
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => this.handleKeyStroke(event))
  }

  handleKeyStroke(event) {
    switch (event.key) {
      case 'a':
        this.props.actions.drink();
        break;
      case 'b':
        this.props.actions.travelModerateSpeed();
        break;
      case 'c':
        this.props.actions.travelFullSpeed();
        break;
      case 'd':
        this.props.actions.rest();
        break;
      case 'e':
        this.props.actions.statusCheck();
        break;
    }
    this.setState({textComponents: clearComponent});
  }

  render() {
    const textComponents =
      this.props.done || this.props.dead ?
        endCredits(this.props) :
      function (that) {
        switch (that.props.action) {
          case Actions.InitializeGame:
            return welcome(that.props);
          case Actions.ModerateSpeed:
          case Actions.FullSpeed:
            return travel(that.props);
          case Actions.Drink:
            return drink(that.props);
          case Actions.Rest:
            return rest(that.props);
          case Actions.StatusCheck:
            return statusCheck(that.props);
        }
      }(this);
    return <SelfWritingConsole textComponents={this.state.textComponents} callBack={() => this.setState({textComponents: textComponents})}/>;
  }
}

export default ConsoleFrontEnd;
