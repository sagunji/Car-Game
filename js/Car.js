function Car(){
	this.xPos;
	this.yPos;
	var that = this;
	this.element = document.createElement('div');

	this.create = function(carId){
		if(carId == "main"){
			that.element.className += 'main-car';
			that.element.style.backgroundImage = "url('./images/myCar.png')";
		}
		else if(carId == "enemy"){
			that.element.className += 'enemy-car';
			that.xPos = randomPos();
		}
		that.element.style.position = 'absolute';
	}

	this.setPosition = function(xPos, yPos) {
		// debugger;
	    that.xPos = xPos;
	    that.yPos = yPos;

	    that.element.style.left = that.xPos + "px";
	    that.element.style.top = that.yPos + "px";
	  }

// setInitialPos
	this.movePos = function(posX) {
    	this.xPos += posX;
    	this.element.style.left = this.xPos + 'px';
  	}
  	this.movePosY = function(posY){
  		this.yPos += posY;
  		this.element.style.top = this.yPos + 'px';
  	}	
  	this.deleteCar = function(container) {
    	container.removeChild(that.element);
  	}
}