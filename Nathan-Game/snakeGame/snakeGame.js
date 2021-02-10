//function for making a random number.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//variables
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
var blockPos = [
    [randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],
    [randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],
];
var blockTimer = 0;
var blockSize = 15;
var score = 0;
var right = false;
var turnRight = true;
var left = false;
var turnLeft = false;
var up = false;
var turnUp = false;
var down = false;
var turnDown = false;
var lose = false;
var win = false;
var turn = false;
var speed = 100;
var changeSpeed = 0;
var normalMode = true;
var blockMode = false;
var speedMode = false;
var blockSpeedMode = false;
var restart = false;
var interval = [
    setInterval(drawing, speed),
];

//gets images for apple
var appleSrc = 'pictures/snakeApple.png';
var appleObj = new Image();
appleObj.src = appleSrc;

//gets image for head
var upSrc = 'pictures/headUp.png';
var upObj = new Image();
var downSrc = 'pictures/headDown.png';
var downObj = new Image();
var rightSrc = 'pictures/headRight.png';
var rightObj = new Image();
var leftSrc = 'pictures/headLeft.png';
var leftObj = new Image();
upObj.src = upSrc;
downObj.src = downSrc;
rightObj.src = rightSrc;
leftObj.src = leftSrc;

//gets image for tail
var tailUpSrc = 'pictures/tail-up.png';
var tailUpObj = new Image();
var tailDownSrc = 'pictures/tail-down.png';
var tailDownObj = new Image();
var tailRightSrc = 'pictures/tail-right.png';
var tailRightObj = new Image();
var tailLeftSrc = 'pictures/tail-left.png';
var tailLeftObj = new Image();
tailUpObj.src = tailUpSrc;
tailDownObj.src = tailDownSrc;
tailRightObj.src = tailRightSrc;
tailLeftObj.src = tailLeftSrc;

//displays score underneath game.
document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";

//makes arrow keys or WASD work.
document.addEventListener("keydown", keyDownHandler, false);

//makes restart button restart game.
document.getElementById("restarting").addEventListener("click", function(){
    score = 0;
    lose = false;
    win = false;
    speed = 100;
    appleX = randomNumber(1, 40) * 15;
    appleY = randomNumber(1, 40) * 15;
    blockPos = [
    [randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],
    [randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],
    ];
    snakePos = [
    [300, 300],
    [285, 300],
    [270, 300],
    [255, 300],
    ];
    blockTimer = 0;
    turnRight = true;
    turnLeft = false;
    turnUp = false;
    turnDown = false;
    right = false;
    left = false;
    up = false;
    down = false;
    turn = false;
    clearInterval(interval);
    interval.splice(0, 1, setInterval(drawing, speed));
});

//changes mode when button is clicked.
document.getElementById("modeSwitch").addEventListener("click", function(){
    speed = 100;
    clearInterval(interval);
    interval.splice(0, 1, setInterval(drawing, speed));
    score = 0;
    lose = false;
    win = false;
    appleX = randomNumber(1, 40) * 15;
    appleY = randomNumber(1, 40) * 15;
    blockPos = [
        [randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],
        [randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],
    ];
    snakePos = [
        [300, 300],
        [285, 300],
        [270, 300],
        [255, 300],
    ];
    blockTimer = 0;
    changeSpeed = 0;
    turnRight = true;
    turnLeft = false;
    turnUp = false;
    turnDown = false;
    right = false;
    left = false;
    up = false;
    down = false;
    turn = false;
    if(normalMode){
        blockMode = true;
        normalMode = false;
        document.getElementById("mode").innerHTML = "<h4>Block Mode</h4>";
    }
    else if(blockMode){
        blockMode = false;
        speedMode = true;
        document.getElementById("mode").innerHTML = "<h4>Speed Mode</h4>";
        speed = 75;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(speedMode){
        speedMode = false;
        blockSpeedMode = true;
        document.getElementById("mode").innerHTML = "<h4>Block Speed Mode</h4>";
        speed = 75;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(blockSpeedMode){
        blockSpeedMode = false;
        normalMode = true;
        document.getElementById("mode").innerHTML = "<h4>Normal Mode</h4>";
    }
});

//function for changing direction
function keyDownHandler(e) {
    if(e.key == "ArrowRight" || e.key == "d") {
        e.preventDefault();
        if(!left && !right && !turn){
            right = true;
            left = false;
            up = false;
            down = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowLeft" || e.key == "a") {
        e.preventDefault();
        if(!right && !left && !turn) {
            if(up || down){
                left = true;
                right = false;
                up = false;
                down = false;
                turn = true;
            }
        }
    }
    else if(e.key == "ArrowUp" || e.key == "w") {
        e.preventDefault();
        if(!down && !up && !turn) {
            up = true;
            down = false;
            right = false;
            left = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowDown" || e.key == "s") {
        e.preventDefault();
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
    //draws head based on direction.
    if(turnRight){
        ctx.drawImage(rightObj, snakePos[0][0], snakePos[0][1] - 1, snakeSize + 3, snakeSize + 3);
    }
    if(turnLeft){
        ctx.drawImage(leftObj, snakePos[0][0], snakePos[0][1] - 1, snakeSize + 3, snakeSize + 3);
    }
    if(turnUp){
        ctx.drawImage(upObj, snakePos[0][0] - 1, snakePos[0][1], snakeSize + 3, snakeSize + 3);
    }
    if(turnDown){
        ctx.drawImage(downObj, snakePos[0][0] - 1, snakePos[0][1], snakeSize + 3, snakeSize + 3);
    }
    //draws tail based on 2nd to last and last items in snakePos array.
    if(snakePos[snakePos.length - 2][0] + 15 == snakePos[snakePos.length - 1][0]) {
        ctx.drawImage(tailLeftObj, snakePos[snakePos.length - 1][0], snakePos[snakePos.length - 1][1] - 1.5, snakeSize + 3, snakeSize + 3);
    }
    if(snakePos[snakePos.length - 2][0] - 15 == snakePos[snakePos.length - 1][0]) {
        ctx.drawImage(tailRightObj, snakePos[snakePos.length - 1][0], snakePos[snakePos.length - 1][1] - 1.5, snakeSize + 3, snakeSize + 3);
    }
    if(snakePos[snakePos.length - 2][1] + 15 == snakePos[snakePos.length - 1][1]) {
        ctx.drawImage(tailUpObj, snakePos[snakePos.length - 1][0] - 1.5, snakePos[snakePos.length - 1][1], snakeSize + 3, snakeSize + 3);
    }
    if(snakePos[snakePos.length - 2][1] - 15 == snakePos[snakePos.length - 1][1]) {
        ctx.drawImage(tailDownObj, snakePos[snakePos.length - 1][0] - 1.5, snakePos[snakePos.length - 1][1], snakeSize + 3, snakeSize + 3);
    }
    for(var i = 0; i < snakePos.length; i++){
        ctx.beginPath();
        for(var i = 1; i < snakePos.length - 1; i++) {
            ctx.rect(snakePos[i][0], snakePos[i][1], snakeSize, snakeSize);
        }
        ctx.fillStyle = "darkgreen";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        for(var i = 1; i < snakePos.length - 1; i++) {
            ctx.strokeRect(snakePos[i][0], snakePos[i][1], snakeSize, snakeSize);
        }
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}

//draws apple at random x and y.
function drawApple() {
    ctx.drawImage(appleObj, appleX, appleY, appleSize, appleSize);
}
//draws block mode.
function drawBlock() {
    ctx.beginPath();
    for(var i = 0; i <= blockPos.length - 1; i++){
        ctx.rect(blockPos[i][0], blockPos[i][1], blockSize, blockSize);
    }
    ctx.fillStyle = "black";
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
//types "You lose" on canvas.
function drawLose() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("You Lose!!!", canvas.width / 2 - 119, canvas.height / 2);
}
//types "You win" on canvas
function drawWin() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("You Win!!!!", canvas.width / 2 - 126, canvas.height / 2);
}
//draw function, draws 4 long snake, apple, and background each time it is called.
function draw() {
    drawBackground();
    drawApple();
    drawSnake();
    //if it's block mode, it draws the blocks.
    if(blockMode || blockSpeedMode) {
        drawBlock();
    }
    if(lose) {
        drawLose();
    }
    if(win) {
        drawWin();
    }
    if(snakePos.length == 1600){
        win = true;
    }

    if(blockMode || blockSpeedMode){
        //if a block is drawn on the snake, it changes coordinates.
        for(var i = 1; i < snakePos.length; i++) {
            for(var j = 1; j < blockPos.length; j++){
                if(blockPos[j][0] == snakePos[i][0] && blockPos[j][1] == snakePos[i][1]) {
                    blockPos.splice(j, 1, [randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],);
                }
            }
        }
        //if apple is on block, then it moves.
        for(var i = 0; i < blockPos.length; i++){
            if(appleX == blockPos[i][0] && appleY == blockPos[i][1]){
                appleX = randomNumber(1, 40) * 15;
                appleY = randomNumber(1, 40) * 15;
            }
        }
        //code for adding another block
        if(blockTimer == 5){
            blockPos.push([randomNumber(1, 40) * 15, randomNumber(1, 40) * 15],);
            blockTimer = 0;
        }
    }

    //if apple is on snake, it moves.
    for(var i = 1; i < snakePos.length - 1; i++){
        if(appleX == snakePos[i][0] && appleY == snakePos[i][1]){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
        }
    }
}

//function for moving.
function move(){
    //snake moves based on the arrow keys pushed.
    if(right == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            score++;
            blockTimer++;
            changeSpeed++;
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
                turnRight = true;
                turnLeft = false;
                turnDown = false;
                turnUp = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
                snakePos.pop();
            }
        }
    }
    else if(left == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            changeSpeed++;
            blockTimer++;
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
                turnLeft = true;
                turnDown = false;
                turnRight = false;
                turnUp = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
                snakePos.pop();
            }
        }
    }
    else if(up == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            blockTimer++;
            changeSpeed++;
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
                turnUp = true;
                turnLeft = false;
                turnDown = false;
                turnRight = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
                snakePos.pop();
            }
        }
    }
    else if(down == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            blockTimer++;
            changeSpeed++;
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
                turnDown = true;
                turnLeft = false;
                turnRight = false;
                turnUp = false;
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
                snakePos.pop();
            }
        }
    }
    //you get faster as you get longer.
    if(speedMode || blockSpeedMode){
        if(changeSpeed == 5){
            speed -= 2;
            changeSpeed = 0;
            clearInterval(interval);
            interval.splice(0, 1, setInterval(drawing, speed));
        }
    }else{
        if(changeSpeed == 15){
            speed -= 2;
            changeSpeed = 0;
            clearInterval(interval);
            interval.splice(0, 1, setInterval(drawing, speed));
        }
    }
}

//function for checking if the player has lost.
function loseCheck() {
    //if snake hits walls, it dies.
    if(snakePos[0][0] > 599 || snakePos[0][0] < 0 || snakePos[0][1] < 0 || snakePos[0][1] > 599) {
        lose = true;
    }

    //if snake hits a block, it dies.
    if(blockMode || blockSpeedMode){
    for(var i = 0; i <= blockPos.length - 1; i++) {
            if(snakePos[0][0] == blockPos[i][0] && snakePos[0][1] == blockPos[i][1]) {
                lose = true;
            }
        }
    }

    //if snake hits itself, it dies.
    for(var i = 1; i < snakePos.length; i++) {
        if(snakePos[0][0] == snakePos[i][0] && snakePos[0][1] == snakePos[i][1]){
            lose = true;
        }
    }
}

//function that calls draw, move, and check functions..
function drawing() {
    if(!lose){
        move();
        loseCheck();
        if(!lose && !win){
            draw();
        }else if(lose){
            drawLose();
        }
        else if(win){
            drawWin();
        }
    }
}
