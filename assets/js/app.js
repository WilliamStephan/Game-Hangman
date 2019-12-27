console.log("app.js is linked");
const debug = true;

const Root     = document.documentElement, gRoot    = getComputedStyle(Root);

// const rootE = document.documentElement;
// const getRoot = getComputedStyle(rootE);
const displayBoard = document.getElementById("board");
const displayHint = document.getElementById("hint");
const displaySpin = document.getElementById("spin");
const gameData = ["bloodcurdling Test Me", "schizophrenia", "country road take me home", "flabbergasted", "port and starboard", "globalization", "consciousness", "weightlifting", "championship match", "mathematician", "razzamatazzes", "hypothesizing", "new baby buggy"]
const gameHint = ["strange phrase", "a condition", "song", "a condition", "a place", "business speak", "a condition", "an activity", "event", "person", "a condition", "a condition", "thing"]
const wheelItems = ["500", "550", "600", "650", "700", "800", "900", "2500", "1000000", "LOSE TURN", "FREE TURN", "BANKRUPT"];
const wheelWeights = [21, 4, 17, 13, 13, 4, 4, 4, 1, 4, 4, 11]; // 24 wheel slots and weighting - x/100
const slotLocation = [[45, 75, 195, 270],[210],[180, 225, 300, 330],[60, 150, 285],[120, 255, 315],[90],[30],[360],[240],[105],[135],[15, 165, 235, 245]]

var rotateDeg = parseInt(gRoot.getPropertyValue('--turn'))



document.onkeyup = keyStroke;
document.body.onclick = keyClick;

start();

function start() {
    initGame(); // initialize game object
    initWheel(); // initialize wheel and weighting
    if (debug) { console.log(game) }
    if (debug) { console.log(wheel) }
    newRound();
}

function newRound() {
    game.round++;
    if (debug) { console.log("round is: " + game.round) }
    if (game.round > 1) {
        game.correct += puzzle.correct;
        game.incorrect += puzzle.incorrect;
        game.gameScore += puzzle.puzzleScore;

        delete puzzle; // clean up prior obj if exists
        delete letters; // clean up prior obj if exists
    }
    if (game.round === game.length) { // cycled through all puzzles - restart
        delete game;
    }
    initPuzzle(game.game[game.randIndex[game.round]], 7);
    initLetters(puzzle.puzzle, new Array(puzzle.puzzle.length).fill(0));
    // resets disabled key buttons and tab lockout 
    e = document.getElementsByClassName("keyboard");
    for (i = 0; i < e.length; i++) {
        e[i].classList.remove("disabled");
        e.tabIndex = -1;
    }
    displayBoard.textContent = letters.board;
    displayHint.textContent = game.hint[game.randIndex[game.round]];
    if (debug) { console.log(puzzle) };
    if (debug) { console.log(letters) };
}


// keyboard event
function keyStroke(e) {
    if (document.getElementById(e.key.toUpperCase())) { // checks if div (e.key) exists before processing 
        guess = e.key.toUpperCase();
        e = document.getElementById(guess);
        if (e.classList.contains('keyboard')) { processGuess(e); }
    }
}


// click keyboard event
function keyClick(e) {
    e = window.event ? event.srcElement : e.target;
    guess = e.getAttribute('id');
    console.log(guess, e);
    if (e.classList.contains('keyboard')) { processGuess(e); }
    
    if (guess === 'wheel' || guess === 'wof') {
        wheel.spin();

     
    }
}





function processGuess(e) {
    guess = e.id;
    if (e.classList.contains("disabled")) { return } // no action if duplicate
    e.classList.add("disabled"); // disable Bootstrap keyboard button
    e.tabIndex = -1; // remove keyboard button from tab order
    
    puzzle.tries++;
    gStatus = letters.makeVisible(guess);
    if (gStatus === 1) {
        puzzle.correct++;
        if (puzzle.correct === puzzle.unique) {
            puzzle.complete = true;
            game.wins++
            if (debug) { console.log("You Win!") };
            newRound();
        }
    }
    else {
        puzzle.incorrect++;
        puzzle.triesLeft--;
        if (puzzle.triesLeft === 0) {
            puzzle.complete = true;
            game.losses++;
            if (debug) { console.log("You Lose!") };
            newRound();
        }
    }
    letters.setBoard();
    displayBoard.textContent = letters.board;
}
