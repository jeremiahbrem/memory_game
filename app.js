//create an array with a random order of the colors
function randomColors() {
    const colors = ['red','purple','blue','rgb(215, 250, 60)','brown','green','white','rgb(184,86,6)'];
    let random;
    let cardArray = [];             //new random ordered color array
    let counter = [0,0,0,0,0,0,0,0];       //used to count how many times each color selected
    for (let i = 0; cardArray.length < 16; i++) {
        random = Math.floor(Math.random() * 8);
        if (counter[random] < 2) {             //makes sure each color selected only twice
            cardArray.push(colors[random]);
            counter[random]++;
        }
    }
    counter = [0,0,0,0,0,0,0,0];
    return cardArray;    
}
// hide the cards with initial page load
const divs = document.querySelectorAll('div');
for (let dsp of divs) {
    dsp.style.display = 'none';
}
const newGame = document.querySelector('button');
const score = document.querySelector('#score');
const gameOver = document.querySelector('#game-over');
const lowScore = document.querySelector('#low-score');
let pairCount;
let card1;
let card2;
let guesses;
let clickCount;



newGame.addEventListener('click', function() {
    if (divs[0].style.display === 'none') {     //unhide cards
        for (let unhide of divs) {
            unhide.style.display = '';
        }
    }
    pairCount = 0;
    guesses = 0;
    clickCount = 0;
    cardColors = randomColors();
    gameOver.innerText = "";
    lowScore.innerText = localStorage.getItem('lowScore');
    guesses = 0;
    score.innerText = '0';

    for (let div of divs) {
        div.style.backgroundColor = 'gray';
    }
    for (let click of divs) {
        click.addEventListener('click', function(e) {
            if (e.target.style.backgroundColor === 'gray') {
                clickCount++;
                if (clickCount < 2) {
                    e.target.style.backgroundColor = cardColors[e.target.getAttribute('id')];  //using color array as
                    card1 = e.target;                                                          //reference for card colors 
                }    
                else if (clickCount === 2) {    
                    e.target.style.backgroundColor = cardColors[e.target.getAttribute('id')];
                    card2 = e.target;
                    if (card1.style.backgroundColor === card2.style.backgroundColor) {
                        guesses++;
                        score.innerText = `${guesses}`;
                        clickCount = 0;
                        pairCount++;
                        if (pairCount === 8) {       // shows game over and stores new low score if all pairs selected
                            gameOver.innerText = 'Game Over';
                            if (localStorage.getItem('lowScore') > guesses) {
                                localStorage.setItem('lowScore',guesses);
                                lowScore.innerText = guesses;
                            }    
                            else if (localStorage.getItem('lowScore') === null) {
                                localStorage.setItem('lowScore', guesses);
                                lowScore.innerText = guesses;
                            }
                        }    
                    }
                    else {              
                        guesses++;
                        score.innerText = `${guesses}`;
                        setTimeout(function(){
                            card1.style.backgroundColor = 'gray';
                            card2.style.backgroundColor = 'gray';                     
                            clickCount = 0;
                        }, 1000);
                    }    
                }
            }
        })      
    }        
})


