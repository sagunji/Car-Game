function StartGame(){
	var that = this;
  var car;

  var intervalId; // main game loop setInterval
  var moveY = 0; // scrolling div movement

  var obstacles;

  var allObstacles = [];

  var mainContainer;
  var gameOverElement;

  // main element
  var wrapper;

  var contain;
  var dynRoad;

  var nBullets = 20;
  var scoreBoard; 

	this.init = function(){
    // debugger;
    wrapper = document.getElementsByClassName('wrapper')[0];

    contain = new Container('container');
    contain.create();
    wrapper.appendChild(contain.element);

    dynRoad = new DynRoad('road');
    dynRoad.create();
    contain.appendElement(dynRoad.element);

    var scoreBoard = new ScoreBoard();
    scoreBoard.create();
    contain.appendElement(scoreBoard.element);

		car = new Car();
    car.setPosition(390, 490);

		car.create("main");
		mainContainer = document.getElementsByClassName('container')[0];
		mainContainer.appendChild(car.element);
		this.startNow();
	}

  var score = 0;

	this.startNow = function(){
		road = document.getElementsByClassName('road')[0];

    document.addEventListener('keydown', that.moveCar);

    intervalId = setInterval(function() {
      that.moveBg();
      that.createObs();
      that.placeObstacles();
      that.checkCollision();
      // that.removeObstacles();
      that.moveBullet();
      that.refillBullet();
      // score++;
      // console.log(that.scoreBoard);
      that.setScore(score++);
      // (that.scoreBoard.changeScore(score++));
      // console.log();
    }, 5);
	}
  var speed = 1;
  this.moveBg = function(){
    if(score <= 1000){
      moveY -= speed;
    }
    // else if(score > 1000 && score <= 10000){
    //   moveY -= (speed+1);
    // }
    // else if(score > 1000 && score <= 3000){
    //   moveY -= 4;
    // }
    else
    {
      moveY -= 1;
    }
    road.style.bottom = moveY + 'px';
  }

  this.createObs = function() {
    var n = 300;
    // if(speed == 2){
    //   n = 350;
    // console.log(moveY % n);
    // }
    for(var i = 0; i < 2; i++){
      if (moveY % n == 0) {

        obstacles = new Obstacles(mainContainer);
        obstacles.create();
        // debugger;

        if((allObstacles.length != 0 && allObstacles[allObstacles.length - 1].posX != obstacles.posX) || allObstacles.length === 0){
          // debugger;
          mainContainer.appendChild(obstacles.element);
          allObstacles.push(obstacles);
        }
      }
    }
  }
  this.placeObstacles = function(){
    for(var i = 0; i < allObstacles.length; i++){
      allObstacles[i].update();
      // allObstacles[i].yPos += 1;
      // allObstacles[i].element.style.top = that.posY + 'px';
    }
  }
  this.removeObstacles = function(){
    for(var i =0; i < allObstacles.length; i++){
      var test = allObstacles[i].deleteObstacle(mainContainer);
      if(test){
        var index = allObstacles.indexOf(allObstacles[i]);
        allObstacles.splice(index,1);
      }
    }
  } 

	this.moveCar = function(e){
    // when game is over
    if(that.isGameOver){
      if(e.keyCode === 13){
        that.resetGame();
        that.isGameOver = false;
      }
      else{
        return;
      }
    }

    // move left
    // console.log(e);
    // debugger;
		if (e.keyCode === 37 && car.xPos != 300) {
      car.movePos(-90);

    }
    // move right
    if (e.keyCode === 39 && car.xPos != 480) {
      car.movePos(+90);
      // console.log(car.xPos);

    }
    // move up
    if(e.keyCode === 38 && car.yPos >= 10){
      // debugger;
      car.movePosY(-10);
     
    }
    // move down
    if(e.keyCode === 40 && car.yPos <= 480){
      car.movePosY(10);
      // debugger;
    }
     if(e.keyCode === 32){
      that.shootBullet();
    }
	}
  var bullet;
  var allBullets = [];
  this.shootBullet = function(){
    if(nBullets > 0){
      bullet = new Bullet(car.xPos + 29, car.yPos - 50);
      bullet.create();
      mainContainer.appendChild(bullet.element);
      // debugger;
      allBullets.push(bullet);
      nBullets--;
    }
    else{
      var audio = new Audio('audio/bullet-sakyo.wav');
      audio.play();
    }

  }
  this.moveBullet = function(){
    if(allBullets.length <= 0)
      return;

    for(var i=0; i< allBullets.length; i++){
      allBullets[i].moveBullet();
    }
  }
  var round;
  this.refillBullet = function(){
    if(nBullets === 0){
      if (moveY % 300 === 0) {
        round = new Round();
        round.createRound();
      }
    }
  }

  this.checkCollision = function(){
    var xCar = car.xPos;
    var yCar = car.yPos;

    if(that.isGameOver)
      return;

    for(var i =0; i< allObstacles.length; i++){
      if (allObstacles[i].posX <= xCar + 80 
          && allObstacles[i].posX + 80 >= xCar 
          && allObstacles[i].posY <= yCar + 100 
          && allObstacles[i].posY + 100 >= yCar) {
        that.gameOver();
      }
    }
    for(var i= 0; i< allBullets.length; i++){
      for(var j = 0; j < allObstacles.length; j++){
         if (allObstacles[j].posX <= allBullets[i].x + 60 && allObstacles[j].posX + 60 >= allBullets[i].x 
          && allObstacles[j].posY <= allBullets[i].y + 100 
          && allObstacles[j].posY + 100 >= allBullets[i].y) {

          console.log('bullet Collision');

        // debugger;
        //remove bullet
            //remove obstacles
            //play sound
          allObstacles[j].deleteObs(mainContainer);
          var indexObs = allObstacles.indexOf(allObstacles[j]);
          allObstacles.splice(indexObs, 1);

          allBullets[i].deleteBullet(mainContainer);
          var indexBull = allBullets.indexOf(allBullets[i]);
          allBullets.splice(indexBull, 1);

          var audio = new Audio('audio/Explosion.mp3');
          audio.play();
          score += 2;
            



         }
      }
    }
  }
  this.isGameOver = false;
  this.gameOver = function(){
    // alert('The game is now over');
    var audio = new Audio('audio/crash.mp3');
    audio.play();
    clearInterval(intervalId);
    that.isGameOver = true;
    gameOverElement = document.createElement('div');
    gameOverElement.className += 'game-over';
    mainContainer.appendChild(gameOverElement);
    // alert('Your Score Is: '+ score);
  }
  this.resetGame = function(){
    gameOverElement.style.display = 'none';

    score = 0;
     for (var i = 0; i < allObstacles.length; i++) {
      var test = allObstacles[i].deleteObs(mainContainer);
      // if(test){
      //   var index = allObstacles.indexOf(allObstacles[i]);
      //   allObstacles.splice(index,1);
      // }
    }
    allObstacles = [];
    moveY = 0;
    car.deleteCar(mainContainer);
    for(var i = 0; i < allBullets.length; i++){
      allBullets[i].deleteBullet(mainContainer);
      // var indexBull = allBullets.indexOf(allBullets[i]);
      // allBullets.splice(indexBull, 1);
    }
    allBullets = [];
    nBullets = 20;
    // debugger;
    mainContainer.removeChild(document.getElementById('scr-board'));
    // scoreBoard.destroyScoreBoard(mainContainer);
    // dynRoad.delete(containontainer);
    // contain.delete(wrapper);
    that.init();
  }
  this.setScore = function(score){
    // that.scoreBoard.changeScore(score);
    // console.log(scoreBoard);
    var ele = document.getElementById('scr-board');
    ele.innerHTML = score;

  }

}

var start = new StartGame();
start.init();
