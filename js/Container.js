
function Container(elementId){
	this.width = 800;
	this.height = 600;
	// this.color = 'green';
	// this.backgroundImage = "";
	this.element = document.getElementsByClassName(elementId)[0];
	var that = this;

	this.create = function(){
		console.log(that.element);
		that.element.style.width = that.width +'px';
		that.element.style.height = that.height +'px';
		that.element.style.position = 'relative';
		that.element.style.overflow = 'hidden';
	}
	this.appendElement = function(element){
		that.element.appendChild(element);
	}
	this.delete = function(mainContainer){
		mainContainer.removeChild(that.element);
	}
}