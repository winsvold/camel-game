// @flow
import * as React from 'react';
import styled from 'styled-components';
import camelSVG from "../img/camel.svg";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 1em;
  box-sizing: border-box;
  background: linear-gradient(midnightblue, darkgoldenrod);
  display: grid;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${props => 1 - props.position / 100};
    height: 100%;
    width: 100%;
    background: linear-gradient(lightgoldenrodyellow, yellow);;
  }
`;

const GameWindow = styled.section`
  position: relative;
  background: linear-gradient(black, midnightblue);
  color: white;
  box-shadow: 0.1em 0.3em 1em black,
              inset 0.05em 0.1em 0.3em white;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${props => 1 - props.position / 100};
    height: 100%;
    width: 100%;
    background: linear-gradient(#555, #bb8);
  }
`;

const Horizon = styled.div`
  border-bottom: black dashed 0.3em;
  opacity: 0.5;
  position: absolute;
  bottom: 15%;
  left: 5%;
  width: 90%;
`;

const Camel = styled.div`
  opacity: 0.7;
  position: absolute;
  width: 10%;
  bottom: 15%;
  left: ${props => props.position * 0.82 + 5 }%;
`;

function CamelGame(props: FrontEndProps) {
  const position = (props.milesTraveled / props.milesFinish) * 100;
  return (
    <AppWrapper position={position}>
      <GameWindow position={position}>
        <Camel position={position}>
          <img src={camelSVG}/>
        </Camel>
        <Horizon/>
      </GameWindow>
    </AppWrapper>
  );
}

export default CamelGame;
