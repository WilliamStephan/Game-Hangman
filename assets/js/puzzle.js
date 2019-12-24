console.log("puzzle.js is linked");

class Puzzle {
    constructor(puzzle) {
    this.puzzle = puzzle;
    this.tries = 0;
    this.triesLeft = 0;
    this.complete = false;
    this.words = 0
    this.letters = 0;
    this.unique = 0;
    this.vowels = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.puzzleScore = 0;
    }
}

function initPuzzle(sentence, triesAllowed) {
    puzzle = new Puzzle(sentence);
    puzzle.triesLeft = triesAllowed;
    puzzle.vowels = getVowels(puzzle.puzzle);
    puzzle.words = totalWords(puzzle.puzzle);
    puzzle.letters = totalLetters(puzzle.puzzle);
    puzzle.unique = uniqueString(puzzle.puzzle).length;
}
