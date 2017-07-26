function DynRoad(elementId){
	this.height = 100000;
	this.width = 800;

	this.element = document.getElementsByClassName(elementId)[0];
	var that = this;
	this.create = function(){
		that.element.style.width = that.width + 'px';
		that.element.style.height = that.height + 'px';
		that.element.style.position = 'absolute';
		that.element.style.backgroundImage = "url('./images/Road.PNG')";
	}
	this.delete = function(mainContainer){
		mainContainer.removeChild(that.element);
	}
}