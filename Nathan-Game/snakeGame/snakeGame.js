//function for making a random number.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//snake array
var snakePos = [
    [canvas.width/2, canvas.height/2, "horizontal"],
    [(canvas.width/2)-15, canvas.height/2, "horizontal"],
    [(canvas.width/2)-30, canvas.height/2, "horizontal"],
    [(canvas.width/2)-45, canvas.height/2, "horizontal"],
];
//apple and block arrays.
var applePos = [];
var blockPos = [];
var blockTimer = 0;
//score and moving variable.
var score = 0;
var moving = false;
//variables for turning.
var right = true;
var nextMoveRight = false;
var left = false;
var nextMoveLeft = false;
var up = false;
var nextMoveUp = false;
var down = false;
var nextMoveDown = false;
var turning = "null";
//end of game variables.
var lose = false;
var win = false;
var turn = false;
//speed variables.
var speed = 100;
var changeSpeed = 0;
var eating = false;
//random variables.
var randomBlock;
var randomApple;
var interval = [
    setInterval(draw, speed),
];
var winInterval = [];
var loseInterval = [];
//variables for the settings.
var appleInput = document.getElementById('appleNum');
var blockInput = document.getElementById('blockSet');
var speedInput = document.getElementById('speedSet');
var sizeInput = document.getElementById('sizeSet');
var appleSetting = appleNum.value;
var blockSetting = blockSet.value;
speedSet.value = "100";
var speedSetting = speedSet.value;
var sizeSetting = sizeSet.value;
//image variables:
//gets images for apple
var appleSrc = 'pictures/snakeApple.png';
var appleObj = new Image();
appleObj.src = appleSrc;
//gets image for head
var upObj = new Image();
var downObj = new Image();
var rightObj = new Image();
var leftObj = new Image();
upObj.src = 'pictures/headUp.png';
downObj.src = 'pictures/headDown.png';
rightObj.src = 'pictures/headRight.png';
leftObj.src = 'pictures/headLeft.png';
//gets image for tail
var tailUpObj = new Image();
var tailDownObj = new Image();
var tailRightObj = new Image();
var tailLeftObj = new Image();
tailUpObj.src = 'pictures/tail-up.png';
tailDownObj.src = 'pictures/tail-down.png';
tailRightObj.src = 'pictures/tail-right.png';
tailLeftObj.src = 'pictures/tail-left.png';
//gets images for body
var horizontalObj = new Image();
var verticalObj = new Image();
var rightToUpObj = new Image();
var rightToDownObj = new Image();
var leftToUpObj = new Image();
var leftToDownObj = new Image();
var upToRightObj = new Image();
var upToLeftObj = new Image();
var downToRightObj = new Image();
var downToLeftObj = new Image();
horizontalObj.src = 'pictures/bodyLeftRight.png';
verticalObj.src = 'pictures/bodyUpDown.png';
rightToUpObj.src = 'pictures/rightToUp.png';
rightToDownObj.src = 'pictures/rightToDown.png';
leftToUpObj.src = 'pictures/leftToUp.png';
leftToDownObj.src = 'pictures/leftToDown.png';
upToRightObj.src = 'pictures/upToRight.png';
upToLeftObj.src = 'pictures/upToLeft.png';
downToRightObj.src = 'pictures/downToRight.png';
downToLeftObj.src = 'pictures/downToLeft.png';

//creates an array of each empty spot.
var emptyArray = [];
var empty = true;
function board() {
    emptyArray = [];
    for(var i = 0; i < canvas.width/15; i++){
        for(var j = 0; j < canvas.height/15; j++){
            for(var x = 0; x < snakePos.length; x++){
                if(snakePos[x][0] == i*15 && snakePos[x][1] == j*15){
                    empty = false;
                }
            }
            for(var x = 0; x < applePos.length; x++){
                if(applePos[x][0] == i*15 && applePos[x][1] == j*15){
                    empty = false;
                }
            }
            if(blockSetting == "yes"){
                for(var x = 0; x < blockPos.length; x++){
                    if(blockPos[x][0] == i*15 && blockPos[x][1] == j*15){
                        empty = false;
                    }
                }
            }
            if(empty){
                emptyArray.push([i*15, j*15],)
            }
            empty = true;
        }
    }
}
board();

//sets position of apples.
function setApple() {
    board();
    applePos = [];
    for(var i = 0; i < appleSetting; i++){
        board();
        randomApple = randomNumber(0, emptyArray.length);
        applePos.push([emptyArray[randomApple][0], emptyArray[randomApple][1]]);
    }
}
setApple();
//sets the position of the blocks.
function setBlock() {
    board();
    blockPos = [];
    for(var i = 0; i < 2; i++){
        randomBlock = randomNumber(0, emptyArray.length);
        blockPos.push([emptyArray[randomBlock][0], emptyArray[randomBlock][1]]);
    }
}
setBlock();

//displays score underneath game.
document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";

//makes arrow keys or WASD work.
document.addEventListener("keydown", keyDownHandler, false);

//restart function
function restart(){
    //check settings
    appleSetting = appleNum.value;
    blockSetting = blockSet.value;
    speedSetting = speedSet.value;
    sizeSetting = sizeSet.value;
    //set size.
    canvas.width = sizeSetting;
    canvas.height = sizeSetting;
    //reset score.
    score = 0;
    document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
    //reset win/lose
    lose = false;
    win = false;
    //resets drawing win or lose
    clearInterval(winInterval);
    winInterval.pop();
    clearInterval(loseInterval);
    loseInterval.pop();
    //set speed.
    speed = speedSetting;
    clearInterval(interval);
    interval.splice(0, 1, setInterval(draw, speed));
    //set snake position.
    snakePos = [
        [canvas.width/2, canvas.height/2, "horizontal"],
        [(canvas.width/2)-15, canvas.height/2, "horizontal"],
        [(canvas.width/2)-30, canvas.height/2, "horizontal"],
        [(canvas.width/2)-45, canvas.height/2, "horizontal"],
    ];
    board();
    blockTimer = 0;
    moving = false;
    //reset turning variables.
    nextMoveRight = false;
    nextMoveLeft = false;
    nextMoveUp = false;
    nextMoveDown = false;
    right = true;
    left = false;
    up = false;
    down = false;
    turn = false;
    //set apples and blocks.
    setApple();
    setBlock();
}

//function for changing direction
function keyDownHandler(e) {
    //right arrow key
    if(e.key == "ArrowRight" || e.key == "d") {
        e.preventDefault();
        if(!left && !right && !turn || !moving){
            if(up){
                turning = "upToRight";
            }else if(down){
                turning = "downToRight";
            }
            right = true;
            left = false;
            up = false;
            down = false;
            turn = true;
            if(!moving){
                moving = true;
                turning = "horizontal";
            }
        }else if(turn){
            nextMoveRight = true;
        }
    }
    //left arrow key
    else if(e.key == "ArrowLeft" || e.key == "a") {
        e.preventDefault();
        if(!right && !left && !turn) {
            if(!moving){
                moving = true;
            }
            if(up || down){
                if(up){
                    turning = "upToLeft";
                }else if(down){
                    turning = "downToLeft";
                }
                left = true;
                right = false;
                up = false;
                down = false;
                turn = true;
            }
        }else if(turn){
            nextMoveLeft = true;
        }
    }
    //up arrow key
    else if(e.key == "ArrowUp" || e.key == "w") {
        e.preventDefault();
        if(!down && !up && !turn) {
            if(!moving){
                moving = true;
            }
            if(left){
                turning = "leftToUp";
            }else if(right){
                turning = "rightToUp";
            }
            up = true;
            down = false;
            right = false;
            left = false;
            turn = true;
        }else if(turn){
            nextMoveUp = true;
        }
    }
    //down arrow key
    else if(e.key == "ArrowDown" || e.key == "s") {
        e.preventDefault();
        if(!up && !down && !turn) {
            if(!moving){
                moving = true;
            }
            if(left){
                turning = "leftToDown";
            }else if(right){
                turning = "rightToDown";
            }
            down = true;
            left = false;
            right = false;
            up = false;
            turn = true;
        }else if(turn){
            nextMoveDown = true;
        }
    }
}

//draws snake segments.
function drawSnake() {
    //draws head based on direction.
    if(right){
        ctx.drawImage(rightObj, snakePos[0][0], snakePos[0][1], 15, 15);
    }
    if(left){
        ctx.drawImage(leftObj, snakePos[0][0], snakePos[0][1], 15, 15);
    }
    if(up){
        ctx.drawImage(upObj, snakePos[0][0], snakePos[0][1], 15, 15);
    }
    if(down){
        ctx.drawImage(downObj, snakePos[0][0], snakePos[0][1], 15, 15);
    }
    //draws tail based on 2nd to last and last items in snakePos array.
    if(snakePos[snakePos.length - 2][0] + 15 == snakePos[snakePos.length - 1][0]) {
        ctx.drawImage(tailLeftObj, snakePos[snakePos.length - 1][0], snakePos[snakePos.length - 1][1], 15, 15);
    }
    if(snakePos[snakePos.length - 2][0] - 15 == snakePos[snakePos.length - 1][0]) {
        ctx.drawImage(tailRightObj, snakePos[snakePos.length - 1][0], snakePos[snakePos.length - 1][1], 15, 15);
    }
    if(snakePos[snakePos.length - 2][1] + 15 == snakePos[snakePos.length - 1][1]) {
        ctx.drawImage(tailUpObj, snakePos[snakePos.length - 1][0], snakePos[snakePos.length - 1][1], 15, 15);
    }
    if(snakePos[snakePos.length - 2][1] - 15 == snakePos[snakePos.length - 1][1]) {
        ctx.drawImage(tailDownObj, snakePos[snakePos.length - 1][0], snakePos[snakePos.length - 1][1], 15, 15);
    }
    //draws middle of the snake
    for(var i = 1; i < snakePos.length - 1; i++){
        if(snakePos[i][2] == "horizontal"){
            ctx.drawImage(horizontalObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "vertical"){
            ctx.drawImage(verticalObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "rightToUp"){
            ctx.drawImage(rightToUpObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "rightToDown"){
            ctx.drawImage(rightToDownObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "leftToUp"){
            ctx.drawImage(leftToUpObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "leftToDown"){
            ctx.drawImage(leftToDownObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "upToRight"){
            ctx.drawImage(upToRightObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "upToLeft"){
            ctx.drawImage(upToLeftObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "downToRight"){
            ctx.drawImage(downToRightObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }else if(snakePos[i][2] == "downToLeft"){
            ctx.drawImage(downToLeftObj, snakePos[i][0], snakePos[i][1], 15, 15);
        }
    }
}

//draws apple
function drawApple() {
    for(var i = 0; i < applePos.length; i++){
        ctx.drawImage(appleObj, applePos[i][0], applePos[i][1], 15, 15);
    }
}
//draws blocks.
function drawBlock() {
    ctx.beginPath();
    for(var i = 0; i <= blockPos.length - 1; i++){
        ctx.rect(blockPos[i][0], blockPos[i][1], 15, 15);
    }
    ctx.fillStyle = "#595a5c";
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    for(var i = 0; i <= blockPos.length - 1; i++){
        ctx.strokeRect(blockPos[i][0], blockPos[i][1], 15, 15);
    }
    ctx.fillStyle = "black";
    ctx.lineWidth = "3";
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
    ctx.font = "45px Arial";
    ctx.fillStyle = "#000";
    if(canvas.width == 480 || canvas.width == 600){
        ctx.fillRect(0, canvas.width/2 - 47, canvas.width, 60);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("You Lose!!!", canvas.width / 2 - 119, canvas.height / 2);
    }
    else if(canvas.width == 240 || canvas.width == 390){
        ctx.fillRect(0, canvas.width/2 - 47, canvas.width, 60);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("You Lose!!!", canvas.width / 2 - 109, canvas.height / 2);
    }
    else if(canvas.width == 120){
        ctx.fillRect(0, canvas.width/2 - 25, canvas.width, 30);
        ctx.fillStyle = "#ffffff";
        ctx.font = "23px Arial";
        ctx.fillText("You Lose!!!", canvas.width / 2 - 56, canvas.height / 2);
    }
}
//types "You win" on canvas
function drawWin() {
    ctx.fillStyle = "#000";
    if(canvas.width == 600 || canvas.width == 480 || canvas.width == 390){
        ctx.font = "50px Arial";
        ctx.fillRect(0, canvas.width/2 - 50, canvas.width, 60);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("You Win!!!!", canvas.width / 2 - 126, canvas.height / 2);
    }
    else if(canvas.width == 240){
        ctx.font = "45px Arial";
        ctx.fillRect(0, canvas.width/2 - 41, canvas.width, 50);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("You Win!!!!", canvas.width / 2 - 106, canvas.height / 2);
    }else if(canvas.width == 120){
        ctx.font = "25px Arial";
        ctx.fillRect(0, canvas.height/2 - 25, canvas.width, 30);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("You Win!!!", canvas.width / 2 - 56, canvas.height / 2);
    }
}

//function for moving.
function move(){
    if(moving){
        //checks to see if they are eating an apple.
        for(var i = 0; i < applePos.length; i++){
            if(snakePos[0][0] == applePos[i][0] && snakePos[0][1] == applePos[i][1]){
                eating = true;
            }
        }
        //snake moves based on the arrow keys pushed.
        if(eating){
            eating = false;
            if(snakePos.length < canvas.width/15 * canvas.height/15){
                score++;
            }
            blockTimer++;
            changeSpeed++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            for(var i = 0; i < applePos.length; i++){
                if(snakePos[0][0] == applePos[i][0] && snakePos[0][1] == applePos[i][1]){
                    if(emptyArray.length != 0){
                        board();
                        randomApple = 0;
                        randomApple = randomNumber(0, emptyArray.length);
                        applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                    }
                    else{
                        applePos.splice(i, 1);
                    }
                }
            }
            if(right){
                snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1], "horizontal"]);
            }else if(left){
                snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1], "horizontal"]);
            }else if(up){
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15, "vertical"]);
            }else if(down){
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15, "vertical"]);
            }
            if(turn){
                turn = false;
                snakePos.splice(1, 1, [snakePos[1][0], snakePos[1][1], turning]);
            }
        }
        else if(!lose && !win) {
            if(right){
                snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1], "horizontal"]);
                snakePos.pop();
            }else if(left){
                snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1], "horizontal"]);
                snakePos.pop();
            }else if(up){
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15, "vertical"]);
                snakePos.pop();
            }else if(down){
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15, "vertical"]);
                snakePos.pop();
            }
            if(turn){
                turn = false;
                snakePos.splice(1, 1, [snakePos[1][0], snakePos[1][1], turning]);
            }
        }

        //gets faster as snake get longer.
        if(changeSpeed == canvas.width/15){
            speed -= 1;
            changeSpeed = 0;
            clearInterval(interval);
            interval.splice(0, 1, setInterval(draw, speed));
        }
        //adds another block if blockTimer is a certain number.
        if(blockSetting == "yes"){
            //adding another block
            if(sizeSetting == "600" || sizeSetting == "480" || sizeSetting == "390"){
                if(blockTimer == 3){
                    board();
                    randomBlock = randomNumber(0, emptyArray.length);
                    blockPos.push([emptyArray[randomBlock][0], emptyArray[randomBlock][1]]);
                    blockTimer = 0;
                }
            }else{
                if(blockTimer == 6){
                    board();
                    randomBlock = randomNumber(0, emptyArray.length);
                    blockPos.push([emptyArray[randomBlock][0], emptyArray[randomBlock][1]]);
                    blockTimer = 0;
                }
            }
        }
    }
}

//function that controls turns if you press arrowkeys twice during one draw function.
function turnCheck() {
    if(nextMoveRight){
        if(!right && !left){
            if(up){
                turning = "upToRight";
            }else if(down){
                turning = "downToRight";
            }
            turn = true;
            right = true;
            left = false;
            up = false;
            down = false;
            nextMoveRight = false;
        }else{
            nextMoveRight = false;
        }
    }else if(nextMoveLeft){
        if(!left && !right){
            if(up){
                turning = "upToLeft";
            }else if(down){
                turning = "downToLeft";
            }
            turn = true;
            right = false;
            left = true;
            up = false;
            down = false;
            nextMoveLeft = false;
        }else{
            nextMoveLeft = false;
        }
    }else if(nextMoveUp){
        if(!up && !down){
            if(left){
                turning = "leftToUp";
            }else if(right){
                turning = "rightToUp";
            }
            turn = true;
            right = false;
            left = false;
            up = true;
            down = false;
            nextMoveUp = false;
        }else{
            nextMoveUp = false;
        }
    }else if(nextMoveDown){
        if(!up && !down){
            if(left){
                turning = "leftToDown";
            }else if(right){
                turning = "rightToDown";
            }
            turn = true;
            right = false;
            left = false;
            up = false;
            down = true;
            nextMoveDown = false;
        }else{
            nextMoveDown = false;
        }
    }
}

//function for checking if the player has lost.
function loseCheck() {
    //if snake hits walls, it dies.
    if(snakePos[0][0] > canvas.width - 1 || snakePos[0][0] < 0 || snakePos[0][1] < 0 || snakePos[0][1] > canvas.height - 1) {
        if(!win){
            lose = true;
        }
    }
    //if snake hits a block, it dies.
    if(blockSetting == "yes"){
    for(var i = 0; i <= blockPos.length - 1; i++) {
            if(snakePos[0][0] == blockPos[i][0] && snakePos[0][1] == blockPos[i][1]) {
                if(!win){
                    lose = true;
                }
            }
        }
    }
    //if snake hits itself, it dies.
    for(var i = 1; i < snakePos.length; i++) {
        if(snakePos[0][0] == snakePos[i][0] && snakePos[0][1] == snakePos[i][1]){
            if(!win){
                lose = true;
            }
        }
    }
    if(lose){
        loseInterval = [
            setInterval(drawLose, 500),
        ];
    }
}

//function that calls move and check functions. If snake hasn't won or lost, it draws the board again.
function draw() {
    board();
    if(!lose){
        move();
        loseCheck();
        if(!lose && !win){
            //draws objects.
            drawBackground();
            drawApple();
            drawSnake();
            if(blockSetting == "yes") {
                drawBlock();
            }
            //checks win, if yes it draws win after a second.
            if(snakePos.length == canvas.width/15 * canvas.height/15){
                win = true;
                winInterval = [
                    setInterval(drawWin, 500),
                ];
            }
            turnCheck();
        }
    }
}