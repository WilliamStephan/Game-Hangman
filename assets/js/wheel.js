console.log("wheel.js is linked");

class Wheel {
    constructor(slots) {
    this.wheel = slots;
    this.weights;
    this.slotRnd;
    this.totalWeight;
    this.spinLast = "NEW GAME!"
    }
    
    spin() {  
        this.spinLast = this.wheel[this.slotRnd[rndWeighted(this.weights)]];
        
        /* 
        e = document.getElementById('wheel')
        e.removeAttribute('style');
        var deg = 500 + 720;
        var css = 'transform: rotate(' + deg + 'deg);';
        e.setAttribute('style', css);
*/

    }
}

function initWheel(slotsArr, weightsArr) {
    wheel = new Wheel(slotsArr);
    wheel.weights = weightsArr;
    wheel.slotRnd = randomIndex(slotsArr.length)    
    wheel.totalWeight =  arrSum(wheel.weights);
}

/*

var img = document.querySelector('img');
img.addEventListener('click', onClick, false);


function onClick() {
    this.removeAttribute('style');
    
    var deg = 500 + Math.round(Math.random() * 500);
    
    var css = '-webkit-transform: rotate(' + deg + 'deg);';
    
    this.setAttribute(
        'style', css
    );
}

<img width="400" height="400" src="http://upload.wikimedia.org/wikipedia/commons/7/7d/European_roulette_wheel.svg" />



img {
    -webkit-transition: -webkit-transform 2s ease-out;
}

*/

