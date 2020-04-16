var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
/*var win = false;
var lose = false;
//lose
function youLose() {
    lose = true;
    this.y = 0;
    this.x = 0;
}
function youLost() {
    context.font = "30px Arial";
    context.fillStyle = "#000";
    context.fillText("You Lost!", 75, 135);
}
if(lose) {
    youLost();
}
*/
// that ^ should make it make you win/lose but it doesn't work

canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};
var step = function() {
  update();
  render();
  animate(step);
};

var update = function() {
};

var render = function() {
  context.fillStyle = "#228B22";
  context.fillRect(0, 0, width, height);
};
function Paddle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}
Paddle.prototype.render = function() {
  context.fillStyle = "#FFFFFF";
  context.fillRect(this.x, this.y, this.width, this.height);
};
function Player() {
    this.paddle = new Paddle (175, 555, 50, 10);
}
function Computer() {
    this.paddle = new Paddle (175, 35, 50, 10);
}
Player.prototype.render = function() {
  this.paddle.render();
};

Computer.prototype.render = function() {
  this.paddle.render();
};
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 4.5;
    this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "00FF00";
  context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 200);

// from Tyler :)
function drawCenterLine(){
  context.beginPath();
  context.moveTo(0, 300);
  context.lineTo(400, 300);
  context.strokeStyle = "#FFFFFF";
  context.lineWidth = 5;
  context.stroke();
};

//middle circle
function drawCircle(){
  context.strokeStyle = "#FFFFFF";
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.arc(200, 300, 70, 0, 2 * Math.PI);
  context.stroke();
};

//Opponent goal box
function drawGoalBoxOne(){
 context.strokeStyle = "#FFFFFF";
 context.beginPath ();
 context.rect(75, 0, 250, 100);
 context.stroke ();

};

//Your goal box
function drawGoalBoxTwo(){
   context.strokeStyle = "#FFFFFF";
   context.beginPath ();
   context.rect(75, 500, 250, 100);
   context.stroke ();
};
//tyler's render function
var render = function() {
  context.fillStyle = "#228B22";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#FFFFFF"
  drawCenterLine();
  drawCircle();
  drawGoalBoxOne();
  drawGoalBoxTwo();

  player.render();
  computer.render();
  ball.render();
};



/*var render = function() {
  context.fillStyle = "#228B22";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};*/

var update = function() {
    ball.update();
};

Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
};
var update = function() {
  ball.update(player.paddle, computer.paddle);
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 400) { // hitting the right wall
    this.x = 395;
    this.x_speed = -this.x_speed;
  }
    //hitting outside opponent goal boxes
  if (this.y -5 < 0 && this.x -75 <= 0) {//hitting left of opponent goal
      this.y = 5;
      this.y_speed = -this.y_speed;
  }   else if (this.y -5 < 0 && this.x + 75 >= 400) {//hitting right of opponent goal
      this.y = 5;
      this.y_speed = -this.y_speed;
  }
    //hitting outside your goal box
  if (this.y +5 > 600 && this.x -75 <= 0) {//hitting left of your goal
      this.y = 595;
      this.y_speed = -this.y_speed;
  }   else if (this.y +5 > 600 && this.x + 75 >= 400) {//hitting right of your goal
      this.y = 595;
      this.y_speed = -this.y_speed;
  }



  if(this.y > 600) { // a point was scored on you
    setTimeout(function() { alert ("You Lose!"); }, 0000);
    //youLose();
    this.x_speed = 0;
    this.y_speed = 4.5;
    this.x = 200;
    this.y = 200;
  }

  if(this.y < 0) { // you scored a point
    setTimeout(function() { alert ("You Win!"); }, 0000);
    this.x_speed = 0;
    this.y_speed = 4.5;
    this.x = 200;
    this.y = 200;
  }


  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.y_speed = -4.5;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      this.y_speed = 4.5;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }
};

var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

var update = function() {
  player.update();
  ball.update(player.paddle, computer.paddle);
};

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 37) { // left arrow
      this.paddle.move(-6, 0);
    } else if (value == 39) { // right arrow
      this.paddle.move(6, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) { // all the way to the left
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 400) { // all the way to the right
    this.x = 400 - this.width;
    this.x_speed = 0;
  }
}

var update = function() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};
//easy="diff = -7", "diff = 7"
//medium:10
//hard:13
//insane:17 (I beat it at insane so it is possible.)
//Impossible:25 (Maybe not impossible, but probably.)

Computer.prototype.update = function(ball) {
  var x_pos = ball.x;
  var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
  if(diff < 0 && diff < -4) { // max speed left
    diff = -7;
  } else if(diff > 0 && diff > 4) { // max speed right
    diff = 7;
  }
  this.paddle.move(diff, 0);
  if(this.paddle.x < 0) {
    this.paddle.x = 0;
  } else if (this.paddle.x + this.paddle.width > 400) {
    this.paddle.x = 400 - this.paddle.width;
  }
};











