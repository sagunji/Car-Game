function Bullet(x, y){
	this.height = 100;
	this.width = 60;
	this.x = x || 0;
	this.y = y || 0;

	this.element = document.createElement('div');
	var that = this;
	this.create = function(){
		that.element.style.width = that.width + 'px';
		that.element.style.height = that.height + 'px';
		that.element.style.background = "url('./images/bullet.png')";
		that.element.style.backgroundRepeat = 'no-repeat';
		that.setBulletPosition(that.x, that.y);
		that.element.style.position = 'absolute';

		// that.element.className += 'bullet';

	}
	this.setBulletPosition = function(x, y){
		that.x = x;
	    that.y = y;

	    that.element.style.left = that.x + "px";
	    that.element.style.top = that.y + "px";
	}
	this.moveBullet = function(){
		that.y -=  2;
		that.element.style.top = that.y + 'px';
	}
	this.deleteBullet = function(parent){
		parent.removeChild(that.element);
	}
}
