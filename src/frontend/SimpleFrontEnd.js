// @flow
import React from 'react';

function SimpleFrontEnd(props: FrontEndProps){
  console.log(props);
  return(
    <div>
      <div>Action: {props.action}</div>
      <div>MilesTraveled: {props.milesTraveled}</div>
      <div>Thirst: {props.thirst}</div>
      <div>CamelTired: {props.camelTired}</div>
      <button onClick={() => props.gameLogic.drink()}>Drink</button>
      <button onClick={() => props.gameLogic.moderateSpeed()}>Travel at moderate speed</button>
      <button onClick={() => props.gameLogic.fullSpeed()}>Travel at full speed</button>
      <button onClick={() => props.gameLogic.sleep()}>Rest</button>
      {props.dead && <div>You died!</div>}
      {props.done && !props.dead && <div>You won!</div>}
    </div>
  );
}

export default SimpleFrontEnd;
