class Ball {  
    constructor(x, y, radius, color, dx, dy) {  
        this.x = x;  
        this.y = y;  
        this.radius = radius;  
        this.color = color;  
        this.dx = dx;  
        this.dy = dy;  
    }  
  
    draw(ctx) {  
        ctx.beginPath();  
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  
        ctx.fillStyle = this.color;  
        ctx.fill();  
        ctx.closePath();  
    }  
  
    update(canvasWidth, canvasHeight) {  
        this.x += this.dx;  
        this.y += this.dy;  
  
        // 检测是否撞到左右墙壁  
        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {  
            this.dx = -this.dx; // 反弹  
            this.changeColor(); // 变色  
        }  
  
        // 检测是否撞到上下墙壁  
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {  
            this.dy = -this.dy; // 反弹  
            this.changeColor(); // 变色  
        }  
    }  
  
    // 更改小球颜色的方法  
    changeColor() {  
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;  
    }  
}  
  
function animate() {  
    const canvas = document.getElementById('gameCanvas');  
    if (!canvas.getContext) {  
        console.error('Canvas not supported');  
        return;  
    }  
    const ctx = canvas.getContext('2d');  
  
    canvas.width = window.innerWidth;  
    canvas.height = window.innerHeight;  
  
    let balls = [];  
    const maxBalls = 25;  
  
    for (let i = 0; i < maxBalls; i++) {  
        const radius = 10;  
        const x = Math.random() * (canvas.width - 2 * radius) + radius;  
        const y = Math.random() * (canvas.height - 2 * radius) + radius;  
        const dx = (Math.random() - 0.5) * 4;  
        const dy = (Math.random() - 0.5) * 4;  
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;  
        balls.push(new Ball(x, y, radius, color, dx, dy));  
    }  
  
    function drawFrame() {  
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';  
        ctx.fillRect(0, 0, canvas.width, canvas.height);  
  
        balls.forEach(ball => {  
            ball.draw(ctx);  
            ball.update(canvas.width, canvas.height);  
        });  
  
        requestAnimationFrame(drawFrame);  
    }  
  
    drawFrame();  
}  
  
window.onload = animate;
