function Round(x, y){
	this.width = 80;
	this.height = 100;
	this.x = x || 0;
	this.y = y || 0;
	this.element = document.createElement('div');
	var that = this;

	this.createRound = function () {
		that.element.style.backgroundImage = "url('./images/round.png')";
		that.element.style.width = this.width + 'px';
		that.element.style.height = this.height + 'px';
		that.element.style.position = 'absolute';
		that.element.style.top = (-100) +'px';
		that.element.style.left = randomPos() +'px';
	}
	this.setPosition = function(x, y){
		that.element.style.top = (-100) +'px';
		that.element.style.left = x +'px';
	}
	this.update = function() {
    that.y += 1;
    that.element.style.top = that.y + 'px';
  }
}