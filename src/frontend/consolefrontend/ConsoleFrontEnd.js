// @flow
import React, {Component} from 'react';
import SelfWritingConsole from './selfWritingConsole/SelfWritingConsole';
import {Actions} from "../../backend/enums";
import {drink, rest, statusCheck, travel, welcome} from "./consolecomponents/actionUpdates";
import {endCredits} from "./consolecomponents/endCredits";

const clearScreenComponent = [{
  delay: 100,
  clear: true,
  text: ' ',
  interval: 10
}];

class ConsoleFrontEnd extends Component {
  constructor(props: FrontEndProps) {
    super(props);
    this.state = {
      textComponents: clearScreenComponent
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', event => this.handleKeyStroke(event))
  }

  handleKeyStroke(event) {
    switch (event.key) {
      case 'a':
        this.props.actions.drink();
        this.setState({textComponents: clearScreenComponent});
        break;
      case 'b':
        this.props.actions.travelModerateSpeed();
        this.setState({textComponents: clearScreenComponent});
        break;
      case 'c':
        this.props.actions.travelFullSpeed();
        this.setState({textComponents: clearScreenComponent});
        break;
      case 'd':
        this.props.actions.rest();
        this.setState({textComponents: clearScreenComponent});
        break;
      case 'e':
        this.props.actions.statusCheck();
        this.setState({textComponents: clearScreenComponent});
        break;
    }
  }

  render() {
    const textComponents =
      this.props.done || this.props.dead
        ? endCredits(this.props)
        : function (that) {
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

    return (
      <SelfWritingConsole
        textComponents={this.state.textComponents}
        callBack={() => this.setState({textComponents: textComponents})}
      />
    );
  }
}

export default ConsoleFrontEnd;
