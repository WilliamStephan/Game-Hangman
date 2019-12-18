// word array[WORD][USED-FLAG]
let hangWord = [
    ['bloodcurdling', 0],
    ['schizophrenia', 0],
    ['contamination', 0],
    ['flabbergasted', 0],
    ['justification', 0],
    ['globalization', 0],
    ['consciousness', 0],
    ['weightlifting', 0],
    ['communication', 0],
    ['mathematician', 0],
    ['razzamatazzes', 0],
    ['hypothesizing', 0],
    ['maximizations', 0],
];

var Game = {
    wins: 0,
    losses: 0,
    round: 0,
    good: 0,
    bad: 0,
    dup: 0,
    wordsLeft: 0,
    maxRounds: 13,
    triesAllowed: 7
};

var Round = {
    tries: 0,
    correct: 0,
    keys: 0,
};


// vars game
const maxLetters = 13;
let wins = 0;
let losses = 0;
let wordsLeft = hangWord.length;
let tries = 7;
let correct = 0;
let keys = 0;
let duplicate = 0;
let round = 0;
let wordLength;
let word;

let dictionary = [
    { word: "terrace", used: false },
    { word: "literature", used: false },
    { word: "devote", used: false }
];

// picks a random word from array hangWord[][] and disables for future
function pickWord() {
    --wordsLeft;
    
    console.log("wordsLeft: " + wordsLeft)
    if (wordsLeft > 0) {
        let n = 0;
        do {
            n++
            let randPick = Math.floor(Math.random() * hangWord.length);
            if (hangWord[randPick][1] === 0) {
                hangWord[randPick][1] = 1; // sets array element to used
                alert(`${hangWord[randPick][0].toUpperCase()}`)
                return `${hangWord[randPick][0].toUpperCase()}`;
            }
        }
        while (n < (10 * hangWord.length)); // error trap - stops processing if there's a bug
        return null;
    }
    else { // game over - all words cycled
        // reset game
    }
}

// mouse click letter (validate choice)
function process_Key(clicked) { // letter clicked
    let element = document.getElementById(clicked); // use letter clicked as ID
    if (element.classList.contains("disabled")) { // check if duplicate
        // duplicate letter
        duplicate++ // increment if duplicate
        showStats()
        return; // return value - not sure yet
    }
    else {
        // new letter 
        processGuess(clicked); // new letter choice - process
        showStats()
        return;  // return value - not sure yet
    }
}

// keystroke letter (validate choice)
document.onkeyup = function (pressed) {  // key pressed
    if (pressed.keyCode === 27) { return -1; } // captures esc key
    // only A-Z
    if (pressed.key.toLocaleUpperCase().charCodeAt(0) >= 65 && pressed.key.toLocaleUpperCase().charCodeAt(0) <= 132) { // process only alpha 
        let element = document.getElementById(pressed.key.toLocaleUpperCase()); // use letter typed as ID
        if (element.classList.contains("disabled")) { // if disabled then duplicate
            //duplicate letter
            duplicate++; // increment duplicate
            showStats()
            return null; // new letter choice - process
        }
        else {
            // new letter
            processGuess(pressed.key.toLocaleUpperCase()); // new letter choice - process
            showStats()
            return; // return value - not sure yet
        }
    }
}

// process valid choice
function processGuess(guess) {
    let element = document.getElementById(guess);
    let goodGuess = false;
    keys++;
    element.classList.add("disabled");
    for (let i = 0; i < word.length; i++) { // iterating through letters 
        if (word.substring(i, i + 1) === guess) { // execute if letter match
            document.getElementById(i).style.color = '#ffffff'; // showing if match
            correct++;
            goodGuess = true;
        }
    }
    if (goodGuess === false) { // execute if no match
        tries--; // bad pick animation here
        if (tries <= 0) { // loss
            losses++;
            showStats()
            document.getElementById("bigNews").innerHTML = "You Lost! Not your lucky 13!";
            if (round === hangWord.length) {resetVars("G");}
            else {resetVars("R");}
        }
    }

    if (correct === wordLength) { // win 
        wins++;
        showStats()
        document.getElementById("bigNews").innerHTML = "You Won! Congrats!";
        setTimeout(document.getElementById("bigNews").innerHTML = "New Round!", 2000);
        if (round === hangWord.length) {resetVars("G");}
        else {resetVars("R");}
    }
    showStats()
    
    
}

// displays game variables
function showStats() {
    document.getElementById("tries").innerHTML = tries;
    document.getElementById("word-p").innerHTML = Math.round(100*correct/13) +"%";
    document.getElementById("key-used").innerHTML = Math.round(100*keys/26) +"%";
    document.getElementById("record").innerHTML = "W-" + wins + " / L-" + losses;
    document.getElementById("round").innerHTML = round +" of " +hangWord.length;
    document.getElementById("repeats").innerHTML = duplicate;
}

// color word buttons
function colorWord(fgColor, bgColor) {
    for (let i = 0; i < maxLetters; i++) {
        document.getElementById(i).style.background = bgColor;
        document.getElementById(i).style.color = fgColor;
    }
}


// reset variables
function resetVars(typeFlag) {
    if (typeFlag === "G") {
        wins = 0;
        losses = 0;
        wordsLeft = hangWord.length;
        duplicate = 0;
        round = 0;
        for (let i = 0; i < hangWord.length; i++) {
            console.log(hangWord[i]);
            hangWord[i][1] = 0;
        }
    }

    round++;
    tries = 7;
    correct = 0;
    keys = 0;   

    let elements = document.getElementsByClassName("key");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("disabled");
        console.log(elements[i]);
    }
    for (let i = 0; i < maxLetters; i++) {
        document.getElementById(i).value = "";
        document.getElementById(i).style.visibility = 'hidden';
    }
    word = pickWord();
    wordLength = word.length;
    for (let i = 0; i < maxLetters; i++) {
        if (i + 1 <= word.length) {
            document.getElementById(i).style.visibility = 'visible';
            document.getElementById(i).value = word.substring(i, i + 1);
        }
        else {
            document.getElementById(i).style.visibility = 'hidden';
        }
    }
    colorWord('black', 'black')
}



window.addEventListener("load", function () {
    resetVars("G");
    showStats();
});

/* document.getElementById("status").innerHTML = "You Win!";
        setTimeout(clearWord, 2000);
        resetVars();
        return "win";
 */