// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log(`Let's play some scrabble!\n`);
  let promptedWord = input.question("Enter a word to score: ");
  return promptedWord;
}

const newPointStructure = transform(oldPointStructure);

function simpleScorer(word) {
  return word.length;
}

function vowelBonusScorer(word) {
  let wordArr = word.toUpperCase().split("");
  let score = 0;
  for (i = 0; i < wordArr.length; i++) {
    if (wordArr[i] === "A") {
      score = score + 3;
    } else if (wordArr[i] === "E") {
      score = score + 3;
    } else if (wordArr[i] === "I") {
      score = score + 3;
    } else if (wordArr[i] === "O") {
      score = score + 3;
    } else if (wordArr[i] === "U") {
      score = score + 3;
    } else {
      score = score + 1;
    }
  }
  return score;
}

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (item in newPointStructure) {
      if (item === word[i]) {
        letterPoints += newPointStructure[item];
      }
    }
  }
  return letterPoints;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  const word = initialPrompt();
  const choosingScoringAlgorithm =
    input.question(`Which Which scoring algorithm would you like to use?\n
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);
  return console.log(
    `Score for '${word.toUpperCase()}: ${scoringAlgorithms[
      choosingScoringAlgorithm
    ].scoringFunction(word)}`
  );
}

function transform(object) {
  let newObject = {};
  let holderObject = {};
  for (item in object) {
    for (i = 0; i < object[item].length; i++) {
      newObject[object[item][i].toLowerCase()] = Number(item);
    }
  }
  return newObject;
}

function runProgram() {
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
