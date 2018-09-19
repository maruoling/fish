// JavaScript Document
var waveObj=function(){
	this.x=[];
	this.y=[];
	//先从小的圆圈开始  慢慢变大
	this.alive=[];
	this.r=[];
}
waveObj.prototype.num=10;

waveObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;
		this.r[i]=0;
	}
}
waveObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;//阴影
	ctx1.shadowColor="pink";//阴影的a颜色
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=dataTime*0.02;
			//大到一定地步
			if(this.r[i]>50){
				this.alive[i]=false;
				return;
			}
			//透明度 与半径成反比
			var alpha=1-this.r[i]/50;
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2,false);
			ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
			ctx1.stroke();
			ctx1.closePath();
			
		}
	}
	ctx1.restore();
}
//以果实的xy坐标为圆心点
waveObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=20;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
}
waveObj.prototype.born_small=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
}
