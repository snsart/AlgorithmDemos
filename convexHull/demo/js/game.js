(function(){


var close=true;
$(".demon_Btn").click(function(e){
	if(!close){
		updateHandler();
	}
	close=!close;
})

var canvas, stage, root;
var points=[];
var shape;

init();
function init() {
	canvas = document.getElementById("canvas");
	root = new lib.donghua1()
	
	stage = new createjs.Stage(canvas);
	stage.addChild(root);
	stage.update();
	
	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);	
	gameInit();
}

function updateHandler(){
	
}

function gameInit(){
	shape=new createjs.Shape();
	root.addChild(shape);
	
	for(var i=1;i<=10;i++){
		points.push(root["mc"+i]);
		root["mc"+i].addDragAction(new createjs.Rectangle(0,0,1024,768),stage);
		root["mc"+i].moveHandler=function(){
			drawLines();
		}
	}
	
	var convexPoints=getConvexHull(points);
	drawLines();
	
}

function drawLines(){
	var convexPoints=getConvexHull(points);
	drawPolygon(shape,convexPoints,1,"#000000","#D81803");
	
}


//求点的凸包
function getConvexHull(allPoints){
	var points=allPoints.concat();
	
	var convexPoints=[];
	var startPoint=getStartPoint(points);
	points.splice(points.indexOf(startPoint),1);
	points.sort(compare);
	convexPoints.push(startPoint);
	convexPoints.push(points[0]);
	
	for(i=1;i<points.length;i++){
		var vector1={	x:convexPoints[convexPoints.length-1].x-convexPoints[convexPoints.length-2].x,
						y:convexPoints[convexPoints.length-1].y-convexPoints[convexPoints.length-2].y};
						
		var vector2={	x:points[i].x-convexPoints[convexPoints.length-1].x,
						y:points[i].y-convexPoints[convexPoints.length-1].y};
		
		while(getCross(vector1,vector2)<0){
			convexPoints.pop();
			vector1={	x:convexPoints[convexPoints.length-1].x-convexPoints[convexPoints.length-2].x,
						y:convexPoints[convexPoints.length-1].y-convexPoints[convexPoints.length-2].y};
			vector2={	x:points[i].x-convexPoints[convexPoints.length-1].x,
						y:points[i].y-convexPoints[convexPoints.length-1].y};
		}
		convexPoints.push(points[i]);
	}
	
	
	return convexPoints;
	
	//各点按极坐标的角度排序,若极坐标一样按x坐标排序,若x坐标一样按y排序；
	function compare(value1,value2){
		var value1Angle=getPolarAngle(startPoint,value1);
		var value2Angle=getPolarAngle(startPoint,value2);
		if(value1Angle<value2Angle){
			return -1;
		}else if (value1Angle>value2Angle){
			return 1;
		}else{
			if(value1.x<value2.x){
				return -1
			}else if(value1.x>value2.x){
				return 1;
			}else{
				if(value1.y<value2.y){
					return 1;
				}else if(value1.y>value2.y){
					return -1;
				}else{
					return 0;
				}
				
			}
		}
	}
	
	//选出y轴最小的点startPoint
	function getStartPoint(points){
		var startPoint=points[0];
		for(var i=1;i<points.length;i++){
			if(points[i].y<startPoint.y){
				startPoint=points[i];
			}else if(points[i].y==startPoint.y){
				if(points[i].x<startPoint.x){
					startPoint=points[i];
				}
			}
		}
		return startPoint
	}
}


function getPolarAngle(p1,p2){
	return Math.atan2(p2.y-p1.y,p2.x-p1.x);
}

//叉积
function getCross(vector1,vector2){
	return vector1.x*vector2.y-vector2.x*vector1.y;
}

function drawPolygon(shape,points,thickness,strokeColor,fillColor) {
	
	shape.graphics.clear();
	shape.graphics.setStrokeStyle(thickness,"round","round");
	shape.graphics.beginStroke(strokeColor);
	//shape.graphics.beginFill(fillColor);

	shape.graphics.moveTo(points[0].x, points[0].y);
	for(var i=1;i<points.length;i++){
		shape.graphics.lineTo(points[i].x, points[i].y);
	}
	shape.graphics.lineTo(points[0].x, points[0].y);
	shape.graphics.endFill(); 
}


})()
