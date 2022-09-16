import { Transition } from "./Transition";

export class State {
  state: string;
  accepting: boolean;
  transition: Transition[];

  constructor(name: string, accepting: boolean) {
    this.state = name;
    this.accepting = accepting;
    this.transition = [];
  }

  public toString() {
    return ` - state: ${this.state}${
      this.accepting ? " <- ACCEPTING\n" : "\n"
    }   transitions: ${this.transition.map((t: Transition) => {
      return t.toString();
    })}`;
  }
}

export default State;
