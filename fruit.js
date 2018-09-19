// JavaScript Document
var fruitObj=function(){
	//坐标
	this.x=[];
	this.y=[];
	//控制果实的生长大小
	this.l=[];
	//速度
	this.speed=[];
	this.fruitType=[];//类型
	this.alive=[];//是否存活
	
	this.orange=new Image();
	this.blue=new Image();
}
//最多30个
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;//存活
		this.x[i]=0;
		this.y[i]=0;
		this.l[i]=0;
		this.speed[i]=0.005+Math.random()*0.015;
		this.fruitType[i]="";
		
	}
	this.orange.src="images/fruit.png";
	this.blue.src="images/blue.png";
}
//生出果实
fruitObj.prototype.born=function(i){
	//果实吧并不是随机长的   而是选择了一个海藻  还在海葵上面上生长
	var aneId=Math.floor(Math.random()*ane.num);//数组的索引
	
	//果实的位置
		this.x[i]=ane.headx[aneId];
		this.y[i]=ane.heady[aneId];
		this.l[i]=0;
		this.alive[i]=true;
	
	//控制这个果实是蓝色的还是黄色的
	if(Math.random()>0.15){
		this.fruitType[i]="orange";
	}else{
		this.fruitType[i]="blue";
	}
}
//画果实
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		
		//我们要控制果实的生长，以及果实的数量
		if(this.alive[i]){
			//设定果实的颜色
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
			//果实不能一直变大
			if(this.l[i]<=14){
				this.l[i]+=this.speed[i]*dataTime;
			}else{
				//果实成熟了 网上飘
				this.y[i]-=this.speed[i]*dataTime*8;
			}
			
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			//死亡
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}
	}
}
//定义入口点
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			//统计活着的数量
			num++;
		}
	}
	if(num<15){
		sendFruit();
		return;
	}
}
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}

fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}