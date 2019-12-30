console.log("puzzle.js is linked - puzzle object");

class Puzzle {
    constructor(puzzle) {
    this.puzzle = puzzle;
    this.maxTries = 0;
    this.tries = 0;
    this.triesLeft = 0;
    this.complete = false;
    this.words = 0;
    this.letters = 0;
    this.unique = 0;
    this.vowels = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.puzzleScore = 0;
    this.puzzleStatus = "";
    this.alpha = "";
    }
    setUsed(pick) {
        if (this.alpha.length > 0) { 
            if (this.alpha.includes(pick)) { return; }    
        }
        this.alpha += pick;
        return(this.puzzle.split(pick).length - 1);
    }
    
}

function initPuzzle(sentence, triesAllowed) {
    puzzle = new Puzzle(sentence);
    puzzle.triesLeft = triesAllowed;
    puzzle.maxTries = triesAllowed;
    puzzle.vowels = getVowels(puzzle.puzzle);
    puzzle.words = totalWords(puzzle.puzzle);
    puzzle.letters = totalLetters(puzzle.puzzle);
    puzzle.unique = uniqueString(puzzle.puzzle).length;
}
