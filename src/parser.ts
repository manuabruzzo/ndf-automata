import json from "./../automata.json";
import { Automata, State, Transition } from "./automata";


export function createAutomata() {
  const automata = new Automata();
  automata.entry = json.entry;
  automata.alphabet = json.alphabet;

  json.states.forEach((s) => {
    automata.states.push(new State(s.state, s.accepting));
  });

  json.states.map((js) => {
    js.transition.map((jt) => {
      const transition = new Transition(jt.entry);
      jt.states.forEach((ts) =>
      transition.states.push(automata.states.find((as) => as.state === ts)!)
      );
      automata.states.find(as => as.state === js.state)?.transition.push(transition)
    });
  });

  return automata;
}
