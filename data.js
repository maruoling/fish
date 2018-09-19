// JavaScript Document
var dataObj=function(){
	//果实数量
	this.fruitNum=0;
	//分数  默认是1倍  吃了蓝色的分数为两倍
	this.double=1;
	this.score=0;
	this.gameOver=false;
    this.alpha=0;
}
dataObj.prototype.reset=function(){
	this.fruitNum=0;
	this.double=1;
	
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
}

dataObj.prototype.draw=function(){
	ctx1.fillStyle="white";
	ctx1.font="bold 26px Calibri";
	//ctx1.fillText("吃的果实数量:"+this.fruitNum,canWidth*0.5,canHeight-20);
	//ctx1.fillText("倍数:"+this.double,canWidth*0.5,canHeight-50);
	ctx1.fillText("SCORE:"+this.score,canWidth*0.45,canHeight-20);
	if(data.gameOver){
        this.alpha+=daltaTime*0.0001;
        if(this.alpha>1){
            this.alpha=1;
        }
        ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
        ctx1.font = "50pt Calibri";
        ctx1.textAlign="center";
        ctx1.fillText("GAMEOVER",canWidth*0.5,canHeight*0.5);
    }
}