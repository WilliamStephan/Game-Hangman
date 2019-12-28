console.log("game.js is linked")


class Game {
    constructor(game, hint) {
        this.game = game;
        this.hint = hint;
        this.randIndex;
        this.wins = 0;
        this.losses = 0;
        this.round = 0;
        this.rounds = 10;
        this.correct = 0;
        this.incorrect = 0;
        this.gameScore = 0;
    }
}

function initGame() {
    game = new Game(gameData.map(gameData => gameData.toUpperCase()), gameHint.map(gameData => gameData.toUpperCase()) );
    game.randIndex = randomIndex(gameData.length); // creates random index
}
