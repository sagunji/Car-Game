


function Obstacles(){
	this.element = document.createElement('div');

  this.posX; //left position
  this.posY; //top position

  var that = this;

  this.create = function() {
    that.element.className = 'enemy-car';
    that.posX = randomPos();
    that.posY = -100;
    that.element.style.left = that.posX + 'px';
    that.element.style.top = that.posY + 'px';
    that.element.style.backgroundImage = "url('./images/enemyCar.png')";

    // appendChild(that.element);
  }

  this.update = function() {
    that.posY += 1;
    that.element.style.top = that.posY + 'px';
  }
  this.deleteObstacle = function(container){
    if(that.posY >= 600)
    {
      // debugger;
      container.removeChild(that.element);
      // console.log('deleted Obstacles');
      return true;
    }
  }
  this.deleteObs = function (container) {
     container.removeChild(that.element);
     return true;
  }
  
}