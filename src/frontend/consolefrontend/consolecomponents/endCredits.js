export function endCredits(props: FrontEndProps) {
  let endCredits = [];
  if(props.done){
    endCredits.push({
      delay: 500,
      clear: true,
      text: 'You made it, you\'re safely through the desert!',
      interval: 80
    });
  }
  if(props.causeOfDeath.natives){
    endCredits.push({
      delay: 500,
      clear: true,
      text: 'The natives caught up and chopped of your head',
      interval: 80
    });
  }
  if(props.causeOfDeath.thirst){
    endCredits.push({
      delay: 500,
      clear: true,
      text: 'You died of thirst',
      interval: 80
    });
  }
  if(props.causeOfDeath.tiredness){
    endCredits.push({
      delay: 500,
      clear: true,
      text: 'The camel is dead',
      interval: 80
    });
  }

  return [
    ...endCredits,
    {
      delay: 50000,
      clear: true,
      text: '',
      interval: 80
    }];
}
