console.log("app.js is linked - global vars & main app logic"); // global vars & main app logic

const debug = false;

const Root = document.documentElement, gRoot = getComputedStyle(Root);
const dispBoard = document.getElementById("board");
const dispHint = document.getElementById("hint");
const dispSpin = document.getElementById("spin");  //wipe
const dispRound = document.getElementById("round");
const dispGame = document.getElementById("game");
const dispLeft = document.getElementById("left");
const dispWins = document.getElementById("wins");
const gameData = ["a blessing in disguise", "bride of frankenstein", "country road take me home", "flabbergasted", "port and starboard", "challenging curriculum", "consciousness", "weightlifting", "championship match", "mathematician", "razzamatazzes", "hypothesizing", "new baby buggy"]
const gameHint = ["phrase", "classic movie", "song", "a condition", "a place", "college life", "a condition", "an activity", "event", "person", "a condition", "a condition", "thing"]
const wheelItems = ["500", "550", "600", "650", "700", "800", "900", "2500", "1000000", "LOSE TURN", "FREE TURN", "BANKRUPT"];
const wheelWeights = [21, 4, 17, 13, 13, 4, 4, 4, 1, 4, 4, 11]; // 24 wheel slots and weighting - x/100
const slotLocation = [[45, 75, 195, 270], [210], [180, 225, 300, 330], [60, 150, 285], [120, 255, 315], [90], [30], [360], [240], [105], [135], [15, 165, 235, 245]]

var rotateDeg = parseInt(gRoot.getPropertyValue('--turn')) // CSS variable for spin rotation animation
var hangImgCount = 0; // concatenated to ID for current hangman image (low-tech animation)
var spinEnabled = true;
var keysEnabled = false;

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
    if (debug) { console.log("keyboard entry: " + e.key + " was attempted") } 
    if (spinEnabled && e.key === "Enter") { // spin the wheel with a keyboard enter
        wheel.spin(); // spin the wheel! 
        hidePush() // disable wheel
        processSpin();
        if (puzzle.puzzleStatus === "loss") { roundLoss(); }
        if (puzzle.puzzleStatus === "win") { roundWin(); }
    }
    if (keysEnabled && document.getElementById(e.key.toUpperCase())) {
        guess = e.key.toUpperCase();
        e = document.getElementById(guess);
        if (e.classList.contains('keyboard')) {
            if (puzzle.alpha.includes(guess)) { // filters duplicates
                soundPluck.play()
                return; 
            } 
            hideKeys();
            setTimeout(function () { // set timing for wheel activation. 
                showPush();
            }, 1000);
            processGuess(e);  // send key validated keystroke for processing
        }
    }
    if (debug) { console.log("validated keyboard entry: " + guess + " was processed") }
}

// click event
function keyClick(e) { // looking for clicks  - wheel or on-screen keyboard
    e = window.event ? event.srcElement : e.target;
    if (debug) { console.log("click event: " + e.getAttribute('id') + " was clicked") }
    if (e.classList.contains('keyboard') && keysEnabled) {  // on-screen keyboard click
        guess = e.getAttribute('id');
        if (puzzle.alpha.includes(guess)) { // filters duplicates
            soundPluck.play()
            return; 
        } 
        hideKeys();
        setTimeout(function () { // set timing for wheel activation. 
            showPush();
        }, 1000);
        if (debug) { console.log("validated keyboard click: " + guess + " was processed") }
        processGuess(e); // send validated clicked-key for processing
    }
    else if (spinEnabled && e.getAttribute('id') === 'wheel') {  
        wheel.spin(); // spin the wheel! 
        hidePush() // disable wheel
        processSpin();
        if (debug) { console.log("validated spin click: " + e.getAttribute('id') + " was processed") }
        if (puzzle.puzzleStatus === "loss") { roundLoss(); }
        if (puzzle.puzzleStatus === "win") { roundWin(); }
    }
    else if (e.getAttribute('id') === 'reset') { 
        if (debug) { console.log("validated reset click: " + e.getAttribute('id') + " was processed") }
        rotateWheel("0", false)
        soundWand.play();
        setTimeout(function () {
            start() 
        }, 4000);      
    }
    return;
}

function processSpin() {
    if (!wheel.sText.length > 0) { // received a $value wheel slot
        setTimeout(function () { // pause before enabling keyboard
            showScore();
            showKeys(); // enable keyboard
        }, 4000);
    }
    else { // received a non $ wheel slot
        hideKeys(); // disable keys
        hidePush(); // disable wheel 
        if (wheel.sText === "BANKRUPT") {
            setTimeout(function () {
                soundBankrupt.play();
                puzzle.triesLeft--;
                puzzle.puzzleScore = 0;
                showScore();
                bodyPart("remove");
            }, 5000);
        }
        if (wheel.sText === "LOSE TURN") {
            setTimeout(function () {
                soundBankrupt.play();
                puzzle.triesLeft--;
                showScore();
                bodyPart("remove");
            }, 5000);                
        }
        if (wheel.sText === "FREE TURN") {
            setTimeout(function () {
                soundWand.play();
                if (puzzle.triesLeft < 10) {
                    bodyPart("add");
                    puzzle.triesLeft++;
                }
                showPush();
                showScore();
            }, 5000); 
        }
        if (puzzle.triesLeft === 0) {
            setTimeout(function () {
                if (puzzle.puzzleStatus === "loss") { roundLoss(); }
                puzzle.puzzleStatus = "loss"; /* puzzle NOT solved */
            }, 1000);            
        }
        else { showPush(); }
    }
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

        setTimeout(function () {
            e.style.backgroundColor = "#dc3545";
            e.style.borderColor = "#dc3545";
        }, 2000);
        
        soundDing.play(); // sounds a ding for number of letters in puzzle
        puzzle.puzzleScore += wheel.sValue; // increments puzzle score with ding sounds 
        for (i = 0; i < matches - 1; ++i) {
            setTimeout(function () {
                puzzle.puzzleScore += wheel.sValue;
                sndPlay(snd.ding); // must create a new audio object each iteration to avoid timing issue
                dispRound.textContent = puzzle.puzzleScore; // increments puzzle score with ding sounds 
            }, time);
            time += 1000;
        }
        setTimeout(function () {
            e.style.color ="#000000"
            showScore();
        }, time);
        time += 4000;
        if (puzzle.correct === puzzle.unique) { /* puzzle solved */
            puzzle.puzzleStatus = "win";
            hideKeys();
            hidePush();
        }
    }
    else {  // bad guess
        e.style.color ="#000000"
        soundBuzzer.play()
        puzzle.incorrect++;
        puzzle.triesLeft--;
        bodyPart("remove");  
        showScore()
        if (puzzle.triesLeft === 0) {
            puzzle.puzzleStatus = "loss"; /* puzzle NOT solved */
            hideKeys();
            hidePush();
        }
    }
    showScore()
    letters.makeVisible(guess);
    letters.setBoard();
    dispBoard.textContent = letters.board;
    setTimeout(function () {
        if (puzzle.puzzleStatus === "loss") { roundLoss(); }
        if (puzzle.puzzleStatus === "win") { roundWin(); }
    }, 1000);
}