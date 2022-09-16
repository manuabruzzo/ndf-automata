import {
  checkIfDeterministic,
  makeDeterministic,
  validateEntry,
} from "./control";
import { createAutomata } from "./parser";

const automata = createAutomata();
console.log(automata.toString()+"\n");

if (!checkIfDeterministic(automata)) {
  console.log("Automata is Non Deterministic!");
  console.log("Converting automata to deterministic...");
  makeDeterministic(automata);
}

console.log(`New deterministic automata is:\n${automata.toString()}\n`)

console.log(`Validating string ${automata.entry}`);
const isValid = validateEntry(automata);

console.log(`Entry string is ${isValid ? "valid" : "invalid"}.`);
