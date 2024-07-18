window.addEventListener("keydown", keyDown);
function keyDown(event) {
    const key = event.code;
    // console.log(`KEYDOWN: ${key}`);

    switch (key) {
        case "KeyW":
            paddleL.vy = -paddleVelocity;
            break;
        case "KeyS":
            paddleL.vy = +paddleVelocity;
            break;
        case "ArrowUp":
            paddleR.vy = -paddleVelocity;
            break;
        case "ArrowDown":
            paddleR.vy = +paddleVelocity;
            break;
        case "KeyR":
            paddleL = new Paddle(paddleL.x,paddleL.y,paddleLength * 2,paddleWidth,SIDE.LEFT, "red");console.log("pressed r");
            break;
        case "End":
            resetGame();
            break;
            
    }
}

window.addEventListener("keyup", keyUp);
function keyUp(event) {
    const key = event.code;
    // console.log(`KEYUP: ${key}`);

    switch (key) {
        case "KeyW":
        case "KeyS":
            paddleL.vy = 0;
            break;
        case "ArrowUp":
        case "ArrowDown":
            paddleR.vy = 0;
            break;
    }
}