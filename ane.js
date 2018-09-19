// JavaScript Document
//面向对象编程
var aneObj=function(){
	//有很多的海葵
	this.x=[];  //起始点坐标
	this.len=[];// 终止点坐标
}
//利用Prototype原型链 来扩展一个对象的属性和方法
//规定数量
aneObj.prototype.num=50;
//确定值
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		//随机的值
		//每次前进16px 距离的范围  为20
		this.x[i]=16*i+Math.random()*20;
		//首先 保证有多高  随机的范围   200-250
		this.len[i]=200+Math.random()*50;
	}
}
//开始画海葵
aneObj.prototype.draw=function(){
	ctx2.save();
	ctx2.lineWidth=20;
	ctx2.globalAlpha=0.6;//透明度
	ctx2.lineJoin="round";
	ctx2.strokeStyle="#3b154e";
	//开始画
	for(var i=0;i<this.num;i++){
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);
		ctx2.lineTo(this.x[i],canHeight-this.len[i]);
		ctx2.closePath();
		ctx2.stroke();
	}
	ctx2.restore();
}

var aneObj=function () {
	//startpoint control point, end point
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.alpha=0;//角度
	this.amp=[];//振幅
};
aneObj.prototype.num = 50;
aneObj.prototype.init=function(){

    for(var i=0;i<this.num;i++){
        //随机的值
        //每次前进16px  距离的可控范围为20
        this.rootx[i]=16*i+Math.random()*20;
        this.headx[i]=this.rootx[i];
        this.heady[i]=canHeight-(250+Math.random()*50);
        //首先，保证有多高  随机的范围  200-250;
    //    this.len[i]=200+Math.random()*50;
        this.amp[i]=Math.random()*50+50;
    }
}
aneObj.prototype.draw=function(){
    this.alpha+=dataTime*0.0002;
    var l=Math.sin(this.alpha);
    ctx2.save();
    ctx2.lineWidth=20;
    ctx2.globalAlpha=0.7;//透明度
    ctx2.lineJoin="round";//设置圆尾
    ctx2.strokeStyle="#3b154e";
    //开始画
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        //核心代码
        ctx2.moveTo(this.rootx[i],canWidth);
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-50,this.headx[i]+l*this.amp[i],this.heady[i]);
        ctx2.closePath();
        ctx2.stroke();
    }
    ctx2.restore();
}