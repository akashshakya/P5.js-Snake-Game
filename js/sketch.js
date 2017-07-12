var snake;
var pixel_size = 20;
var shots = [];
var movement = [];
var highscore = 0;
var gameState = 'init';
var img;
var img2

function setup(){
  console.log('CREATED BY: AKASH SHAKYA')		
  createCanvas(windowWidth, windowHeight);
  img = loadImage("img/happy-snake.jpg");
  img2 = loadImage("img/game-over.png");

  frameRate(10);
}

function initGame(){
	image(img, windowWidth/2.4, 100, 250, 350);
	textSize(50);
	fill(34, 177, 76);
	startBtn = createButton('Lets Play');
	startBtn.position(width/2 - startBtn.width/2, height/1.5);
	startBtn.mousePressed(startGame);
}

function startGame(){
	removeElements();
	gameState = 'play';
	snake = new Snake();
	setJelloShots(5);
	loop();
}

function runGame(){
	background(34, 177, 76);
	textSize(12);
	fill(255);
	text("score: " + snake.tail.length, 1, 10);
	text("highscore: " + highscore, 1, 24);

	snake.update();
	snake.show();
	snake.checkDeath();

	fill(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
	for(var i=0;i<shots.length;i++){
		rect(shots[i].x, shots[i].y, pixel_size, pixel_size);
		if(snake.eat(shots[i])){
			snake.tail.push(createVector(snake.x, snake.y));
			shots.splice(i, 1);
			setJelloShots(1);
			if(snake.tail.length > highscore) highscore = snake.tail.length;
		}	
	}
}

function endGame(){
	background(79,221,121);
	textSize(32);
	image(img2, windowWidth/2.4, 100, 250, 350);

	var msg = 'Game Over';
	var score = 'Your Score is ' + snake.tail.length;
	msgWidht = textWidth(msg);
	scoreWidht = textWidth(score);
	fill(34, 177, 76);
	text(score, (width - scoreWidht)/2, height/1.4);
	startBtn = createButton('Play Again');
	startBtn.position(width/2 - startBtn.width/2, height/1.3);
	startBtn.mousePressed(startGame);
}

function draw(){
	if(gameState == 'init'){
		initGame();
	}
	else if(gameState == 'play'){
		runGame();
	}
	else if(gameState == 'end'){
		endGame();
	}
}

function setJelloShots(num){
  var cols = floor(width / pixel_size);
  var rows = floor(height / pixel_size);
  for(var i=0;i<num;i++){
    var location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    while(snake_intersect(location)){
      location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    }
    shots.push(location);
  }
}

function snake_intersect(location){
  var intersect = false;
  if(location.x == snake.pos.x && location.y == snake.pos.y){
    intersect = true;
  }else{
    for(var i=0;i<snake.tail.length;i++){
      if(location.x == snake.tail[i].x && location.y == snake.tail[i].y){
        intersect = true;
        break;
      }
    }
    for(var i=0;i<shots.length;i++){
      if(location.x == shots[i].x && location.y == shots[i].y){
        intersect = true;
        break;
      }
    }
  }
  return intersect;
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    movement.push([0, 1]);
  }else if(keyCode === UP_ARROW){
    movement.push([0, -1]);
  }else if(keyCode === LEFT_ARROW){
    movement.push([-1, 0]);
  }else if(keyCode === RIGHT_ARROW){
    movement.push([1, 0]);
  }
}
