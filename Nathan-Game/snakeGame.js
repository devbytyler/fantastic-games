function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var snakeWidth = 15;
var snakeHeight = 15;
var snakeX = 300;
var snakeY = 300;
var appleWidth = 13;
var appleHeight = 13;
var appleX = randomNumber(1, 586);
var appleY = randomNumber(1, 586);
var score = 0;

function drawSnake() {
    ctx.beginPath();
    ctx.rect(snakeX, snakeY, snakeWidth, snakeHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function drawApple() {
    ctx.beginPath();
    ctx.rect(appleX, appleY, appleWidth, appleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    drawSnake();
    snakeX = snakeX - 15;
    drawSnake();
    snakeX = snakeX - 15;
    drawSnake();
    snakeX = snakeX - 15;
    drawSnake();
    drawApple();
}

draw();
