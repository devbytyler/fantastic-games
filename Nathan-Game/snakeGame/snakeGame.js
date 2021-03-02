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
var applePos = [];
var blockPos = [];
var blockTimer = 0;
var blockSize = 15;
var score = 0;
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
var lose = false;
var win = false;
var turn = false;
var speed = 100;
var changeSpeed = 0;
var eating = false;
var normalMode = true;
var blockMode = false;
var speedMode = false;
var blockSpeedMode = false;
var extraFruitMode = false;
var extraFruitSpeedMode = false;
var extraFruitBlockMode = false;
var extraFruitBlockSpeedMode = false;
var restart = false;
var small = false;
var mediumSmall = false;
var medium = false;
var mediumBig = false;
var big = true;
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
            if(blockMode || extraFruitBlockMode || blockSpeedMode || extraFruitBlockSpeedMode){
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

//sets position of apples and blocks
function setApple() {
    board();
    var randomApple;
    applePos = [];
    if(extraFruitMode || extraFruitSpeedMode || extraFruitBlockSpeedMode || extraFruitBlockMode){
        for(var i = 0; i < 5; i++){
            board();
            randomApple = randomNumber(0, emptyArray.length);
            applePos.push([emptyArray[randomApple][0], emptyArray[randomApple][1]]);
        }
    }else{
        board();
        randomApple = randomNumber(0, emptyArray.length);
        applePos.push([emptyArray[randomApple][0], emptyArray[randomApple][1]]);
    }
}
setApple();
function setBlock() {
    board();
    var randomBlock;
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

//changes mode when button is clicked.
document.getElementById("modeSwitch").addEventListener("click", function(){
    score = 0;
    document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
    lose = false;
    win = false;
    blockPos = [
        [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
        [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
    ];
    snakePos = [
        [canvas.width/2, canvas.height/2],
        [(canvas.width/2)-15, canvas.height/2],
        [(canvas.width/2)-30, canvas.height/2],
        [(canvas.width/2)-45, canvas.height/2],
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
    nextMoveRight = false;
    nextMoveLeft = false;
    nextMoveUp = false;
    nextMoveDown = false;
    changeMode();
});

//function for changing modes.
function changeMode() {
    if(normalMode){
        extraFruitMode = true;
        normalMode = false;
        document.getElementById("mode").innerHTML = "<h4>Extra Fruit Mode</h4>";
        speed = 100;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(extraFruitMode){
        document.getElementById("mode").innerHTML = "<h4>Speed Mode</h4>";
        extraFruitMode = false;
        speedMode = true;
        speed = 75;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(speedMode){
        speedMode = false;
        extraFruitSpeedMode = true;
        document.getElementById("mode").innerHTML = "<h4>Extra Fruit Speed Mode</h4>";
        speed = 75;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(extraFruitSpeedMode){
        extraFruitSpeedMode = false;
        blockMode = true;
        document.getElementById("mode").innerHTML = "<h4>Block Mode</h4>";
        speed = 100;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(blockMode){
        blockMode = false;
        extraFruitBlockMode = true;
        document.getElementById("mode").innerHTML = "<h4>Extra Fruit Block Mode</h4>";
        speed = 100;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(extraFruitBlockMode){
        extraFruitBlockMode = false;
        blockSpeedMode = true;
        document.getElementById("mode").innerHTML = "<h4>Block Speed Mode</h4>";
        speed = 75;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(blockSpeedMode){
        blockSpeedMode = false;
        extraFruitBlockSpeedMode = true;
        document.getElementById("mode").innerHTML = "<h4>Extra Fruit Block Speed Mode</h4>";
        speed = 75;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    else if(extraFruitBlockSpeedMode){
        extraFruitBlockSpeedMode = false;
        normalMode = true;
        document.getElementById("mode").innerHTML = "<h4>Normal Mode</h4>";
        speed = 100;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    setBlock();
    setApple();
}

//restart function
function restarting(){
    score = 0;
    document.getElementById("score").innerHTML = "<h3>Score: " + score + "<h3>";
    lose = false;
    win = false;
    if(speedMode || extraFruitSpeedMode || extraFruitBlockSpeedMode || blockSpeedMode){
        speed = 75;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }else {
        speed = 100;
        clearInterval(interval);
        interval.splice(0, 1, setInterval(drawing, speed));
    }
    if(extraFruitMode || extraFruitSpeedMode || extraFruitBlockSpeedMode || extraFruitBlockMode){
        applePos = [
            [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
            [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
            [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
            [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
            [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
        ];
    }else {
        applePos = [
            [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
        ];
    }
    blockPos = [
        [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
        [randomNumber(1, canvas.width / 15) * 15, randomNumber(1, canvas.height / 15) * 15],
    ];
    snakePos = [
        [canvas.width/2, canvas.height/2],
        [(canvas.width/2)-15, canvas.height/2],
        [(canvas.width/2)-30, canvas.height/2],
        [(canvas.width/2)-45, canvas.height/2],
    ];
    board();
    blockTimer = 0;
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
    setApple();
    setBlock();
}

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
        }else if(turn){
            nextMoveRight = true;
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
        }else if(turn){
            nextMoveLeft = true;
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
        }else if(turn){
            nextMoveUp = true;
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
        }else if(turn){
            nextMoveDown = true;
        }
    }
}

//function for changing the size of the board.
function sizeChange() {
    restarting();
    if(!right && !left && !up && !down){
        if(small){
            canvas.width = 240;
            canvas.height = 240;
            mediumSmall = true;
            small = false;
            restarting();
        }else if(mediumSmall){
            canvas.width = 390;
            canvas.height = 390;
            mediumSmall = false;
            medium = true;
            restarting();
        }else if(medium) {
            canvas.width = 480;
            canvas.height = 480;
            medium = false;
            mediumBig = true;
            restarting();
        }else if(mediumBig){
            canvas.width = 600;
            canvas.height = 600;
            big = true;
            mediumBig = false;
            restarting();
        }else if(big){
            canvas.width = 120;
            canvas.height = 120;
            small = true;
            medium = false;
            big = false;
            restarting();
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
    for(var i = 0; i < applePos.length; i++){
        ctx.drawImage(appleObj, applePos[i][0], applePos[i][1], appleSize, appleSize);
    }
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
    ctx.font = "45px Arial";
    ctx.fillStyle = "#000";
    if(mediumBig || big){
        ctx.fillText("You Lose!!!", canvas.width / 2 - 119, canvas.height / 2);
    }
    else if(mediumSmall || medium){
        ctx.fillText("You Lose!!!", canvas.width / 2 - 109, canvas.height / 2);
    }
    else if(small){
        ctx.font = "23px Arial";
        ctx.fillText("You Lose!!!", canvas.width / 2 - 56, canvas.height / 2);
    }
}
//types "You win" on canvas
function drawWin() {
    if(big || mediumBig || medium){
        ctx.font = "50px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("You Win!!!!", canvas.width / 2 - 126, canvas.height / 2);
    }
    else if(mediumSmall){
        ctx.font = "45px Arial";
        ctx.fillStyle = "#000"
        ctx.fillText("You Win!!!!", canvas.width / 2 - 106, canvas.height / 2);
    }else if(small){
        ctx.font = "25px Arial";
        ctx.fillStyl = "#000";
        ctx.fillText("You Win!!!", canvas.width / 2 - 56, canvas.height / 2);
    }
}
//draw function, draws 4 long snake, apple, and background each time it is called.
function draw() {
    drawBackground();
    drawApple();
    drawSnake();
    //if it's block mode, it draws the blocks.
    if(blockMode || blockSpeedMode || extraFruitBlockMode || extraFruitBlockSpeedMode) {
        drawBlock();
    }
    if(lose) {
        drawLose();
    }
    if(win) {
        drawWin();
    }

    if(snakePos.length == canvas.width/15 * canvas.height/15){
        win = true;
    }
    if(blockMode || blockSpeedMode || extraFruitBlockMode || extraFruitBlockSpeedMode){
        //code for adding another block
        if(blockTimer == 2){
            blockPos.push([randomNumber(1, canvas.width/15) * 15, randomNumber(1, canvas.height/15) * 15],);
            blockTimer = 0;
        }
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
                    board();
                    if(extraFruitMode || extraFruitSpeedMode || extraFruitBlockSpeedMode || extraFruitBlockMode){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else{
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
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
                    board();
                    if(extraFruitMode || extraFruitSpeedMode || extraFruitBlockSpeedMode || extraFruitBlockMode){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else{
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
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
                    board();
                    if(extraFruitMode || extraFruitSpeedMode || extraFruitBlockSpeedMode || extraFruitBlockMode){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else{
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
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
                    board();
                    if(extraFruitMode || extraFruitSpeedMode || extraFruitBlockSpeedMode || extraFruitBlockMode){
                        if(snakePos.length < canvas.width/15 * canvas.height/15 - 5){
                            randomApple = 0;
                            randomApple = randomNumber(0, emptyArray.length);
                            applePos.splice(i, 1, [emptyArray[randomApple][0], emptyArray[randomApple][1]],);
                        }
                        else{
                            applePos.splice(i, 1);
                        }
                    }else{
                        if(snakePos.length < canvas.width/15 * canvas.height/15){
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
    //you get faster as you get longer.
    if(speedMode || blockSpeedMode || extraFruitSpeedMode || extraFruitBlockSpeedMode){
        if(changeSpeed == 32){
            speed -= 1;
            changeSpeed = 0;
            clearInterval(interval);
            interval.splice(0, 1, setInterval(drawing, speed));
        }
    }else{
        if(changeSpeed == 32){
            speed -= 1;
            changeSpeed = 0;
            clearInterval(interval);
            interval.splice(0, 1, setInterval(drawing, speed));
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
    if(blockMode || blockSpeedMode || extraFruitBlockMode || extraFruitBlockSpeedMode){
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
