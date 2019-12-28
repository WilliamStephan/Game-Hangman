console.log("app.js is linked - global vars & main app logic"); // global vars & main app logic

const debug = true;

const Root = document.documentElement, gRoot = getComputedStyle(Root);
const dispBoard = document.getElementById("board");
const dispHint = document.getElementById("hint");
const dispSpin = document.getElementById("spin");
const dispRound = document.getElementById("round");
const dispGame = document.getElementById("game");
const gameData = ["bloodcurdling Test Me", "schizophrenia", "country road take me home", "flabbergasted", "port and starboard", "globalization", "consciousness", "weightlifting", "championship match", "mathematician", "razzamatazzes", "hypothesizing", "new baby buggy"]
const gameHint = ["strange phrase", "a condition", "song", "a condition", "a place", "business speak", "a condition", "an activity", "event", "person", "a condition", "a condition", "thing"]
const wheelItems = ["500", "550", "600", "650", "700", "800", "900", "2500", "1000000", "LOSE TURN", "FREE TURN", "BANKRUPT"];
const wheelWeights = [21, 4, 17, 13, 13, 4, 4, 4, 1, 4, 4, 11]; // 24 wheel slots and weighting - x/100
const slotLocation = [[45, 75, 195, 270], [210], [180, 225, 300, 330], [60, 150, 285], [120, 255, 315], [90], [30], [360], [240], [105], [135], [15, 165, 235, 245]]
const effect = [["ding", "assets/sound/ding.wav"], ["bankrupt", "assets/sound/bankrupt.wav"], ["spin", "assets/sound/spin.wav"], ["reveal", "assets/sound/reveal.wav"], ["solved", "assets/sound/solved.wav"], ["buzzer", "assets/sound/buzzer.wav"], ["countdown", "assets/sound/countdown.wav"], ["choose", "assets/sound/choose.wav"], ["sax", "assets/sound/sax.wav"], ["wand", "assets/sound/wand.wav"], ["gasp", "assets/sound/gasp.wav"], ["scream", "assets/sound/scream.wav"]];

var rotateDeg = parseInt(gRoot.getPropertyValue('--turn')) // CSS variable for spin rotation animation
var hangImgCount = 0; // concatenated to ID for current hangman image (low-tech animation)

var spinEnabled = true;
var keysEnabled = false;


var snd = {}; // sound effects table for fast key access: snd.effect 
for (i = 0; i < effect.length; i++) {
    snd[effect[i][0]] = effect[i][1];
}

console.log(snd);

document.onkeyup = keyStroke;
document.body.onclick = keyClick;

start();

function start() {
    initGame(); if (debug) { console.log(game) } // initialize game object
    initWheel(); if (debug) { console.log(wheel) } // initialize wheel and weighting    
    newRound();
    showScore();
    showPush();
    hideKeys();
}

// keyboard event
function keyStroke(e) {
    if (keysEnabled) {
        if (document.getElementById(e.key.toUpperCase())) { // checks if div (e.key) exists before processing 
            guess = e.key.toUpperCase();
            e = document.getElementById(guess);
            if (e.classList.contains('keyboard')) {

                hideKeys();
                setTimeout(function () {
                    showPush();
                }, 2000);

                // process guess
                processGuess(e);
            }
        }
    }
}

// click event
function keyClick(e) {
    e = window.event ? event.srcElement : e.target;
    if (e.classList.contains('keyboard') && keysEnabled) {
        guess = e.getAttribute('id');
        console.log(guess, e);
        
        hideKeys();

        setTimeout(function () {
            showPush();
        }, 2000);


        
        
        // process guess
        processGuess(e);
    }
    guess = e.getAttribute('id');
    if (spinEnabled) {
        if (guess === 'wheel' || guess === 'wof') {
            wheel.spin();
            hidePush()
            console.log(wheel.sText, wheel.sValue);

            if (!wheel.sText.length > 0) {
                setTimeout(function () {
                    showScore()
                    showKeys();
                }, 4500);
            }
            else {
                hideKeys();
                showPush();
                if (wheel.sText === "BANKRUPT") {
                    
                    setTimeout(function () {
                        sndPlay(snd.bankrupt);
                    }, 5000);
                    
                
                    // show value
                }
                if (wheel.sText === "LOSE TURN") {
                    
                    setTimeout(function () {
                        sndPlay(snd.bankrupt);
                    }, 5000);
                    
                
                    // show value
                }
                if (wheel.sText === "FREE TURN") {
                    
                    setTimeout(function () {
                        sndPlay(snd.wand);
                    }, 5000);
                    
            
                    // show value
                }
            }

        }

        // process spin
    }
    return;
}


function processGuess(e) {
    guess = e.id;
    var time = 1000;

    if (puzzle.alpha.includes(guess)) { return; }  // filters noise, only non-dups pass
    matches = puzzle.setUsed(guess); // log letter as used (puzzle.alpha) and return # matches
    puzzle.tries++;
    if (matches > 0) { // good guess
        puzzle.correct++; // increment correct guesses
        highlightKey(guess); // highlights key of pick      

        sndPlay(snd.ding); // sounds a ding for number of letters in puzzle
        for (i = 0; i < matches - 1; ++i) {
            setTimeout(function () {
                sndPlay(snd.ding);
            }, time);
            time += 1000;
        }
        setTimeout(function () {
            e.style.color ="#000000"
        }, time);
        time += 1500;

        if (puzzle.correct === puzzle.unique) { /* puzzle solved */

            sndPlay(snd.solved, 1);
            puzzle.complete = true;
            game.wins++
            game.gameScore = + puzzle.puzzleScore;
            if (debug) { console.log("You Win!") };
            newRound();

        }
    }
    else {  // bad guess
        e.style.color ="#de1738"
        puzzle.incorrect++;
        bodyPart("remove");
        sndPlay(snd.buzzer, 1);
        puzzle.triesLeft--;
        if (puzzle.triesLeft === 0) {

            sndPlay(snd.reveal, 1);
            puzzle.complete = true;
            game.losses++;
            if (debug) { console.log("You Lose!") };
            newRound();

        }
    }

    letters.makeVisible(guess);
    letters.setBoard();
    dispBoard.textContent = letters.board;
}
