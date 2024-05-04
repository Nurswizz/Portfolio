const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const paddleWidth = 10;
const paddleHeight = 80;
const paddleSpeed = 10;
let player1Y = canvasHeight / 2 - paddleHeight / 2;
let player2Y = canvasHeight / 2 - paddleHeight / 2;
let ball = { x: canvasWidth / 2, y: canvasHeight / 2, radius: 8, speedX: 5, speedY: 5 };

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}


function update() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y + ball.radius > canvasHeight || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x - ball.radius < paddleWidth && ball.y > player1Y && ball.y < player1Y + paddleHeight ||
        ball.x + ball.radius > canvasWidth - paddleWidth && ball.y > player2Y && ball.y < player2Y + paddleHeight) {
        ball.speedX = -ball.speedX;
    }

    const centerPaddle2 = player2Y + paddleHeight / 2;
    if (centerPaddle2 < ball.y - 35) {
        player2Y += paddleSpeed;
    } else if (centerPaddle2 > ball.y + 35) {
        player2Y -= paddleSpeed;
    }


    if (keys.ArrowUp && player1Y > 0) {
        player1Y -= paddleSpeed;
    } else if (keys.ArrowDown && player1Y + paddleHeight < canvasHeight) {
        player1Y += paddleSpeed;
    }
}


function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#333';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvasWidth - paddleWidth, player2Y, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});


gameLoop();
