import {CamelTiredNess, Natives, Thirst} from "../../../backend/enums";
import {actionsTextComponents} from "./options";

export function commonUpdates(props: FrontEndProps) {
  let array = [];

  if (props.thirstStatus !== Thirst.NotThirsty) {
    const text = props.thirstStatus === Thirst.VeryThirsty
      ? '\nYou are very thirsty'
      : props.thirstStatus === Thirst.Thirsty
        ? '\nYou are thirsty' : '';

    const thirstTextComponent = {
      delay: 1000,
      clear: false,
      text: text,
      interval: 70
    };

    array.push(thirstTextComponent);
  }

  if (props.camelTiredStatus !== CamelTiredNess.Happy) {
    const camelTiredNessTextComponent = {
      delay: 1000,
      clear: false,
      interval: 100,
      text: '\nThe camel is tired'
    };

    array.push(camelTiredNessTextComponent);
  }

  if (props.nativesStatus !== Natives.Distant) {
    const text = props.nativesStatus === Natives.VeryClose ?
      '\nThe natives are very close!' :
      props.nativesStatus === Natives.Close ?
        '\nThe natives are getting close!' : '';

    const nativesTextComponents = {
      delay: 1000,
      clear: false,
      text: text,
      interval: 80
    };

    array.push(nativesTextComponents);
  }

  return (
    [
      ...array,
      ...actionsTextComponents
    ]
  );
}
