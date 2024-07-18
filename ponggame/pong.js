const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const title = document.getElementById("title")
const ctx = gameboard.getContext("2d");
const STATE = {STARTUP: 0, PLAYING: 1, GAMEOVER: 2};

let state = STATE.STARTUP;

let boardWidth = 500;
let boardHeight = 500;
let paddleWidth = 25;
let paddleLength = 100;
let ballRadius = 12.5;
let paddleVelocity = 5;
let paddleForce = 1.1; //110% of speed before

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;



function clearBoard() {
    ctx.clearRect(0, 0, boardWidth, boardHeight)
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.roundRect(0, 0, boardWidth, boardHeight,[50]);
    ctx.stroke();
    ctx.fill();
}

function draw() {
    clearBoard();
    ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

function resetGame() {
    rotationMultiplier = 1;
    title.innerHTML = '<span style="color: purple;">PONG GAME</span>';

    scoreL = 0;
    scoreR = 0;
    scoreboard.innerHTML = `0 : 0`;
    state = STATE.STARTUP;
    clearInterval(intervalID);
    resetBall();
    paddleL = new Paddle(0,0,paddleLength,paddleWidth,SIDE.LEFT, "red");
    paddleR = new Paddle(boardWidth-paddleWidth-25,0,paddleLength,paddleWidth,SIDE.RIGHT, "brown",);
    document.body.style.background = "url('./images/Screenshot\ 2024-07-17\ 150346.png') no-repeat center center fixed"; // Replace with your new image URL
    document.body.style.backgroundSize = "cover";
    nextTick();
}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, 1, -1, ballRadius, "orange")
}

let intervalID;
function nextTick() {
    switch (state) {
        case STATE.STARTUP:
            state = STATE.PLAYING;
        
            break;
        case STATE.PLAYING:
            state = play();

            break;
        case STATE.GAMEOVER:
            state = STATE.GAMEOVER;
            break;
        default:
            state = STATE.STARTUP;
            break;
    }
    draw();
    intervalID = setTimeout(nextTick, 2);
}

function move() {
    paddleR.move(cpucheck.checked, ball);
}

function play() {
    paddleL.move(false, ball);
    // setTimeout(paddleR.move(cpucheck.checked, ball), 100);
    setTimeout(move, 0);
    let scoreSide = ball.bounce([paddleL, paddleR]);
    if (scoreSide != SIDE.NONE) {
        if (scoreSide == SIDE.LEFT) {scoreL++;}
        if (scoreSide == SIDE.RIGHT) {scoreR++;}
        updateScore();
        resetBall();
        if (scoreL >= 10 || scoreR >= 10){
            if (scoreL == 10) {
                title.innerHTML = ("RED Wins!");
                document.body.style.background = 'red';
            }
            else {
                title.innerHTML = ("Blue Wins!");
                document.body.style.background = 'blue';
            }


            return STATE.GAMEOVER
        };
    }
    ball.move();
    
    // Add serving the ball?
    // If a player wins, stop the game...
    return STATE.PLAYING;
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`; // 7 : 3
}
