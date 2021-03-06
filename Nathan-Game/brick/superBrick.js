//variables
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 0;
var dy = -5;
var paddleHeight = 10;
var paddleWidth = canvas.width * 0.2;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var level = 1;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 10;
var bricks = [];
var gameLose = false;
var gameWin = false;
var pause = false;
var oldX;
var oldY;
var previousScore = 0;
var paddleCenter = paddleX + paddleWidth/2;
var ballHitPaddle = false;
var reset = false;
var remainingLives = 10;
var addLife = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var element = document.getElementById('text');
var hard = true;
var easy = false;
var brickHit = false;
var hitY = false;
var hitX = false;
var levelScore = 0;
//sets the mode the game starts in.
if(localStorage.getItem("mode") == null){
    hard = true;
    easy = false;
}
else if(localStorage.getItem("mode") == "easy"){
    easy = true;
    hard =false;
    lives = 5;
    remainingLives = 5;
}
else if(localStorage.getItem("mode") == "hard"){
    hard = true;
    easy = false;
}
//function for the restart button
function restart(){
    if(easy){
        localStorage.setItem("mode", "easy");
    }
    if (hard){
        localStorage.setItem("mode", "hard");
    }
    location.reload();
}
//This makes it so the ball is stopped when page is loaded.
if(level == 1 && score == 0){
    pause = true;
    oldX = dx;
    oldY = dy;
    dx = 0;
    dy = 0;
}
//function creates the bricks.
var yellow = -1;
function makeBricks (){
    levelScore = 0;
    if(yellow == 1 || yellow == 4){
        yellow += 2;
    }else {
        yellow += 1;
    }
    brickRowCount = 3 * level;
    if(hard){
        brickColumnCount = 4 + level;
    }else{
        brickColumnCount = 5;
    }
    for(var c=0; c<brickColumnCount; c++){
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
        //sets the brick status for each level on easy mode.
        if(easy){
            if(level >= 2){
                for(var r = 0; r < yellow; r++){
                    bricks[c][r] = { x: 0, y: 0, status: 2};
                }
                if(level >= 3){
                    for(var r = 0; r < level - 2; r++){
                        bricks[c][r] = { x: 0, y: 0, status: 3};
                    }
                }
            }
        }
        //sets the brick status for each level on hard mode.
        if(hard){
            if(level >= 2){
                for(var r = 0; r < (level - 1) * 2 ; r++){
                    bricks[c][r] = { x: 0, y: 0, status: 2};
                }
                if(level >= 3){
                    for(var r=0; r< level - 1; r++){
                        bricks[c][r] = {x: 0, y: 0, status: 3};
                    }
                }
            }
        }
        //sets a variable for how many possible points are in the level.
        for(var r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 3){
                levelScore += 3;
            }else if(bricks[c][r].status == 2){
                levelScore += 2;
            }else if(bricks[c][r].status == 1){
                levelScore += 1;
            }if(r == brickRowCount - 1 && c == brickColumnCount - 1){
                console.log(levelScore);
            }
        }
    }
}
//call make brick function.
makeBricks();
// event listeners
if (isMobile){
    canvas.addEventListener("click", mouseClick, false);
}
document.getElementById("restartButton").addEventListener("click", function(){
    if(easy == true){
        localStorage.setItem("mode", "easy");
    }
    else if(hard == true){
        localStorage.setItem("mode", "hard");
    }
    location.reload();
});
//space key event listener
document.addEventListener("keydown", spaceKeyDown, false);
//event listeners for arrow keys.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//event listener for the mouse.
document.addEventListener("mousemove", mouseMoveHandler, false);
//pressing the easy button sets of this function.
document.getElementById("easy").addEventListener("click", function(){
    if(hard){
        easy = true;
        hard = false;
        restart();
    }
});
//pressing the hard button sets off this function.
document.getElementById("hard").addEventListener("click", function(){
    if(easy){
        hard = true;
        easy = false;
        restart();
    }
});
//makes space key pause and play, ball still goes in the same direction.
function spaceKeyDown(e) {
    if(!gameLose && !gameWin){
        if(e.key == "space" || e.key == " " && pause == false){
            e.preventDefault();
            pause = true;
            oldX = dx;
            oldY = dy;
            dx = 0;
            dy = 0;
        }
        else if(e.key == "space" || e.key == " " && pause == true){
            e.preventDefault();
            if(reset == true){
               dx = 0;
               dy = -5;
               reset = false;
                pause = false;
           }
            else if(reset == false){
                e.preventDefault();
                dx = oldX;
                dy = oldY;
                pause = false;
            }
        }
    }
}
//makes mouse pause and play.
function mouseClick(e) {
   if(pause == true){
        if(reset == true){
           dx = 0;
           dy = -5;
           reset = false;
            pause = false;
       }
        else if(reset == false){
            dx = oldX;
            dy = oldY;
            pause = false;
        }
    }
}
//makes mouse control the paddle.
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(!pause){
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
}
//makes paddle move left/right based on arrow keys.
function keyDownHandler(e) {
    if(!pause){
        if(e.key == "Right" || e.key == "ArrowRight") {
            e.preventDefault();
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            e.preventDefault();
            leftPressed = true;
        }
    }
    else{
        if(e.key == "Right" || e.key == "ArrowRight") {
            e.preventDefault();
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            e.preventDefault();
        }
    }
}
//stops paddle from moving after arrow key is not being pressed.
function keyUpHandler(e) {
    if(!pause){
        if(e.key == "Right" || e.key == "ArrowRight") {
        e.preventDefault();
        rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
        e.preventDefault();
        leftPressed = false;
        }
    }
}
//detects when a brick is hit, changes brick status, and controls game win and advance level.
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1|| b.status == 2|| b.status == 3){
                if(x + 10 >= b.x && x - 10 <= b.x+brickWidth && y + 10 >= b.y && y - 10 <= b.y+brickHeight){
                    brickHit = true;
                    if(b.status == 3){
                        b.status = 2;
                        score++;
                    }else if(b.status == 2){
                        b.status = 1;
                        score++;
                    }else if(b.status == 1){
                        b.status = 0;
                        score++;
                    }
                    if(y + 10 == b.y || y - 10 == b.y + brickHeight){
                        hitY = true;
                    }
                    if(x + 10 >= b.x || x - 10 <= b.x + brickWidth){
                        hitX = true;
                    }
                    if (score > localStorage.getItem("hardBest") && hard){
                            localStorage.setItem("hardBest", score);
                    }
                    else if (score > localStorage.getItem("easyBest") && easy){
                        localStorage.setItem("easyBest", score);
                    }
                    checkAdvance();
                }
            }
        }
    }
    //controls how the movement of the ball changes each time.
    if(brickHit){
        if(hitY){
            dy = -dy;
            hitY = false;
        }
        else if(hitX){
            dx = -dx;
            hitX = false;
        }
        brickHit = false;
    }
}
//checks to see if you advance to the next level.
function checkAdvance(){
    if(score == levelScore + previousScore){
        if(level != 5){
            advanceLevel();
        }else{
            gameWinner();
        }
    }
}
//function that controls the advance of levels.
function advanceLevel() {
    previousScore = score;
    level++;
    if(hard){
       canvas.width += 70;
        paddleWidth = canvas.width * 0.2;
    }
    makeBricks();
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 0;
    dy = 0;
    reset = true;
    pause = true;
    paddleX = (canvas.width-paddleWidth)/2;
    if(remainingLives == lives){
        lives++;
        addLife = true;
    }
    remainingLives = lives;
}
//sets addLife to false.
function lifeAdd(){
    addLife = false;
}
//If they gain a life, then this function is called.
function drawAddLife(){
    ctx.font = "36px Arial";
    ctx.fillStyle = "#000";
    if(hard){
        ctx.fillText("+1 Life!!!", 35 * level + 105, 280);
    }
    if(easy){
        ctx.fillText("+1 Life!!!", 140, 280);
    }
}
//draws the ball.
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
}
//draws the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//draws the bricks. Different color for each brick status. blue, yellow, and red.
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            if(bricks[c][r].status >= 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if(bricks[c][r].status == 1){
                    ctx.fillStyle = "#0095DD";
                }else if(bricks[c][r].status == 2){
                    ctx.fillStyle = "#ffff66";
                }else if(bricks[c][r].status == 3) {
                    ctx.fillStyle = "#ff4d4d";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//draws the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
//draws the high score, and sets the high score in local storage.
function drawHighScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    if(hard){
        if(localStorage.getItem("hardBest") == null){
            ctx.fillText("Best: 0", 90, 20);                }
        else{
            ctx.fillText("Best: "+ localStorage.getItem("hardBest"), 90, 20);
        }
    } else if(easy){
        if(localStorage.getItem("easyBest") == null){
            ctx.fillText("Best: 0", 90, 20);                }
        else{
            ctx.fillText("Best: "+ localStorage.getItem("easyBest"), 90, 20);
        }
    }
}
//draws the lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    if(hard){
        ctx.fillText("Lives: "+lives, canvas.width-73, 20);
    }else{
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }
}
//tells what mode it is in the top right of the canvas.
function drawMode() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    if(hard){
        ctx.fillText("Hard", canvas.width - 120, 20);
    }else if(easy){
        ctx.fillText("Easy", canvas.width - 120, 20);
    }
}
//draws the level
function drawLevel() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Level " +level, canvas.width/2 - 30, 20);
}
//shows if you lose.
function gameLost(){
    ctx.font = "36px Arial";
    ctx.fillStyle = "#000";
    if(hard){
        ctx.fillText("You Lost!!! Try Again.", 35 * level, 250);
        ctx.font = "18px Arial";
        ctx.fillText("Final Score: " + score, 35 * level + 105, 280);
    }
    else if(easy){
        ctx.fillText("You Lost!!! Try Again.", 35, 250);
        ctx.font = "18px Arial";
        ctx.fillText("Final Score: " + score, 140, 280);
    }
}
//sets variable gameLose to true, in draw function causes gameLost to be called.
function gameOver() {
    gameLose = true;
    pause = true;
    dx = 0;
    dy = 0;
}
//shows if you win.
function gameWon(){
    ctx.font = "32px Arial";
    ctx.fillStyle = "#000";
    if(easy){
        ctx.fillText("You Won! Congratulations!", 10, 250);
        ctx.font = "18px Arial";
        ctx.fillText("Final Score: " + score, 140, 280);
    }
    else if(hard){
        ctx.fillText("You Won! Congratulations!", 150, 250);
        ctx.font = "18px Arial";
        ctx.fillText("Final Score: " + score, 280, 280);
    }
}
//sets variable gameWin to true, in draw function causes gameWon to be called.
function gameWinner(){
    gameWin = true;
    pause = true;
    dx = 0;
    dy = 0;
}
//draw function, draws all of the code.
function draw() {
    //redraws the background every frame.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawHighScore();
    drawMode();
    drawLives();
    drawLevel();
    //tells player that they gained 1 life.
    if(addLife){
        drawAddLife();
        var addLifeInterval = setInterval(lifeAdd, 1000);
    }
    //calls gameLost if gameLose == true.
    if(gameLose){
        gameLost();
    }
    //calls gameWon if gameWin == true.
    if(gameWin){
        gameWon();
    }
    //this is the code for bouncing off ceiling.
    if(y + dy < ballRadius){
        dy = -dy;
    }
    //this is the code for bouncing off paddle.
    else if(x > paddleX - 10 && x < paddleX + paddleWidth + 10 && y + dy > canvas.height-ballRadius){
        ballHitPaddle = true;
    }
    if(y + dy > canvas.height-ballRadius && ballHitPaddle) {
        var changeX = Math.random() + 1;
        dy = -dy;
        if(dx < 0){
            if (x > paddleCenter){
                dx = dx - changeX;
            }
            else{
                dx = dx + changeX;
            }
        }
        else{
            if (x > paddleCenter){
                dx = dx + changeX;
            }
            else{
                dx = dx - changeX;
            }
        }
        ballHitPaddle = false;
    }
        //if not, lives -- , if lives == 0, calls gameOver
        else if(ballHitPaddle == false && y + dy > canvas.height-ballRadius){
            lives--;
            reset = true;
            if(!lives) {
                gameOver();
                for(var c=0; c<brickColumnCount; c++){
                    for(var r=0; r<brickRowCount; r++){
                        var b = bricks[c][r];
                        b.status = 0;
                    }
                }
            }
            //if lives > 0, starts ball and paddle over.
            else{
                x = canvas.width/2;
                y = canvas.height-30;
                pause = true;
                dx = 0;
                dy = 0;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    //code for bouncing off of the walls.
    if(x + dx > canvas.width - ballRadius || x +   dx < ballRadius){
        dx = -dx;
    }
    //if right arrow key is pressed, paddle moves right.
    if(rightPressed) {
        paddleX += 5;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    //if left arrow key is pressed, paddle moves left.
     else if(leftPressed) {
        paddleX -= 5;
        if (paddleX < 0){
        paddleX = 0;
        }
    }
    //dx is added to x and dy is added to y to move the ball.
    x += dx;
    y += dy;
    collisionDetection();
}

//sets interval of the draw function.
var interval = setInterval(draw, 10);