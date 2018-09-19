// JavaScript Document
//大鱼和果实的碰撞
function momFruitCollision(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				//如果鱼和果实的距离小于30
				if(l<900){
					fruit.dead(i);
					//大鱼的身体i变化
					mom.momBodyCount++;
					data.fruitNum++;
					if(mom.momBodyCount>7){
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue"){
						data.double=2;
					}else{
						data.double=1;
					}
					//画圆圈
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}
}

//大鱼喂小鱼
function momBabyCollision(){
	var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	if(l<900){
		//大鱼的能量消失
		//小鱼能量补满
		if(data.fruitNum>0&&!data.gameOver){
			baby.babyBodyCount=0;
			mom.momBodyCount=0;
			data.addScore();//一定要写在reset的前面
			data.reset();
			ctx1.strokeStyle="red";
			wave.born_small(baby.x,baby.y);
		}
	}
}