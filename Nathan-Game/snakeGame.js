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
var dx = [15, 15, 15, 15];
var dy = [0, 0, 0, 0];
var right = true;
var left = false;
var up = false;
var down = false;
var bw = 600;
var bh = 600;
var p = 0;
var score = 0;
var lose = false;
var turn = false;

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
    if(e.key == "ArrowRight") {
        if(!left && !right){
            right = true;
            left = false;
            up = false;
            down = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowLeft") {
        if(!right && !left) {
            left = true;
            right = false;
            up = false;
            down = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowUp") {
        if(!down && !up) {
            up = true;
            down = false;
            right = false;
            left = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowDown") {
        if(!up && !down) {
            down = true;
            left = false;
            right = false;
            up = false;
            turn = true;
        }
    }
}
//draws snake segments.
function drawSnake() {
    for(var i = 0; i < snakeX.length; i++){
        ctx.beginPath();
        for(var i = 0; i < snakeX.length; i++) {
            ctx.rect(snakeX[i], snakeY[i], snakeWidth, snakeHeight);
        }
        ctx.fillStyle = "darkgreen";
        ctx.fill();
        ctx.closePath();
    }
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
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
//draw function, draws 4 long snake, apple, and background each time it is called.
function draw() {
    drawBackground();
    drawSnake();
    drawApple();
    drawBoard();
    if(lose) {
        drawLose();
    }

    if(snakeX[0] == appleX && snakeY[0] == appleY){
        score++;
        document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
        appleX = randomNumber(1, 40) * 15;
        appleY = randomNumber(1, 40) * 15;
        if(up && !turn) {
            snakeX.push(snakeX[snakeX.length - 1]);
            snakeY.push(snakeY[snakeY.length - 1] + 15);
        }
        if(down && !turn) {
            snakeX.push(snakeX[snakeX.length - 1]);
            snakeY.push(snakeY[snakeY.length - 1] - 15);

        }
        if(left && !turn) {
            snakeX.push(snakeX[snakeX.length - 1] - 15);
            snakeY.push(snakeY[snakeY.length - 1]);
        }
        if(right && !turn) {
            snakeX.push(snakeX[snakeX.length - 1] + 15);
            snakeY.push(snakeY[snakeY.length - 1]);
        }
        dx.push(dx[dx.length - 1]);
        dy.push(dy[dy.length - 1]);
    }
    for(var i = 0; i < snakeX.length; i++) {
        if(appleX == snakeX[i] && appleY == snakeY[i]){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
        }
    }
    if(snakeX[0] > 599 || snakeX[0] < 1 || snakeY[0] < 1 || snakeY[0] > 599) {
        lose = true;
        right = false;
        left = false;
        up = false;
        down = false;
        for(var i = 0; i < snakeX.length; i++){
            dx[i] = 0;
            dy[i] = 0;
        }
    }
    function advance() {
        for(var i = 0; i < snakeX.length; i++) {
            snakeY[i] += dy[i];
            snakeX[i] += dx[i];
        }
    }
    //snake moves based on the arrow keys pushed.
    if(right == true){
        if(turn == true){
            for(var i = 0; i < dx.length; i++) {
                dx[i] = 15;
                dy[i] = 0;
                advance();
            }
            turn = false;
        }
        else {
            advance();
        }
    }
    else if(left == true){
        if(turn == true) {
            for(var i = 0; i < dx.length; i++) {
                dx[i] = -15;
                dy[i] = 0;
                advance();
            }
            turn = false;
        }
        else {
            advance();
        }
    }
    else if(up == true){
        if(turn == true) {
            for(var i = 0; i < dx.length; i++) {
                dx[i] = 0;
                dy[i] = -15;
                advance();
            }
            turn = false;
        }
        else {
            advance();
        }
    }
    else if(down == true){
        if(turn == true) {
            for(var i = 0; i < dx.length; i++) {
                dx[i] = 0;
                dy[i] = 15;
                advance();
            }
            turn = false;
        }
        else {
            advance();
        }
    }
}
//sets interval for how often draw function is called.
var interval = setInterval(draw, 150);
