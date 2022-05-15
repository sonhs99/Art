const FRAME = 10;
const DEGREE = 30;

function random(min, max) {
    return min + Math.floor(Math.random()*(max - min));
}

export class Tree {
    constructor(ctx, X, Y, color, depth){
        this.ctx = ctx;
        this.X = X;
        this.Y = Y;
        this.color = color;
        this.root = new Branch(X, Y, -90, random(10, 13) * depth, color, depth, 0);
        this.flag = false;

        this.draw()
    }

    draw(){
        if(this.flag){
            cancelAnimationFrame(this.animation);
        }
        this.flag = this.root.draw(this.ctx);
        this.animation = window.requestAnimationFrame(this.draw.bind(this));
    }
}

export class Color {
    constructor(red, green, blue){
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    toString(){
        return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
    }
}

class Branch {
    constructor(startX, startY, degree, length, color, depth, level){
        this.startX = this.currentX = startX;
        this.startY = this.currentY = startY;
        this.degree = degree;
        const theta = degree * Math.PI / 180
        this.gapX = length * Math.cos(theta) / FRAME;
        this.gapY = length * Math.sin(theta) / FRAME;
        this.frame = 0;

        this.color = color;
        this.depth = depth;
        this.level = level;

        this.child = [];
    }

    draw(ctx) {
        if(this.frame == FRAME) {
            var flag = true;
            if(this.child.length == 0 && this.depth != 0){
                this.child.push(
                    new Branch(this.currentX, 
                        this.currentY, 
                        this.degree + random(DEGREE/2, DEGREE), 
                        random(0, 11)*this.depth, this.color,
                        this.depth-1, this.level+1)
                );
                this.child.push(
                    new Branch(this.currentX, 
                        this.currentY, 
                        this.degree - random(DEGREE/2, DEGREE), 
                        random(0, 11)*this.depth, this.color,
                        this.depth-1, this.level+1)
                );
            }
            for(var branch of this.child) {
                flag = branch.draw(ctx)
            }
            return flag;
        }
        ctx.beginPath();
        this.currentX += this.gapX; this.currentY += this.gapY;
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);

        if(this.depth < 3){
            ctx.lineWidth = 0.5;
        } else if(this.depth < 5){
            ctx.lineWidth = this.depth * 0.5;
        } else if(this.depth < 7){
            ctx.lineWidth = this.depth * 0.7;
        } else if(this.depth < 9){
            ctx.lineWidth = this.depth * 0.9;
        } else {
            ctx.lineWidth = this.depth;
        }
        const size = this.level + this.depth;
        const color = new Color(
            Math.floor((this.color.red * this.level + 255 * this.depth) / size),
            Math.floor((this.color.green * this.level + 255 * this.depth) / size),
            Math.floor((this.color.blue * this.level + 255 * this.depth) / size),
        )
        ctx.fillStyle = color.toString();
        ctx.strokeStyle = color.toString();
        ctx.stroke();
        ctx.closePath();
        this.frame++;
        return false;
    }
}