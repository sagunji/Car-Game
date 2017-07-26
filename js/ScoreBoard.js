
function ScoreBoard(){
  this.width = 130;
  this.height = 30;
  // this.color = 'green';
  // this.backgroundImage = "";
  this.element = document.createElement('div');
  var that = this;
  this.score = 0;

  this.create = function(){
    console.log(that.element);
    that.element.style.width = that.width +'px';
    that.element.style.height = that.height +'px';
    that.element.style.position = 'absolute';
    // that.element.style.top = 100 + 'px';
    // that.element.style.left = 0 + 'px';
    that.element.style.backgroundImage = "url('./images/scorechart.png')";
    that.element.style.backgroundSize = "100%";
    that.element.style.backgroundRepead = 'no-repeat';
    that.element.style.paddingTop = 40+'px';
    that.element.style.paddingLeft = 10+'px';
    that.element.innerHTML = that.score;
    that.element.setAttribute('id','scr-board');
  }
  this.changeScore = function(score1){
    that.score = score1;
    that.element.innerHTML = that.score;
  }
  this.destroyScoreBoard = function(parentId){
    parentId.removeChild(that.element);
  }
}