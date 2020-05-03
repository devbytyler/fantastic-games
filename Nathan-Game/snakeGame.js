//function for making a random number.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var snakeWidth = 15;
var snakeHeight = 15;
var snakeX = [300, 285, 270, 255];
var snakeY = [300, 300, 300, 300];
var appleWidth = 15;
var appleHeight = 15;
var appleX = randomNumber(1, 40) * 15;
var appleY = randomNumber(1, 40) * 15;
var score = 0;
var dx = 0;
var dy = 0;
var right = true;
var left = false;
var up = false;
var down = false;
var snakeSegments = 3;
var bw = 600;
var bh = 600;
var p = 0;
var score = 0;
var lose = false;


document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
function drawBoard(){
    for (var x = 0; x <= bw; x += 15) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 15) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "gray";
    ctx.stroke();
}

//makes arrow keys work.
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        if(dx == 0 && !right){
            right = true;
            left = false;
            up = false;
            down = false;
        }
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        if(dx == 0 && !left) {
            left = true;
            right = false;
            up = false;
            down = false;
        }
    }
    else if(e.key == "ArrowUp") {
        if(dy == 0 && !up) {
            up = true;
            down = false;
            right = false;
            left = false;
        }
    }
    else if(e.key == "ArrowDown") {
        if(dy == 0 && !down) {
            down = true;
            left = false;
            right = false;
            up = false;
        }
    }
}
//draws snake segments.
function drawSnake() {
    for(var i = 0; i < snakeSegments; i++)
        console.log(snakeX[0], snakeX[1], snakeX[2], snakeX[3], snakeY[0], snakeY[1], snakeY[2], snakeY[3],);
        ctx.beginPath();
        ctx.rect(snakeX[0], snakeY[0], snakeWidth, snakeHeight);
        ctx.rect(snakeX[1], snakeY[1], snakeWidth, snakeHeight);
        ctx.rect(snakeX[2], snakeY[2], snakeWidth, snakeHeight);
        ctx.rect(snakeX[3], snakeY[3], snakeWidth, snakeHeight);
        ctx.fillStyle = "darkgreen";
        ctx.fill();
        ctx.closePath();
}
//draws apple at random x and y.
function drawApple() {
    ctx.beginPath();
    ctx.rect(appleX, appleY, appleWidth, appleHeight);
    ctx.fillStyle = "darkred";
    ctx.fill();
    ctx.closePath();
}
//draws background.
function drawBackground() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawLose() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("You Lose!!!", canvas.width / 2 - 119, canvas.height / 2);
}
//draw function, draws 4 long snake, apple, and background each time it is called.
function draw() {
    drawBackground();
    drawBoard();
    drawSnake();
    drawApple();
    if(lose) {
        drawLose();
    }

    if(snakeX[0] == appleX && snakeY[0] == appleY){
        score++;
        snakeSegments++;
        document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
        appleX = randomNumber(1, 40) * 15;
        appleY = randomNumber(1, 40) * 15;
        snakeSegments++;
    }
    if(snakeX[0] > 600 || snakeX[0] < 0 || snakeY[0] < 0 || snakeY[0] > 600) {
        lose = true;
        right = false;
        left = false;
        up = false;
        down = false;
        dx = 0;
        dy = 0;
    }
    //snake moves based on the arrow keys pushed.
    if(right == true){
        dx = 15;
        dy = 0;
    }
    else if(left == true){
        dx = -15;
        dy = 0;
    }
    else if(up == true){
        dx = 0;
        dy = -15;
    }
    else if(down == true){
        dx = 0;
        dy = 15;
    }
    if(right || left){
        for(var i = 0; i < snakeX.length; i++) {
            snakeX[i] += dx;
        }
    }
    if(up || down) {
        for(var i = 0; i < snakeY.length; i++) {
           snakeY[i] += dy;
        }
    }

}
//sets interval for how often draw function is called.
var interval = setInterval(draw, 150);
