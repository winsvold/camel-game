import React from 'react';
import SelfWritingConsole from './selfWritingConsole/SelfWritingConsole';
import {Actions} from "../backend/enums";

const actionsTextComponents = [{
  delay: 1000,
  clear: false,
  text: '\n\nWhat do you want to do?',
  interval: 40
},{
  delay: 500,
  clear: false,
  text: '\nA. Drink from your canteen.',
  interval: 40
},{
  delay: 500,
  clear: false,
  text: '\nB. Ahead moderate speed.',
  interval: 40
},{
  delay: 500,
  clear: false,
  text: '\nC. Ahead full speed.',
  interval: 40
},{
  delay: 500,
  clear: false,
  text: '\nD. Stop for the night.',
  interval: 40
},{
  delay: 500,
  clear: false,
  text: '\nE. Status check.',
  interval: 40
}];

function welcome(props: FrontEndProps) {
  return [{
    delay: 500,
    clear: true,
    text: 'Welcome to Camel.',
    interval: 80
  },{
    delay: 800,
    clear: false,
    text: '\nYou have stolen a camel to make your way across the great Mobi desert.',
    interval: 40
  },{
    delay: 800,
    clear: false,
    text: '\nThe natives want their camel back and are chasing you down!',
    interval: 40
  },{
    delay: 800,
    clear: false,
    text: '\nSurvive your desert trek and outrun the natives.',
    interval: 40
  },
    ...actionsTextComponents
  ]
}

function ConsoleFrontEnd(props: FrontEndProps) {
  const textComponents =
    function () {
      switch (props.action) {
        case Actions.InitializeGame:
          return welcome(props);
      }
    }();
  return <SelfWritingConsole textComponents={textComponents}/>;
}

export default ConsoleFrontEnd;
