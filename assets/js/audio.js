console.log("audio.js is linked - preload wav files"); // timing issues creating audio objects on the fly.

const effect = [["ding", "assets/sound/ding.wav"], ["bankrupt", "assets/sound/bankrupt.wav"], ["spin", "assets/sound/spin.wav"], ["reveal", "assets/sound/reveal.wav"], ["solved", "assets/sound/solved.wav"], ["buzzer", "assets/sound/buzzer.wav"], ["wand", "assets/sound/wand.wav"], ["pluck", "assets/sound/pluck.wav"], ["bell", "assets/sound/bell.wav"]];

var snd = {}; // sound effects table for fast key access: snd.effect 
for (i = 0; i < effect.length; i++) {
    snd[effect[i][0]] = effect[i][1];
}

var soundBankrupt = new Audio();
soundBankrupt.src = snd.bankrupt;
soundBankrupt.preload = 'auto';

var soundBuzzer = new Audio();
soundBuzzer.src = snd.buzzer;
soundBuzzer.preload = 'auto';

var soundDing = new Audio();
soundDing.src = snd.ding;
soundDing.preload = 'auto';

var soundReveal = new Audio();
soundReveal.src = snd.reveal;
soundReveal.preload = 'auto';

var soundSpin = new Audio();
soundSpin.src = snd.spin;
soundSpin.preload = 'auto';

var soundWand = new Audio();
soundWand.src = snd.wand;
soundWand.preload = 'auto';

var soundSolved = new Audio();
soundSolved.src = snd.solved;
soundSolved.preload = 'auto';

var soundPluck = new Audio();
soundPluck.src = snd.pluck;
soundPluck.preload = 'auto';

var soundBell = new Audio();
soundBell.src = snd.bell;
soundBell.preload = 'auto';