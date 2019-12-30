console.log("appLib.js is linked - function library specifically for hangman game");

function newRound() {
    game.round++;
    if (debug) { console.log("round is: " + game.round) }
    if (game.round > 1) {
        game.correct += puzzle.correct;
        game.incorrect += puzzle.incorrect;
        game.gameScore += puzzle.puzzleScore;
        puzzle.puzzleScore = 0;
        showScore();
    }
    if (game.round === game.length) { // cycled through all puzzles - restart   
        start();
    }

    initPuzzle(game.game[game.randIndex[game.round]], 10); // (random puzzle)
    initLetters(puzzle.puzzle, new Array(puzzle.puzzle.length).fill(0));
    
    // resets disabled key buttons and hide hangman stacked images 
    for (e of document.querySelectorAll('.keyboard')) { 
        e.classList.remove("disabled");
        e.style.color = "#ffffff";
        e.style.backgroundColor = "#007bff";
    }
    for (e of document.querySelectorAll('.gallow')) e.style.visibility = 'hidden';
    
    dispBoard.textContent = letters.board;
    dispHint.textContent = game.hint[game.randIndex[game.round]];

    if (debug) { console.log(puzzle) };
    if (debug) { console.log(letters) };
}

function hideKeys() {
    for (e of document.querySelectorAll('.keyboard')) e.classList.add("disabled");
    keysEnabled = false;
}

function showKeys() {
    for (e of document.querySelectorAll('.keyboard')) e.classList.remove("disabled");
    puzzle.alpha.split('').forEach(function(char) {
        e = document.getElementById(char);
        e.classList.add("disabled");
        e.style.color = "black";
        e.style.backgroundColor = "#007bff";
    });
    keysEnabled = true;
}

function showPush() {
    e = document.getElementById('bk-nswheel');
    e.style.visibility = 'hidden';
    spinEnabled = true;
}

function hidePush() {
    e = document.getElementById('bk-nswheel');
    e.style.visibility = 'visible';
    spinEnabled = false;
}

//play sound effect function - uses an object created at time of use (for multiple iterations)
function sndPlay(soundType) {
    var sound = new Audio(soundType);
    sound.play();
}

function highlightKey(char) {
    e = document.getElementById(char);
    e.style.backgroundColor = "#ffc107";
    e.style.borderColor = "#ffc107";
    e.style.color = "#000000";    
}

function bodyPart(action) {
    if (action === "add") {
        e = document.getElementById('h-' + hangImgCount);
        e.style.visibility = 'hidden';
        hangImgCount--;
    }
    else {
        hangImgCount++;
        e = document.getElementById('h-' + hangImgCount);
        e.style.visibility = 'visible';
        if (hangImgCount === 10) {
            for (i = 0; i < 10; i++) {
                e = document.getElementById('h-' + i);
                e.style.visibility = 'hidden';
            }
            puzzle.puzzleStatus = "loss";
            return; 
        }
    }
}

function showScore() {
    dispGame.textContent = game.gameScore;
    dispRound.textContent = puzzle.puzzleScore;
    dispLeft.textContent = puzzle.triesLeft;
}

function roundWin() {
    letters.makeAllVisible();
    letters.setBoard();
    dispBoard.textContent = letters.board;
    setTimeout(function () {
        soundSolved.play();
    }, 2000);
    hideKeys()
    puzzle.complete = true;
    game.wins++;
    gallowsReset();  
    showScore();
    setTimeout(function () {
        newRound();
    }, 5000);
}

function roundLoss() {
    letters.makeAllVisible();
    letters.setBoard();
    dispBoard.textContent = letters.board;
    setTimeout(function () {
        soundReveal.play();
    }, 2000);

    hideKeys()
    puzzle.puzzleScore = 0;
    puzzle.complete = true;
    game.losses++;
    gallowsReset();
    setTimeout(function () {
        newRound();
    }, 5000);
}

function gallowsReset() {
    for (i = 0; i < 11; i++) {
        e = document.getElementById('h-' + i);
        e.style.visibility = 'hidden';
    }
    e = document.getElementById('h-0');
    e.style.visibility = 'visible';
}