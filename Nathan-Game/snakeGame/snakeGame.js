//function for making a random number.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//snake variables
var snakeSize = 15;
var snakePos = [
    [300, 300],
    [285, 300],
    [270, 300],
    [255, 300],
];
//apple variables
var appleSize = 15;
var applePos = [];
//block variables
var blockPos = [];
var blockTimer = 0;
var blockSize = 15;
var score = 0;
//variables for turning.
var right = false;
var turnRight = true;
var nextMoveRight = false;
var left = false;
var turnLeft = false;
var nextMoveLeft = false;
var up = false;
var turnUp = false;
var nextMoveUp = false;
var down = false;
var turnDown = false;
var nextMoveDown = false;
//end of game variables.
var lose = false;
var win = false;
var turn = false;
var speed = 100;
//speed variables.
var changeSpeed = 0;
var eating = false;
//random variables.
var randomBlock;
var randomApple;
var interval = [
    setInterval(drawing, speed),
];
//variables for the settings.
var appleInput = document.getElementById('appleNum');
var blockInput = document.getElementById('blockSet');
var speedInput = document.getElementById('speedSet');
var sizeInput = document.getElementById('sizeSet');
var appleSetting = appleNum.value;
var blockSetting = blockSet.value;
speedSet.value = "medium";
var speedSetting = speedSet.value;
var sizeSetting = sizeSet.value;
//image variables:
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
function restarting(){
    //check settings
    appleSetting = appleNum.value;
    blockSetting = blockSet.value;
    speedSetting = speedSet.value;
    sizeSetting = sizeSet.value;
    //set size.
    setSize();
    //reset score.
    score = 0;
    //set speed.
    document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
    lose = false;
    win = false;
    if(speedSetting == "superSlow"){
        speed = 150
    }else if(speedSetting == "slow"){
        speed = 125;
    }else if(speedSetting == "medium"){
        speed = 100;
    }else if(speedSetting == "fast"){
        speed = 75;
    }else if(speedSetting == "superFast"){
        speed = 50;
    }
    clearInterval(interval);
    interval.splice(0, 1, setInterval(drawing, speed));
    //set snake position.
    snakePos = [
        [canvas.width/2, canvas.height/2],
        [(canvas.width/2)-15, canvas.height/2],
        [(canvas.width/2)-30, canvas.height/2],
        [(canvas.width/2)-45, canvas.height/2],
    ];
    board();
    blockTimer = 0;
    //reset turning variables.
    nextMoveRight = false;
    nextMoveLeft = false;
    nextMoveUp = false;
    nextMoveDown = false;
    turnRight = true;
    turnLeft = false;
    turnUp = false;
    turnDown = false;
    right = false;
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
        if(!left && !right && !turn){
            right = true;
            left = false;
            up = false;
            down = false;
            turn = true;
        }else if(turn){
            nextMoveRight = true;
        }
    }
    //left arrow key
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
        }else if(turn){
            nextMoveLeft = true;
        }
    }
    //up arrow key
    else if(e.key == "ArrowUp" || e.key == "w") {
        e.preventDefault();
        if(!down && !up && !turn) {
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

//function for changing the size of the board.
function setSize() {
    if(sizeSetting == "small"){
        canvas.width = 120;
        canvas.height = 120;
    }else if(sizeSetting == "mediumSmall"){
        canvas.width = 240;
        canvas.height = 240;
    }else if(sizeSetting == "medium"){
        canvas.width = 390;
        canvas.height = 390;
    }else if(sizeSetting == "mediumBig"){
        canvas.width = 480;
        canvas.height = 480;
    }else if(sizeSetting == "big"){
        canvas.width = 600;
        canvas.height = 600;
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

//draws apple
function drawApple() {
    for(var i = 0; i < applePos.length; i++){
        ctx.drawImage(appleObj, applePos[i][0], applePos[i][1], appleSize, appleSize);
    }
}
//draws blocks.
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
    ctx.font = "45px Arial";
    ctx.fillStyle = "#000";
    if(canvas.width == 480 || canvas.width == 600){
        ctx.fillText("You Lose!!!", canvas.width / 2 - 119, canvas.height / 2);
    }
    else if(canvas.width == 240 || canvas.width == 390){
        ctx.fillText("You Lose!!!", canvas.width / 2 - 109, canvas.height / 2);
    }
    else if(canvas.width == 120){
        ctx.font = "23px Arial";
        ctx.fillText("You Lose!!!", canvas.width / 2 - 56, canvas.height / 2);
    }
}
//types "You win" on canvas
function drawWin() {
    if(canvas.width == 600 || canvas.width == 480 || canvas.width == 390){
        ctx.font = "50px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("You Win!!!!", canvas.width / 2 - 126, canvas.height / 2);
    }
    else if(canvas.width == 240){
        ctx.font = "45px Arial";
        ctx.fillStyle = "#000"
        ctx.fillText("You Win!!!!", canvas.width / 2 - 106, canvas.height / 2);
    }else if(canvas.width == 120){
        ctx.font = "25px Arial";
        ctx.fillStyl = "#000";
        ctx.fillText("You Win!!!", canvas.width / 2 - 56, canvas.height / 2);
    }
}
//draw function, draws 4 long snake, apple, and background each time it is called.
function draw() {
    //draws objects.
    drawBackground();
    drawApple();
    drawSnake();
    if(blockSetting == "yes") {
        drawBlock();
    }
    //draws win/lose
    if(lose) {
        drawLose();
    }
    if(win) {
        drawWin();
    }
    //checks win.
    if(snakePos.length == canvas.width/15 * canvas.height/15){
        win = true;
    }
}

//function for moving.
function move(){
    //checks to see if they are eating an apple.
    for(var i = 0; i < applePos.length; i++){
        if(snakePos[0][0] == applePos[i][0] && snakePos[0][1] == applePos[i][1]){
            eating = true;
        }
    }
    //snake moves based on the arrow keys pushed.
    if(right == true){
        if(eating){
            eating = false;
            score++;
            blockTimer++;
            changeSpeed++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            for(var i = 0; i < applePos.length; i++){
                if(snakePos[0][0] == applePos[i][0] && snakePos[0][1] == applePos[i][1]){
                    if(appleSetting == "5"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "3"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 3){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "1"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }else{
                            applePos.splice(i, 1);
                        }
                    }
                }
            }
            snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
            if(turn){
                turn = false;
                turnRight = true;
                turnLeft = false;
                turnDown = false;
                turnUp = false;
                turnCheck();
            }

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
                turnCheck();
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0] + 15, snakePos[0][1]]);
                snakePos.pop();
            }
        }
    }
    else if(left == true){
        if(eating){
            eating = false;
            changeSpeed++;
            eating = false;
            blockTimer++;
            score++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            for(var i = 0; i < applePos.length; i++){
                if(snakePos[0][0] == applePos[i][0] && snakePos[0][1] == applePos[i][1]){
                    if(appleSetting == "5"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "3"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 3){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "1"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }else{
                            applePos.splice(i, 1);
                        }
                    }
                }
            }
            snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
            if(turn){
                turn = false;
                turnRight = false;
                turnLeft = true;
                turnDown = false;
                turnUp = false;
                turnCheck();
            }
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
                turnCheck();
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0] - 15, snakePos[0][1]]);
                snakePos.pop();
            }
        }
    }
    else if(up == true){
        if(eating){
            eating = false;
            blockTimer++;
            changeSpeed++;
            score++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            for(var i = 0; i < applePos.length; i++){
                if(snakePos[0][0] == applePos[i][0] && snakePos[0][1] == applePos[i][1]){
                    if(appleSetting == "5"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "3"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 3){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "1"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }else{
                            applePos.splice(i, 1);
                        }
                    }
                }
            }
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
            if(turn){
                turn = false;
                turnRight = false;
                turnLeft = false;
                turnDown = false;
                turnUp = true;
                turnCheck();
            }
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
                turnCheck();
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] - 15]);
                snakePos.pop();
            }
        }
    }
    else if(down == true){
        if(eating){
            eating = false;
            blockTimer++;
            changeSpeed++;
            score++;
            document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
            for(var i = 0; i < applePos.length; i++){
                if(snakePos[0][0] == applePos[i][0] && snakePos[0][1] == applePos[i][1]){
                    if(appleSetting == "5"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "3"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 3){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else if(appleSetting == "1"){
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
                            board();
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }else{
                            applePos.splice(i, 1);
                        }
                    }

                }
            }
            snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
            if(turn){
                turn = false;
                turnRight = false;
                turnLeft = false;
                turnDown = true;
                turnUp = false;
                turnCheck();
            }
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
                turnCheck();
            }
            else {
                snakePos.splice(0, 0, [snakePos[0][0], snakePos[0][1] + 15]);
                snakePos.pop();
            }
        }
    }
    //gets faster as you get longer.
    if(changeSpeed == 32){
        speed -= 1;
        changeSpeed = 0;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    //adds another block if blockTimer is a certain number.
    if(blockSetting == "yes"){
        //adding another block
        if(sizeSetting == "big" || sizeSetting == "mediumBig" || sizeSetting == "medium"){
            if(blockTimer == 3){
                blockPos.push([randomNumber(1, canvas.width/15) * 15, randomNumber(1, canvas.height/15) * 15],);
                blockTimer = 0;
            }
        }else{
            if(blockTimer == 6){
                blockPos.push([randomNumber(1, canvas.width/15) * 15, randomNumber(1, canvas.height/15) * 15],);
                blockTimer = 0;
            }
        }
    }
}

//function that controls turns if you press arrowkeys twice during one draw function.
function turnCheck() {
    if(nextMoveRight){
        if(!right && !left){
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
}

//function that calls draw, move, and check functions.
function drawing() {
    board();
    if(!lose){
        move();
        loseCheck();
        if(!lose && !win){
            draw();
        }else if(lose && !win){
            drawLose();
        }
        else if(win){
            drawWin();
        }
    }
}
