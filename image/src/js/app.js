const BRUSH = [
    [128, 200, 10, (ctx, x, y, color, size) => {
        ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x / 2, y / 2, size, 0, 2*Math.PI);
        ctx.stroke();
        ctx.closePath();
    }],
    [64, 100, 40, (ctx, x, y, color, size) => {
        ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.beginPath();
        ctx.arc(x / 2, y / 2, size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }],
    [256, 100, 40, (ctx, x, y, color, size) => {
        ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(x/2 - size, y/2 - size);
        ctx.lineTo(x/2 + size, y/2 + size);
        ctx.stroke();
        ctx.closePath();
    }],
    [256, 100, 40, (ctx, x, y, color, size) => {
        ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(x/2 - size, y/2 + size);
        ctx.lineTo(x/2 + size, y/2 - size);
        ctx.stroke();
        ctx.closePath();
    }],
    [256, 100, 40, (ctx, x, y, color, size) => {
        ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(x/2, y/2 - size);
        ctx.lineTo(x/2, y/2 + size);
        ctx.stroke();
        ctx.closePath();
    }],
    [256, 100, 40, (ctx, x, y, color, size) => {
        ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(x/2 - size, y/2);
        ctx.lineTo(x/2 + size, y/2);
        ctx.stroke();
        ctx.closePath();
    }],
    [128, 100, 40, (ctx, x, y, color, size) => {
        ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(x/2 - size, y/2 + size);
        ctx.lineTo(x/2 + size, y/2 - size);
        ctx.moveTo(x/2 - size, y/2 - size);
        ctx.lineTo(x/2 + size, y/2 + size);
        ctx.stroke();
        ctx.closePath();
    }],
    [128, 100, 40, (ctx, x, y, color, size) => {
        ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(x/2, y/2 - size);
        ctx.lineTo(x/2, y/2 + size);
        ctx.moveTo(x/2 - size, y/2);
        ctx.lineTo(x/2 + size, y/2);
        ctx.stroke();
        ctx.closePath();
    }],
]

function random(min, max) {
    return min + Math.floor(Math.random()*(max - min));
}

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.src_img = new Image();
        this.src_img.src = './src/img/img2.jpg';
        document.body.appendChild(this.canvas);

        this.src_img.onload = this.resize.bind(this)

        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('click', this.click.bind(this), false);
        this.resize();
        this.draw();
    }

    getPixel(x, y) {
        const idx = (y * this.originData.width + x) * 4;
        if(idx >= this.originData.data.length){
            console.log(x, y, idx, this.originData.data.length)
            console.log(this.originData.width, this.originData.height)
        }
        return [
            this.originData.data[idx],
            this.originData.data[idx + 1],
            this.originData.data[idx + 2],
        ]
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2; 
        this.ctx.scale(2, 2)

        this.ctx.drawImage(this.src_img, 0, 0, this.stageWidth, this.stageHeight);
        this.originData = this.ctx.getImageData(0, 0, this.stageWidth * 2, this.stageHeight * 2);
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        if(this.brush === undefined) this.brush = 0;
        this.size = BRUSH[this.brush][0];
        this.count = BRUSH[this.brush][1];
        this.iter = BRUSH[this.brush][2];
        if(this.animation == undefined) this.draw();
    }

    click(event) {
        let backup = this.ctx.getImageData(0, 0, this.stageWidth * 2, this.stageHeight * 2);
        this.ctx.drawImage(this.src_img, 0, 0, this.stageWidth, this.stageHeight);
        this.originData = this.ctx.getImageData(0, 0, this.stageWidth * 2, this.stageHeight * 2);
        this.ctx.putImageData(backup, 0, 0);

        if(this.brush === undefined) this.brush = 0;
        else this.brush = (this.brush + 1) % BRUSH.length;

        this.size = BRUSH[this.brush][0];
        this.count = BRUSH[this.brush][1];
        this.iter = BRUSH[this.brush][2];
        if(this.animation == undefined) this.draw();
    }

    draw() {
        if(this.size < 2) {
            cancelAnimationFrame(this.animation);
            this.animation = undefined;
            return;
        }
        if(this.count < 0) {
            this.count = BRUSH[this.brush][1]/4;
            this.size /= 4;
            this.iter *= 6;
        }
        for(let i = 0; i < this.iter; i++){
            var x = random(0, this.originData.width);
            var y = random(0, this.originData.height);
            var color = this.getPixel(x, y);
            var size = random(this.size/2, this.size*2);

            // this.ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            // this.ctx.beginPath();
            // this.ctx.arc(x / 2, y / 2, size, 0, 2*Math.PI);
            // this.ctx.stroke();
            // this.ctx.closePath();
            BRUSH[this.brush][3](this.ctx, x, y, color, size);
        }
        this.count--;

        this.animation = window.requestAnimationFrame(this.draw.bind(this));
    }
}

window.onload = () => {
    new App();
}