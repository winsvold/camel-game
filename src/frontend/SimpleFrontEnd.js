// @flow
import React from 'react';
import {Actions, CamelTiredNess, Natives, Thirst} from "../backend/enums";
import styled from 'styled-components';

function traveled(props: FrontEndProps) {
  return (
    <div>You traveled {props.milesTraveledLastRound} miles</div>
  );
}

function welcome(props: FrontEndProps) {
  return (
    <div>
      <h3>Welcome to Camel!</h3>
      <p>
        You have stolen a camel to make your way across the great Mobi desert.
        The natives want their camel back and are chasing you down! Survive your
        desert trek and outrun the natives.
      </p>
    </div>
  );
}

function rest(props: FrontEndProps) {
  return (
    <div>The camel is happy</div>
  );
}

function drink(props: FrontEndProps) {
  return (
    <div>
      {props.canteenWarning ? <div>The bottle is empty!</div> : <div>So refreshing</div>}
    </div>
  );
}

function statusCheck(props: FrontEndProps) {
  return (
    <div>
      Miles travelled: {props.milesTraveled}
      <br/>
      Drinks in canteen: {props.canteen}
      <br/>
      The natives are {props.nativesDistance} miles behind you
    </div>
  );
}

function status(props: FrontEndProps) {
  return (
    <div>
      {
        props.thirstStatus === Thirst.VeryThirsty ?
          <div>You are very thirsty</div> :
          props.thirstStatus === Thirst.Thirsty ?
            <div>You are thirsty</div> : ''
      }
      {
        props.camelTiredStatus === CamelTiredNess.Tired ?
          <div>The camel is tired</div> : ''
      }
      {
        props.nativesStatus === Natives.VeryClose ?
          <div>The natives are very close!</div> :
          props.nativesStatus === Natives.Close ?
            <div>The natives are getting close!</div> : ''
      }
      {
        props.done ?
          <h4>You made it, you're safely through the desert!</h4> :
          props.causeOfDeath.natives ?
            <h4>The natives caught up and chopped of your head</h4> :
            props.causeOfDeath.thirst ?
              <h4>You died of thirst</h4> :
              props.causeOfDeath.tiredness ?
                <h4>The camel is dead</h4> : ''
      }
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  max-width: 70vw;
  margin: auto;
  align-items: center;
  justify-content: center;
`;

function SimpleFrontEnd(props: FrontEndProps) {
  console.log(props);
  return (
    <Wrapper>
      {
        function () {
          switch (props.action) {
            case Actions.ModerateSpeed:
              return traveled(props);
            case Actions.InitializeGame:
              return welcome(props);
            case Actions.FullSpeed:
              return traveled(props);
            case Actions.Rest:
              return rest(props);
            case Actions.Drink:
              return drink(props);
            case Actions.StatusCheck:
              return statusCheck(props);
            case Actions.FoundOasis:
              return <h4>You found an oasis!</h4>
          }
        }()
      }
      <div>
        <button onClick={() => props.actions.drink()}>Drink</button>
        <button onClick={() => props.actions.travelModerateSpeed()}>Travel at moderate speed</button>
        <button onClick={() => props.actions.travelFullSpeed()}>Travel at full speed</button>
        <button onClick={() => props.actions.rest()}>Rest</button>
        <button onClick={() => props.actions.statusCheck()}>Status Check</button>
      </div>
      {status(props)}
    </Wrapper>
  );
}

export default SimpleFrontEnd;
