//function for making a random number.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var snakeSize = 15;
var snakePos = [
    [405, 255],
    [405, 270],
    [405, 285],
    [405, 300],
];
var snake2Pos = [
    [195, 255],
    [195, 270],
    [195, 285],
    [195, 300],
];
var appleSize = 15;
var appleX = randomNumber(1, 40) * 15;
var appleY = randomNumber(1, 40) * 15;
var apple2X = randomNumber(1, 40) * 15;
var apple2Y = randomNumber(1, 40) * 15;
var right = false;
var turnRight = false;
var left = false;
var turnLeft = false;
var up = false;
var turnUp = true;
var down = false;
var turnDown = false;
var right2 = false;
var turnRight2 = false;
var left2 = false;
var turnLeft2 = false;
var up2 = false;
var turnUp2 = true;
var down2 = false;
var turnDown2 = false;
var win = false;
var win2 = false;
var tie = false;
var turn = false;
var turn2 = false;
var speed = 100;
var restart = false;

//gets images for apple
var appleSrc = 'pictures/snakeApple.png';
var appleObj = new Image();
appleObj.src = appleSrc;

//Snake #1
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

//Snake #2
//gets image for head
var upSrc2 = 'pictures/headUp2.png';
var upObj2 = new Image();
var downSrc2 = 'pictures/headDown2.png';
var downObj2 = new Image();
var rightSrc2 = 'pictures/headRight2.png';
var rightObj2 = new Image();
var leftSrc2 = 'pictures/headLeft2.png';
var leftObj2 = new Image();
upObj2.src = upSrc2;
downObj2.src = downSrc2;
rightObj2.src = rightSrc2;
leftObj2.src = leftSrc2;

//gets image for tail
var tailUpSrc2 = 'pictures/tail-up2.png';
var tailUpObj2 = new Image();
var tailDownSrc2 = 'pictures/tail-down2.png';
var tailDownObj2 = new Image();
var tailRightSrc2 = 'pictures/tail-right2.png';
var tailRightObj2 = new Image();
var tailLeftSrc2 = 'pictures/tail-left2.png';
var tailLeftObj2 = new Image();
tailUpObj2.src = tailUpSrc2;
tailDownObj2.src = tailDownSrc2;
tailRightObj2.src = tailRightSrc2;
tailLeftObj2.src = tailLeftSrc2;

//makes arrow keys or WASD work.
document.addEventListener("keydown", keyDownHandler1, false);
document.addEventListener("keydown", keyDownHandler2, false);

//makes restart button restart game.
document.getElementById("restarting").addEventListener("click", function(){
    win = false;
    win2 = false;
    tie = false;
    speed = 100;
    appleX = randomNumber(1, 40) * 15;
    appleY = randomNumber(1, 40) * 15;
    apple2X = randomNumber(1, 40) * 15;
    apple2Y = randomNumber(1, 40) * 15;
    snakePos = [
        [405, 255],
        [405, 270],
        [405, 285],
        [405, 300],
    ];
    snake2Pos = [
        [195, 255],
        [195, 270],
        [195, 285],
        [195, 300],
    ];
    turnRight = false;
    turnLeft = false;
    turnUp = true;
    turnDown = false;
    right = false;
    left = false;
    up = false;
    down = false;
    turn = false;
    turn2 = false;
    turnRight2 = false;
    turnLeft2 = false;
    turnUp2 = true;
    turnDown2 = false;
    right2 = false;
    left2 = false;
    up2 = false;
    down2 = false;
    turn2 = false;
});

function keyDownHandler1(e) {
    if(e.key == "ArrowRight") {
        e.preventDefault();
        if(!left && !right && !turn){
            right = true;
            left = false;
            up = false;
            down = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowLeft") {
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
    else if(e.key == "ArrowUp") {
        e.preventDefault();
        if(!down && !up && !turn) {
            up = true;
            down = false;
            right = false;
            left = false;
            turn = true;
        }
    }
    else if(e.key == "ArrowDown") {
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
function keyDownHandler2(e) {
    if(e.key == "d") {
        if(!left2 && !right2 && !turn2){
            right2 = true;
            left2 = false;
            up2 = false;
            down2 = false;
            turn2 = true;
        }
    }
    else if(e.key == "a") {
        if(!right2 && !left2 && !turn2) {
            if(up2 || down2){
                left2 = true;
                right2 = false;
                up2 = false;
                down2 = false;
                turn2 = true;
            }
        }
    }
    else if(e.key == "w") {
        if(!down2 && !up2 && !turn2) {
            up2 = true;
            down2 = false;
            right2 = false;
            left2 = false;
            turn2 = true;
        }
    }
    else if(e.key == "s") {
        if(!up2 && !down2 && !turn2) {
            down2 = true;
            left2 = false;
            right2 = false;
            up2 = false;
            turn2 = true;
        }
    }
}
//draws snake segments.
function drawSnake1() {
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
function drawSnake2() {
    //draws head based on direction.
    if(turnRight2){
        ctx.drawImage(rightObj2, snake2Pos[0][0], snake2Pos[0][1] - 1, snakeSize + 3, snakeSize + 3);
    }
    if(turnLeft2){
        ctx.drawImage(leftObj2, snake2Pos[0][0], snake2Pos[0][1] - 1, snakeSize + 3, snakeSize + 3);
    }
    if(turnUp2){
        ctx.drawImage(upObj2, snake2Pos[0][0] - 1, snake2Pos[0][1], snakeSize + 3, snakeSize + 3);
    }
    if(turnDown2){
        ctx.drawImage(downObj2, snake2Pos[0][0] - 1, snake2Pos[0][1], snakeSize + 3, snakeSize + 3);
    }
    if(snake2Pos[snake2Pos.length - 2][0] + 15 == snake2Pos[snake2Pos.length - 1][0]) {
        ctx.drawImage(tailLeftObj2, snake2Pos[snake2Pos.length - 1][0], snake2Pos[snake2Pos.length - 1][1] - 1.5, snakeSize + 3, snakeSize + 3);
    }
    if(snake2Pos[snake2Pos.length - 2][0] - 15 == snake2Pos[snake2Pos.length - 1][0]) {
        ctx.drawImage(tailRightObj2, snake2Pos[snake2Pos.length - 1][0], snake2Pos[snake2Pos.length - 1][1] - 1.5, snakeSize + 3, snakeSize + 3);
    }
    if(snake2Pos[snake2Pos.length - 2][1] + 15 == snake2Pos[snake2Pos.length - 1][1]) {
        ctx.drawImage(tailUpObj2, snake2Pos[snake2Pos.length - 1][0] - 1.5, snake2Pos[snake2Pos.length - 1][1], snakeSize + 3, snakeSize + 3);
    }
    if(snake2Pos[snake2Pos.length - 2][1] - 15 == snake2Pos[snake2Pos.length - 1][1]) {
        ctx.drawImage(tailDownObj2, snake2Pos[snake2Pos.length - 1][0] - 1.5, snake2Pos[snake2Pos.length - 1][1], snakeSize + 3, snakeSize + 3);
    }
    for(var i = 0; i < snake2Pos.length; i++){
        ctx.beginPath();
        for(var i = 1; i < snake2Pos.length - 1; i++) {
            ctx.rect(snake2Pos[i][0], snake2Pos[i][1], snakeSize, snakeSize);
        }
        ctx.fillStyle = " #774706";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        for(var i = 1; i < snake2Pos.length - 1; i++) {
            ctx.strokeRect(snake2Pos[i][0], snake2Pos[i][1], snakeSize, snakeSize);
        }
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}

//draws apple at random x and y.
function drawApple() {
    ctx.drawImage(appleObj, appleX, appleY, appleSize, appleSize);
    ctx.drawImage(appleObj, apple2X, apple2Y, appleSize, appleSize);
}

//draws background.
function drawBackground() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.closePath();
}
//types "You win" on canvas
function drawWin() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000";
    if(win){
        ctx.fillText("Player 1 Wins!!!!", canvas.width / 2 - 175, canvas.height / 2);
    }
    else if(win2){
        ctx.fillText("Player 2 Wins!!!!", canvas.width / 2 - 175, canvas.height / 2);
    }
    else if(tie){
        ctx.fillText("Tie!!!!", canvas.width / 2 - 50, canvas.height / 2);
    }
}
//draw function, draws 4 long snake, apple, and background each time it is called.
function draw() {
    drawBackground();
    drawApple();
    drawSnake1();
    drawSnake2();

    //if apple is on snake, it moves.
    for(var i = 1; i < snakePos.length - 1; i++){
        if(appleX == snakePos[i][0] && appleY == snakePos[i][1]){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
        }
    }
    for(var i = 1; i < snake2Pos.length - 1; i++){
        if(appleX == snake2Pos[i][0] && appleY == snake2Pos[i][1]){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
        }
    }
}


function loseCheck() {
    //if snake hits walls, it dies.
    if(snakePos[0][0] > 599 || snakePos[0][0] < 0 || snakePos[0][1] < 0 || snakePos[0][1] > 599) {
        win2 = true;
        right = false;
        left = false;
        up = false;
        down = false;
        right2 = false;
        left2 = false;
        up2 = false;
        down2 = false;
    }
    if(snake2Pos[0][0] > 599 || snake2Pos[0][0] < 0 || snake2Pos[0][1] < 0 || snake2Pos[0][1] > 599) {
        win = true;
        right2 = false;
        left2 = false;
        up2 = false;
        down2 = false;
        right = false;
        left = false;
        up = false;
        down = false;
    }
    //if snake hits itself, it dies.
    for(var i = 1; i < snake2Pos.length; i++) {
        if(snakePos[0][0] == snake2Pos[i][0] && snakePos[0][1] == snake2Pos[i][1]){
            win2 = true;
        }
        if(snakePos[0][0] == snake2Pos[i][0] && snakePos[0][1] == snake2Pos[i][1]){
            win2 = true;
        }
    }
    for(var i = 1; i < snakePos.length; i++) {
        if(snake2Pos[0][0] == snakePos[i][0] && snake2Pos[0][1] == snakePos[i][1]){
            win = true;
        }
        if(snake2Pos[0][0] == snakePos[i][0] && snake2Pos[0][1] == snakePos[i][1]){
            win = true;
        }
    }
    for(var i = 1; i < snake2Pos.length; i++) {
        if(snake2Pos[0][0] == snake2Pos[i][0] && snake2Pos[0][1] == snake2Pos[i][1]){
            win = true;
        }
    }
    for(var i = 1; i < snakePos.length; i++) {
        if(snakePos[0][0] == snakePos[i][0] && snakePos[0][1] == snakePos[i][1]){
            win2 = true;
        }
    }
    if(snakePos[0][0] == snake2Pos[0][0] && snakePos[0][1] == snake2Pos[0][1]){
        tie = true;
    }
}

//function for making the snakes move.
function move() {
        //Snake 1 moves based on the arrow keys pushed.
    if(right == true){
        if(snakePos[0][0] == appleX && snakePos[0][1] == appleY){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
        }
        else if(snakePos[0][0] == apple2X && snakePos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
        }
        else if(!win && !win2 && !tie) {
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
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
        }
        else if(snakePos[0][0] == apple2X && snakePos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
        }
        else if(!win && !win2 && !tie) {
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
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
        }
        else if(snakePos[0][0] == apple2X && snakePos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
        }
        else if(!win && !win2 && !tie) {
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
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
        }
        else if(snakePos[0][0] == apple2X && snakePos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
        }
        else if(!win && !win2 && !tie) {
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
    //Snake 2 moves based on the arrow keys pushed.

    if(right2 == true){
        if(snake2Pos[0][0] == appleX && snake2Pos[0][1] == appleY){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0] + 15, snake2Pos[0][1]]);
        }
        else if(snake2Pos[0][0] == apple2X && snake2Pos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0] + 15, snake2Pos[0][1]]);
        }
        else if(!win && !win2 && !tie) {
            if(turn2){
                snake2Pos.splice(0, 0, [snake2Pos[0][0] + 15, snake2Pos[0][1]]);
                snake2Pos.pop();
                turn2 = false;
                turnLeft2 = false;
                turnDown2 = false;
                turnRight2 = true;
                turnUp2 = false;
            }
            else {
                snake2Pos.splice(0, 0, [snake2Pos[0][0] + 15, snake2Pos[0][1]]);
                snake2Pos.pop();
            }
        }
    }
    else if(left2 == true){
        if(snake2Pos[0][0] == appleX && snake2Pos[0][1] == appleY){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0] - 15, snake2Pos[0][1]]);
        }
        else if(snake2Pos[0][0] == apple2X && snake2Pos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0] - 15, snake2Pos[0][1]]);
        }
        else if(!win && !win2 && !tie) {
            if(turn2){
                snake2Pos.splice(0, 0, [snake2Pos[0][0] - 15, snake2Pos[0][1]]);
                snake2Pos.pop();
                turn2 = false;
                turnLeft2 = true;
                turnDown2 = false;
                turnRight2 = false;
                turnUp2 = false;
            }
            else {
                snake2Pos.splice(0, 0, [snake2Pos[0][0] - 15, snake2Pos[0][1]]);
                snake2Pos.pop();
            }
        }
    }
    else if(up2 == true){
        if(snake2Pos[0][0] == appleX && snake2Pos[0][1] == appleY){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] - 15]);
        }
        else if(snake2Pos[0][0] == apple2X && snake2Pos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] - 15]);
        }
        else if(!win && !win2 && !tie) {
            if(turn2){
                snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] - 15]);
                snake2Pos.pop();
                turn2 = false;
                turnUp2 = true;
                turnLeft2 = false;
                turnDown2 = false;
                turnRight2 = false;
            }
            else {
                snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] - 15]);
                snake2Pos.pop();
            }
        }
    }
    else if(down2 == true){
        if(snake2Pos[0][0] == appleX && snake2Pos[0][1] == appleY){
            appleX = randomNumber(1, 40) * 15;
            appleY = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] + 15]);
        }
        else if(snake2Pos[0][0] == apple2X && snake2Pos[0][1] == apple2Y){
            apple2X = randomNumber(1, 40) * 15;
            apple2Y = randomNumber(1, 40) * 15;
            snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] + 15]);
        }
        else if(!win && !win2 && !tie) {
            if(turn2) {
                snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] + 15]);
                snake2Pos.pop();
                turn2 = false;
                turnDown2 = true;
                turnLeft2 = false;
                turnRight2 = false;
                turnUp2 = false;
            }
            else {
                snake2Pos.splice(0, 0, [snake2Pos[0][0], snake2Pos[0][1] + 15]);
                snake2Pos.pop();
            }
        }
    }
}
//sets interval for how often draw function is called.
var interval = setInterval(drawing, speed);

function drawing() {
    if(!win && !win2 && !tie){
        move();
        loseCheck();
        if(!win && !win2 && !tie){
            draw();
        }else if(win || win2 || tie){
            drawWin();
        }
    }
}
