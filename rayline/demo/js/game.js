/*
 *@author jinhailiang
 *@date 2019.4.18
 * 
*/

(function(){
	
var close=true;
$(".demon_Btn").click(function(e){
	if(close){
		//updateHandler();
	}
	close=!close;
})


/*------------------------------类----------------------------*/

function Mirror(){
	this.startPoint={x:0,y:0};
	this.endPoint={x:50,y:50};
	this.reflect=true;
}
Mirror.prototype.getRotation=function(){
	var start=this.startPoint,end=this.endPoint;
	return Math.atan2(end.y-start.y,end.x-start.x);
}


function Rayline(){
	this.startPoint={x:0,y:0};
	this.direction=0;
}

/*
 @len 射线上距离起始点的距离
 */
Rayline.prototype.getPoint=function(len){
	dx=len*Math.cos(this.direction);
	dy=len*Math.sin(this.direction);
	return{
		x:this.startPoint.x+dx,
		y:this.startPoint.y+dy
	}
}

/*
  @len 射线的检测范围，一般要大于舞台
  @line 检测的线段，射线照射到线段上发生反射
  return：当射在线段上时，返回交叉点，否则返回false
 */

Rayline.prototype.hitLine=function(len,line){
	var rayStart=this.startPoint;
	var rayEnd=this.getPoint(len);
	var cross;
	
	var lineStart=line.startPoint;
	var lineEnd=line.endPoint;
	cross=segmentsIntr(rayStart, rayEnd, lineStart, lineEnd)//求两条线段的交点
	if(cross){
		var len=createjsExtend.getDistance(rayStart,cross);
		if(len<3){
			return false;
		}
	}
	return cross;
}

/*
  @len 射线的检测范围，一般要大于舞台
  @line 检测的线段，射线照射到线段上发生反射
  return：当射在线段上时，返回反射的射线,否则返回null
*/

Rayline.prototype.getReflexLine=function(len,line){
	var cross;	
	if((cross=this.hitLine(len,line))){
		var angle=line.getRotation();
		var reflexLine=new Rayline();
		reflexLine.startPoint=cross;
		reflexLine.direction=2*angle-this.direction;
		return reflexLine;
	}
	return null;
}

/*---------------------------------------------------------------*/

var canvas, stage, root;
var mirrorArr=[];
var lines=[];//反射过程中产生的线段
var rayLen=1000;//射线的长度
var shape=new createjs.Shape();//存储射线
var rayLine;

init();

function init() {
	canvas = document.getElementById("canvas");
	root = new lib.donghua();

	stage = new createjs.Stage(canvas);
	stage.addChild(root);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
	gameInit()
}

function gameInit(){
	root.rotaMc1.addRotateAction(stage);
	root.rotaMc2.addRotateAction(stage);
	root.rotaMc3.addRotateAction(stage);
	root.rotaMc1.moveHandler=root.rotaMc2.moveHandler=root.rotaMc3.moveHandler=moveHandler;
	
	rayLine=new Rayline();
	rayLine.startPoint={x:100,y:0};
	rayLine.direction=75*Math.PI/180;
	
	var mirror1=new Mirror();
	var mirror2=new Mirror();
	var mirror3=new Mirror();
	var mirror4=new Mirror();
	var mirror5=new Mirror();
	var mirror6=new Mirror();
	
	mirrorArr=[mirror1,mirror2,mirror3,mirror4,mirror5,mirror6];
	root.addChild(shape);
	moveHandler();
}

function moveHandler(){
	lines=[];
	setMirrors(mirrorArr);
	hitTest(rayLine,mirrorArr,lines);
	render(lines);
}

//rayLine和mirrors中的线段做碰撞检测，把生成的线段存储在lines中
function hitTest(rayLine,mirrors,lines){
	
	var crosses=[];//存储每一个交点及对应的镜子
	for(var i=0;i<6;i++){
		var cross1=rayLine.hitLine(rayLen,mirrors[i]);
		if(cross1){
			var obj={cross:cross1,mirror:mirrors[i]};
			crosses.push(obj);
		}
	}
	
	if(crosses.length==0){
		lines.push({
			startPoint:rayLine.startPoint,
			endPoint:rayLine.getPoint(rayLen)
		})
		return lines;
	}else{
		//获取射线照射到的第一面镜子
		var first=crosses[0];
		for(var i=1;i<crosses.length;i++){
			if(createjsExtend.getDistance(crosses[i].cross,rayLine.startPoint)<createjsExtend.getDistance(first.cross,rayLine.startPoint)){
				console.log(111);
				first=crosses[i];
			}
		}
		crosses=[];
		
		lines.push({
			startPoint:rayLine.startPoint,
			endPoint:first.cross
		});
		//如果镜子不能反射，返回；
		if(!first.mirror.reflect){
			return;
		}
		var newRayLine=rayLine.getReflexLine(rayLen,first.mirror);
		hitTest(newRayLine,mirrors,lines);
	}
}

//从显示对象获取数据
function setMirrors(mirrorArr){
	for(var i=0;i<3;i++){
		var x=root["rotaMc"+(i+1)].x;
		var y=root["rotaMc"+(i+1)].y;
		var rota=root["rotaMc"+(i+1)].rotation*Math.PI/180;
		var w=Math.cos(rota)*130;
		var h=Math.sin(rota)*130;
		mirrorArr[i+3].startPoint={x:x+w,y:y+h};
		mirrorArr[i+3].endPoint={x:x-w,y:y-h};
		
		var dx=20*Math.cos(rota+Math.PI/2);
		var dy=20*Math.sin(rota+Math.PI/2);
		mirrorArr[i].startPoint={x:x+dx+w,y:y+dy+h};
		mirrorArr[i].endPoint={x:x+dx-w,y:y+dy-h};
		mirrorArr[i].reflect=false;
	}
}

//渲染lines中的数据
function render(lines){
	g=shape.graphics;
	g.clear();
	g.setStrokeStyle(3);
 	g.beginStroke("#ff0000");
 	
 	for(var i=0;i<lines.length;i++){
		g.moveTo(lines[i].startPoint.x,lines[i].startPoint.y);
		g.lineTo(lines[i].endPoint.x,lines[i].endPoint.y);
 	}
	
}

function segmentsIntr(a, b, c, d){ 
    var denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
    if (denominator==0) {  
        return false;  
    }     
    var x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
                + (b.y - a.y) * (d.x - c.x) * a.x   
                - (d.y - c.y) * (b.x - a.x) * c.x ) / denominator;  
    var y = -( (b.y - a.y) * (d.y - c.y) * (c.x - a.x)   
                + (b.x - a.x) * (d.y - c.y) * a.y   
                - (d.x - c.x) * (b.y - a.y) * c.y ) / denominator;   
    if(  
        (x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0  
         && (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0  
    ){  
        return {  
            x :  x,  
            y :  y  
        }  
    }    
    return false  
}

})()


