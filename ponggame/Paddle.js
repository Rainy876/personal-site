const SIDE = {NONE: 0, LEFT:1, RIGHT:2};


class Paddle {
    constructor(x, y, l, w, side, c) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.w = w;
        this.side = side;
        this.c = c;
        this.vy = 0;


        this.imageL = document.getElementById("taco");
        this.imageR = document.getElementById("taco_r");
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.side === SIDE.LEFT) {
            ctx.drawImage(this.imageL, 0, 0, this.w + 25, this.l);
        } else if (this.side === SIDE.RIGHT) {
            ctx.drawImage(this.imageR, 0, 0, this.w + 25, this.l);
        }

        ctx.restore();
    }
    
    move(isCPU, ball) {
        if(isCPU) {
            // ball.y where the ball is
            // this.y where the paddle is
            // this.l how long the paddle is

            // control this.vy using ball
            // dpmt set this.y
            
            if (this.y + 50 > ball.y) {
                this.y-=Math.random()*1.75;
            } else {
                this.y+=Math.random()*1.75;
            }
            //this.y = ball.y;
        }
        this.y += this.vy;
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y + this.l > boardHeight) {
            this.y = boardHeight - this.l;
        }
    }
}