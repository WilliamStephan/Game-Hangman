console.log("appLib.js is linked - function library specifically for hangman game");


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
        start();
    }
    initPuzzle(game.game[game.randIndex[game.round]], game.rounds); // (random puzzle, fails allowed)
    initLetters(puzzle.puzzle, new Array(puzzle.puzzle.length).fill(0));

    // resets disabled key buttons and hide hangman stacked images 
    for (e of document.querySelectorAll('.keyboard')) e.classList.remove("disabled");
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


//play sound effect function 
function sndPlay(soundType) {
    var sound = new Audio(soundType);
    sound.play();
}

function highlightKey(char) {
    e = document.getElementById(char);
    oldBackground = e.style.backgroundColor;
    oldBorder = e.style.borderColor;
    oldColor = e.style.color
    e.style.backgroundColor = "#ffc107";
    e.style.borderColor = "#ffc107";
    e.style.color = "#000000";    

    setTimeout(function () {
        e.style.backgroundColor = "#007bff";
        e.style.borderColor = "#007bff";
        e.style.color = "#ffffff";  
    }, 1000);
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
    }
}


function showScore() {
    dispGame.textContent = Number(game.gameScore.toLocaleString('en'));
    dispRound.textContent = puzzle.puzzleScore;
}