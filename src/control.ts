import { Automata, State, Transition } from "./automata/index";

export function checkIfDeterministic(automata: Automata) {
  let isDeterministic = true;

  automata.states.forEach((s) => {
    s.transition.forEach((t) => {
      isDeterministic = isDeterministic && t.states.length === 1;
    });
  });

  return isDeterministic;
}

function createNewState(automata: Automata, states: State[]): State {
  let name = "";
  let accepting = false;
  let transitions: Transition[] = [];

  automata.alphabet.forEach((m) => {
    transitions.push(new Transition(m));
  });

  states.forEach((s: State) => {
    name += s.state;
    accepting = accepting || s.accepting;

    console.log(s.toString());

    s.transition.forEach((t: Transition) => {
      transitions.map((nt: Transition) => {
        if (nt.entry === t.entry) {
          nt.states = nt.states.concat(t.states);
          nt.states = nt.states.filter((state, i, states) => states.indexOf(state) === i )
        }
      });
    });
  });

  const newState = new State(name, accepting);
  newState.transition = transitions;

  return newState;
}

export function makeDeterministic(automata: Automata) {
  automata.states.forEach((s) => {
    s.transition.forEach((t) => {
      if (t.states.length > 1) {
        console.log(" - Creating new state.");
        const newState = createNewState(automata, t.states);
        console.log(` - New state created: ${newState.state}`);
        t.states = [];
        t.states.push(newState);
        automata.states.push(newState);
      }
    });
  });
}

export function validateEntry(automata: Automata) {
  let actualState = automata.states[0];

  for (let index = 0; index < automata.entry.length; index++) {
    const element = automata.entry[index];

    const transitions = actualState.transition.find((t) => t.entry === element);

    if (transitions === undefined)
      throw new Error(
        `There is no transition from state ${actualState.state} for entry ${element}`
      );

    if (transitions.states.length > 1)
      throw new Error(
        `Multiple transitions in state ${actualState.state} for entry ${element}`
      );

    actualState = transitions.states[0];
  }

  return actualState.accepting;
}
