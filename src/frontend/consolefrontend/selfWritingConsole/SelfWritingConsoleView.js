import React, {Component} from 'react';
import PT from 'prop-types';
import ScrollTo from "./ScrollTo";
import './self-writing-console.css';

class SelfWritingConsoleView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      IBeamBlink: true,
      Interval: null
    };
  }

  componentDidMount() {
    const interval = setInterval(() => this.blinkIBeamHack(), 200);
    this.setState({
      Interval: interval
    });
  }

  componentWillUnmount(){
    clearInterval(this.state.Interval);
  }

  blinkIBeamHack() { //Hack to make the span work with newLines. For some reason the IBeamBlink will prevent text from rendering on the new line, but removing it shortly solves the problem.
    this.setState({
      IBeamBlink: !this.state.IBeamBlink,
    });
    this.setState({
      IBeamBlink: !this.state.IBeamBlink,
    });
  }

  blinker() {
    return <span className='vertical-bar'>{this.state.IBeamBlink ? '\u00a0' : ''}</span>; //Hack to make the span work with newLines. Content in the span needs to change to trigger correct rendering.
  }

  scrollToThis() {
    return this.state.IBeamBlink ? <ScrollTo/> : '';
  }

  render() {
    return (
      <div className='wake-up-container'>
        <div className='backDrop'>
          <div className='wake-up-console'>
            {
              this.props.text.split('\n')
                .map((item, key) => {
                  return <p key={key}>{item}</p>
                })}
            {this.blinker()}
            {this.scrollToThis()}
          </div>
        </div>
      </div>
    );
  }
}

SelfWritingConsoleView.propTypes = {
  text: PT.string.isRequired,
  color: PT.string
};

SelfWritingConsoleView.defaultProps = {
  color: '#222'
};


export default SelfWritingConsoleView;