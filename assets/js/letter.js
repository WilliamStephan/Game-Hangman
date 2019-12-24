console.log("letter.js is linked");

class Letters {
    constructor(d2Array, visible) {
        this.letters = d2Array;
        this.visible = visible; // 0 = false, 1 = true (used ints to drive 2D Array)
        this.board;
    }

    // draws game board based on what visible
    setBoard() {
        var str = "";
        for (i = 0; i < this.visible.length; i++) {
            str += this.letters[i][this.visible[i]]; 
        }
        this.board = str;
    }

    // sets letters to display 
    makeVisible(char) { 
        var correctGuess = 0; 
        for (i = 0; i < this.visible.length; i++) {
            if ( char === this.letters[i][1] ) {
                if (this.visible[i] != 1) { // check if already selected
                    this.visible[i] = 1; 
                    correctGuess = 1; 
                }
                 
            }
        }
        return correctGuess;
    }
} 

function initLetters(str, arr) { // (puzzle text, array of 0's length of puzzle text)
    var d2Arr = createArray(str.length, 2); // 2D Array (display)
    
    for (i = 0; i < str.length; i++) { 
        if(str.charAt(i) === " ") {  // spaces are always set to visible            
            d2Arr[i][0] = " "; 
            d2Arr[i][1] = " ";
            arr[i] = 1;
        } 
        else { 
            d2Arr[i][0] = "_";
            d2Arr[i][1] = str.charAt(i);
        }
    }

    letters = new Letters(d2Arr, arr); 
    letters.setBoard();
} 