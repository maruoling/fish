// JavaScript Document
document.body.onload=game;
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;


var bgPic;
var ane;//海葵
var fruit;//果实

var mom;
var baby;


var lastTime;
var dataTime;

var mx=0;
var my=0;

//定义小鱼的动画的
var babyTail=[];
var babyEye=[];
var babyBody=[];
//大鱼
var momTail=[];
var momEye=[];
var momBodyOrange=[];
var momBodyBlue=[];

var data;
var wave;
var bigwave;

//整个游戏的主入口
function game(){
	init();
	//setInterval(gameLoop,60);
	lastTime=new Date();
	gameLoop();
}
function init(){
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext("2d");//绘制鱼   ui 特效
	
	can1.onmousemove=function(e){
		if(!data.gameOver){
			mx=e.offsetX;
			my=e.offsetY;
		}
	}
	
	can2=document.getElementById("canvas2");
	ctx2=can2.getContext("2d");//绘制背景  鱼饵
	
	//在canvas上绘制y图片
	canWidth=can1.width;
	canHeight=can1.height;
	
	 bgPic=new Image();
	//js的加载图片 路径路径调整到与网页相关的路径
	//css的加载图片/映射   以css文件为基准的
	//var bgPic;
	bgPic.src="images/background.jpg";
	//等待图片加载完之后在显示出来
	//bgPic.onload=function(){
		ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
		//画海藻
		ane=new aneObj();
		ane.init();
		
		fruit=new fruitObj();
		fruit.init();
		
		mom=new momObj();
		mom.init();
		baby=new babyObj();
		baby.init();
	
		for(var i=0;i<8;i++){
			babyTail[i]=new Image();
			babyTail[i].src="images/babyTail"+i+".png";
			momTail[i]=new Image();
            momTail[i].src="images/bigTail"+i+".png";
			momBodyOrange[i]=new Image();
			momBodyOrange[i].src="images/bigSwim"+i+".png";
			momBodyBlue[i]=new Image();
			momBodyBlue[i].src="images/bigSwimBlue"+i+".png";
		}
		for(var i=0;i<2;i++){
				babyEye[i]=new Image();
				babyEye[i].src="images/babyEye"+i+".png";
				momEye[i]=new Image();
				momEye[i].src="images/bigEye"+i+".png";
			}
		for(var i=0;i<20;i++){
				babyBody[i]=new Image();
				babyBody[i].src="images/babyFade"+i+".png";
			}
		data=new dataObj();
		wave=new waveObj();
		wave.init();
		
	
		/*bigwave=new bigwaveObj();
    	wave.init();*/
	//}
}
function gameLoop(){
	//自动的  计算帧   然后每次调动这个函数    定时器的原理差不多
	window.requestAnimFrame(gameLoop);
	var now=new Date();
	dataTime=now-lastTime;//看成是定时器的时间//setInterval(gameLoop,60);
	//console.log(dataTime);//只不过定时器的时间是死的  我们这个时间是活的
	lastTime=now;
	if(dataTime>40) daltaTime=40;
	ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
	
	//无限制的让海藻摆动 
	ane.draw();
	
	//无限制的生出果实
	fruitMonitor();
	fruit.draw();
	
	//这是ctx1的东西   也要清空画布
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	momFruitCollision();
	baby.draw();
	momBabyCollision();
	data.draw();
	wave.draw();
}