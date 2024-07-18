
function playSound() {
        const audio = new Audio ("./vine-boom.wav");
        audio.play();
}
function playSoundPaddle() {
    const audio = new Audio ("./taco-bell-bong-sfx.wav");
    audio.play();
}

let rotation = 15;
let rotationMultiplier = 1;

class Ball {
    constructor(x, y, vx, vy, r, c) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = 23;
        this.c = c;
        this.inPlay = false;
    }



    draw(ctx) {
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        // ctx.stroke();
        // ctx.fill();
        var ball = document.getElementById("ball");
        // rotation += 15;
        // document.querySelector("#ball").style.transform = 'rotate(' + rotation + 'deg)';
        // ctx.drawImage(ballImg, this.x, this.y);
        // ctx.restore();

        // Draw the rotated image
        rotation += 1;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((rotationMultiplier * rotation * Math.PI) / 360);
        ctx.drawImage(ball, -25, -21);//this.x, this.y);
        // ctx.rotate((-20 * Math.PI) / 180);
        // ctx.translate(this.x, this.y);
    
    // Restore the rotation and translation
        ctx.restore();

    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    

    bounce(things) {
        this.bounceWalls()

        for (let thing of things) {
            if (thing instanceof Paddle) {
                if (thing.side == SIDE.LEFT) {
                    let side = this.bounceLeftPaddle (thing);
                    if (side != SIDE.NONE) return side;
                }
                if (thing.side == SIDE.RIGHT) {
                    let side = this.bounceRightPaddle (thing);
                    if (side != SIDE.NONE) return side;
                }
            }
        }
        return SIDE.NONE ;
    }
    


    bounceWalls() {
        if (this.y - this.r < 0) {
            this.vy = Math.abs(this.vy);
            playSound();
        }
        if (this.y + this.r > boardHeight) {
            this.vy = -Math.abs(this.vy);
            playSound();
        }
    }

    bounceLeftPaddle(paddle) {
        
        if (this.x - this.r > paddle.w) return SIDE.NONE;
        if (this.x - this.r < 0) return SIDE.RIGHT; //sm1 get point
        if (this.y < paddle.y) return SIDE.NONE;
        if (this.y > paddle.y + paddle.l) return SIDE.NONE;
        if (this.vx < 0) {
            this.vx = paddleForce * Math.abs(this.vx);
                // add other spin, etc
                rotationMultiplier += 0.15;
                playSoundPaddle();
                myConfetti({ particleCount: Math.random()*500, spread: Math.random()*500 });

            }
        return SIDE.NONE;
    }

    bounceRightPaddle(paddle) {
        if (this.x + this.r < paddle.x) return SIDE.NONE;
        if (this.x + this.r > paddle.x + paddle.w) return SIDE.LEFT; //sm1 get point
        if (this.y < paddle.y) return SIDE.NONE;
        if (this.y > paddle.y + paddle.l) return SIDE.NONE;
        if (this.vx > 0) {
            this.vx = -paddleForce * Math.abs(this.vx);
                // add other spin, etc
                //add sound?
                rotationMultiplier += 0.15;
                playSoundPaddle();
                myConfetti({ particleCount: Math.random()*500, spread: Math.random()*500 });


        }
        return SIDE.NONE;
    }
}

