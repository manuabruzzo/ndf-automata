import { State } from "./State";

export class Automata {
  alphabet: string[];
  entry: string;
  states: State[];

  constructor() {
    this.alphabet = [];
    this.entry = "";
    this.states = [];
  }

  public toString() {
    return `AUTOMATA\nEntry to try: ${this.entry}\nAlphabet: ${
      this.alphabet
    }\nStates:${this.states.map((s) => {
      return '\n' + s.toString();
    })}`;
  }
}

export default Automata;
