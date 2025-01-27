// GUIDELINES:
//  1. Give every variable/const smallest scope
//  2. Grab HTML elements by tag and store in const
//  3. Put all other code inside functions
const numField = document.getElementById("num-field");
const messageText = document.getElementById("message-text");
const guessesText = document.getElementById("guesses-text")

let secret;
let min = 1;
let max = 139;
let guesses = 10

var myConfetti = confetti.create(null, {
    resize: true,
    useWorker: true
});

function loadGame() {
    numField.min = min;
    numField.max = max;
    numField.value = max;
    secret = Math.random(); 
    secret = secret * (max-min+1);
    secret = secret + min;
    secret = Math.floor(secret);
    guesses = 10 
    guessesText.innerHTML = `You have ${guesses} guesses left`
}

function makeGuess() {
    let guess = parseInt(numField.value) 
    guesses-- 
    guessesText.innerHTML = `You have ${guesses} left`
    console.log(`guesses: ${guesses}`)
    console.log(`Guess: ${guess}`);
    if (guess < secret) {
        messageText.innerHTML = `${guess} is too low!!!! get better loser`;
    } else if (guess > secret) {
        messageText.innerHTML = `${guess} is too high!!!! get better loser`;
    } else if (guess == secret) {
        messageText.innerHTML = `${guess} is right! I bet you cheated tho`;
        myConfetti({
            particleCount: 10000,
            spread: 1000

        })
        loadGame( {
            
        })
    } else {
        messageText.innerHTML = `Invalid guess`;
    } 
    if (guesses===0) {
        alert(`You ran out of guesses!`)
        loadGame()  
    }
    
}
