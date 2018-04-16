// @flow
import * as React from 'react';
import styled from 'styled-components';
import camelSVG from "../img/camel.svg";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 1em;
  box-sizing: border-box;
  background: linear-gradient(lightgoldenrodyellow, yellow);
  display: grid;
`;

const GameWindow = styled.section`
  position: relative;
  background: linear-gradient(#555,#bb8 );
  color: white;
  box-shadow: 0.1em 0.3em 1em black,
              inset 0.05em 0.1em 0.3em white;
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
  return (
    <AppWrapper>
      <GameWindow>
        <Camel position={0}>
          <img src={camelSVG}/>
        </Camel>
        <Horizon/>
      </GameWindow>
    </AppWrapper>
  );
}

export default CamelGame;
