

var momObj=function () {
    this.x;
    this.y;
    this.angle;
    //鱼眼睛  鱼的身体  鱼的尾巴
    this.bigBody=new Image();

    //鱼尾的定时器
    this.momTailTimer=0;
    this.momTailCount=0;

    //鱼眼睛
    this.momEyeTimer=0;
    this.momEyeCount=0;
    //多长时间眨一次眼
    this.momEyeInterval=1000;

    this.momBodyCount=0;
}

//初始化的时候
momObj.prototype.init=function () {
    // 鱼的位置在正中间
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;

    this.bigBody.src="images/bigSwim0.png";
}

momObj.prototype.draw=function () {
    //鱼的x，y跟随鼠标移动
    //目标位置  当前位置  0.95倍的速率去接近目标
    this.x=lerpDistance(mx,this.x,0.95);
    this.y=lerpDistance(my,this.y,0.95);

    //旋转角度  Math。atan2计算
    var deltaX=mx-this.x;   //只有慢慢接近  这个值才不是0
    var deltaY=my-this.y;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    //计算旋转
    this.angle=lerpAngle(beta,this.angle,0.6);

    //动态地改变鱼尾巴
    this.momTailTimer+=dataTime;
    if (this.momTailTimer>50){  //鱼尾巴改变的时间
        //改变
        this.momTailCount=(this.momTailCount+1)%8;   //【0-7】的范围
        //时间也要重新计算
        this.momTailTimer%=50;
    }
    var momTailCount=this.momTailCount;

    //动态改变鱼眼睛
    this.momEyeTimer+=dataTime;
    if (this.momEyeTimer>this.momEyeInterval){
        this.momEyeCount=(this.momEyeCount+1)%2;
        this.momEyeTimer%=this.momEyeInterval;

        //要知道鱼到这一秒是睁眼还是闭眼
        if (this.momEyeCount==0){
            this.momEyeInterval=Math.random()*1500+1500;
        }else {
            this.momEyeInterval=300;  //
        }
    }
    var momEyeCount=this.momEyeCount;
    var momBodyCount=this.momBodyCount;

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    //
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+20,-momTail[momTailCount].height*0.5);
    //判断
    if (data.double==1){
        ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);
    }else {
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
    }
    ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
    ctx1.restore();
}