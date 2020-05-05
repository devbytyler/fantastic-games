//function for making a random number.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var snakeSize = 15;
var snakePos = [
    [300, 300],
    [285, 300],
    [270, 300],
    [255, 300],
];
var appleSize = 15;
var appleX = randomNumber(1, 40) * 15;
var appleY = randomNumber(1, 40) * 15;
var score = 0;
var right = true;
var left = false;
var up = false;
var down = false;
var bw = 600;
var bh = 600;
var p = 0;
var lose = false;
var win = false;
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
        if(!left && !right && !turn){
            right = true;
            left = false;
            up = false;
            down = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowLeft") {
        if(!right && !left && !turn) {
            left = true;
            right = false;
            up = false;
            down = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowUp") {
        if(!down && !up && !turn) {
            up = true;
            down = false;
            right = false;
            left = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowDown") {
        if(!up && !down && !turn) {
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
    for(var i = 0; i < snakePos.length; i++){
        ctx.beginPath();
        for(var i = 0; i < snakePos.length; i++) {
            ctx.rect(snakePos[i][0], snakePos[i][1], snakeSize, snakeSize);
        }
        ctx.fillStyle = "darkgreen";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        for(var i = 0; i < snakePos.length; i++) {
            ctx.strokeRect(snakePos[i][0], snakePos[i][1], snakeSize, snakeSize);
        }
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}
//draws apple at random x and y.
function drawApple() {
    ctx.beginPath();
    ctx.rect(appleX, appleY, appleSize, appleSize);
    ctx.fillStyle = "darkred";
    ctx.fill();
    ctx.closePath();
}
//draws background.
function drawBackground() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.closePath();
}
function drawLose() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("You Lose!!!", canvas.width / 2 - 119, canvas.height / 2);
}
function drawWin() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("You Win!!!!", canvas.width / 2 - 126, canvas.height / 2);
}
//draw function, draws 4 long snake, apple, and background each time it is called.
function draw() {
    drawBackground();
    drawSnake();
    drawApple();
    //drawBoard();
    if(lose) {
        drawLose();
    }
    if(win) {
        drawWin();
    }
    if(snakePos.length == 1600){
        win = true;
    }
    for(var i = 1; i < snakePos.length; i++) {
        if(snakePos[0][0] == snakePos[i][0] && snakePos[0][1] == snakePos[i][1]){
            lose = true;
        }
    }
    for(var i = 1; i < snakePos.length; i++) {
        if(appleX == snakePos[i][0] && appleY == snakePos[i][1]){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
        }
    }
    if(snakePos[0][0] > 599 || snakePos[0][0] < 0 || snakePos[0][1] < 0 || snakePos[0][1] > 599) {
        lose = true;
        right = false;
        left = false;
        up = false;
        down = false;
    }
    //snake moves based on the arrow keys pushed.
    if(right == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            score++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
        }
        else if(!lose && !win) {
            if(turn){
                snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
                snakePos.pop();
                turn = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
                snakePos.pop();
            }
        }
    }
    else if(left == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            score++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
        }
        else if(!lose && !win) {
            if(turn){
                snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
                snakePos.pop();
                turn = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
                snakePos.pop();
            }
        }
    }
    else if(up == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            score++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
        }
        else if(!lose && !win) {
            if(turn){
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
                snakePos.pop();
                turn = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
                snakePos.pop();
            }
        }
    }
    else if(down == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            score++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
        }
        else if(!lose && !win) {
            if(turn) {
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
                snakePos.pop();
                turn = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
                snakePos.pop();
            }
        }
    }
}
//sets interval for how often draw function is called.
var interval = setInterval(draw, 100);
