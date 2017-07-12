function Snake(){
  this.show = function(){
    fill(255);
    for(var i=0;i<this.tail.length;i++){
      rect(this.tail[i].x, this.tail[i].y, pixel_size, pixel_size);
    }

    rect(this.pos.x, this.pos.y, pixel_size, pixel_size)
  }

  this.update = function(){
    if(movement.length){
      if(snake.speed.x != movement[0][0]*-1 && snake.speed.y != movement[0][1]*-1){
        snake.dir(movement[0][0], movement[0][1]);
      }
      movement.splice(0, 1);
    }

    this.tail.unshift(createVector(this.pos.x, this.pos.y));
    this.tail.pop();
    this.pos.x += this.speed.x * pixel_size;
    this.pos.y += this.speed.y * pixel_size;
  }

  this.dir = function(x, y){
    this.speed.x = x;
    this.speed.y = y;
  }

  this.checkDeath = function(){
    if(this.pos.x >= width || this.pos.y >= height || this.pos.x < 0 || this.pos.y < 0){
    	gameState = 'end';
    }
    for(var i=0;i<this.tail.length;i++){
      if(this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y){
      	gameState = 'end';
      }
    }
  }

  this.eat = function(pos){
    return this.pos.x == pos.x && this.pos.y == pos.y;
  }

  this.reset = function(){
    shots = [];
    this.tail = [];
    this.pos = createVector(0, 0);
    this.speed = createVector(1, 0);
  }

  this.reset();
}
