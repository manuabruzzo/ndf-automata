import { State } from "./State";

export class Transition {
  entry: string;
  states: State[];

  constructor(entry: string) {
    this.entry = entry;
    this.states = [];
  }

  public toString() {
    return ` > ${this.entry}: ${this.states.map((s: State) => {
      return s.state;
    })}`;
  }
}

export default Transition;
