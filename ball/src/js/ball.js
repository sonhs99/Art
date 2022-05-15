export class Ball {
    constructor(x, y, radius, speed, color) {
        this.radius = radius;
        this.color = color;

        const theta = (Math.random()*2 - 1) * Math.PI
        this.vx = speed * Math.cos(theta);
        this.vy = speed * Math.sin(theta);

        this.x = x;
        this.y = y;
    }

    draw(ctx, stageWidth, stageHeight, balls) {
        this.x += this.vx;
        this.y += this.vy;
        this.bounceWindow(stageWidth, stageHeight)
        for(var ball of balls) {
            if(ball === this){ continue; }
            this.bounceBall(ball);
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill()
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius
        const maxX = stageWidth - this.radius
        const minY = this.radius
        const maxY = stageHeight - this.radius

        if((this.x - minX <= 0 && this.vx <= 0) 
        || (this.x - maxX >= 0 && this.vx >= 0)) {
            this.vx *= -1;
            this.x += this.vx;
        } else if((this.y - minY <= 0 && this.vy <= 0) 
        || (this.y - maxY >= 0 && this.vy >= 0)) {
            this.vy *= -1;
            this.x += this.vy;
        }
    }

    bounceBall(ball) {
        const deltaX = ball.x - this.x;
        const deltaY = ball.y - this.y;
        const distance = ball.radius + this.radius;
        if(deltaX*deltaX + deltaY*deltaY <= distance*distance) {
            const t = (deltaX*this.vx + deltaY*this.vy)/(deltaX*deltaX + deltaY*deltaY)
            this.vx -= 2 * deltaX * t;
            this.vy -= 2 * deltaY * t;
            this.x += this.vx;
            this.y += this.vy;
        }
    }
}