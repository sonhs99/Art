import {
    Ball
} from "./ball.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('click', this.click.bind(this), false);
        this.resize();

        this.balls = [];

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2; 
        this.ctx.scale(2, 2)
    }

    animate(t){
        window.requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
        for(var ball of this.balls){
            ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.balls)
        }
    }

    click(event){
        var rect = this.canvas.getBoundingClientRect()
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top; 
        var colorcode = '#' + Math.round(Math.random() * 0xFFFFFF).toString(16);
        this.balls.push(new Ball(x, y, 60, 15, colorcode));
    }
}

window.onload = () => {
    new App();
}