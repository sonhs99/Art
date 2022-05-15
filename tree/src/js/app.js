import { Tree, Color } from './tree.js'
class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        // this.resizeRatio = window.

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('click', this.click.bind(this), false);
        this.resize();
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2; 
        this.ctx.scale(2, 2)

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }

    click(event){
        const { clientX } = event;
        const color = new Color(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
        )
        new Tree(this.ctx, clientX, this.stageHeight, color, 10);
    }
}

window.onload = () => {
    new App();
}