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
}
Mirror.prototype.getRotation=function(){
	var start=this.startPoint,end=this.endPoint;
	return Math.atan2(end.y-start.y,end.x-start.x);
}


function Rayline(){
	this.startPoint={x:0,y:0};
	this.angle=0;
	this.length=2000;
	
	this.renderLength=1000;
	this.shape=new createjs.Shape();
	this.reflexLine=null;
}

Rayline.prototype.getEndPoint=function(renderTag=false){
	var len=renderTag?this.renderLength:this.length;
	dx=len*Math.cos(this.angle);
	dy=len*Math.sin(this.angle);
	return{
		x:this.startPoint.x+dx,
		y:this.startPoint.y+dy
	}
}

Rayline.prototype.hitMirror=function(mirror){
	var rayStart=this.startPoint;
	var rayEnd=this.getEndPoint();
	var cross;
	if(!(mirror instanceof(Mirror))){
		return false;
	}else{
		var mirrorStart=mirror.startPoint;
		var mirrorEnd=mirror.endPoint;
		cross=segmentsIntr(rayStart, rayEnd, mirrorStart, mirrorEnd)
	}
	
	if(!cross){
		this.renderLength=1000;
		return false;
	}else{
		var len=createjsExtend.getDistance(rayStart,cross);
		if(len<5){
			return false;
		}
		var mirrorRota=mirror.getRotation();
		this.reflexLine=new Rayline();
		this.reflexLine.startPoint=cross;
		this.reflexLine.angle=2.6*mirrorRota-this.angle;
		return this.reflexLine;
	}
	this.renderLength=1000;
	return false;
}

Rayline.prototype.clear=function(root){
	if(this.reflexLine){
		this.reflexLine.clear(root);
		this.reflexLine=null;
	}
	this.shape.graphics.clear();
	if(root){
		root.removeChild(this.shape);
	}
	
}

Rayline.prototype.render=function(root){
	
	if(!root){
		return;
	}
	
	if(this.reflexLine){
		this.reflexLine.render(root);
	}
	root.addChild(this.shape);
	var startPoint=this.startPoint,endPoint=this.getEndPoint(true),g=this.shape.graphics;
	
	g.setStrokeStyle(3);
 	g.beginStroke("#ff0000");
	g.moveTo(startPoint.x,startPoint.y);
	g.lineTo(endPoint.x,endPoint.y);
}

/*---------------------------------------------------------------*/

var canvas, stage, root;
var mirrorArr=[];
var line;

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
	
	line=new Rayline();
	line.startPoint={x:100,y:0};
	line.angle=75*Math.PI/180;
	line.render(root);
	
	var mirror1=new Mirror();
	var mirror2=new Mirror();
	var mirror3=new Mirror();
	
	mirrorArr=[mirror1,mirror2,mirror3];
	moveHandler();
}

function moveHandler(){
	setMirrors(mirrorArr);
	line.clear(root);
	hitTest(line,mirrorArr);
	line.render(root);
}

function hitTest(line,mirrors){
	
	var newLines=[];
	for(var i=0;i<3;i++){
		var newLine=line.hitMirror(mirrors[i]);
		if(newLine){
			newLines.push(newLine);
		}
	}
	if(newLines.length==0){
		return;
	}else{
		var first=newLines[0];
		for(var i=1;i<newLines.length;i++){
			if(createjsExtend.getDistance(newLines[i].startPoint,line.startPoint)<createjsExtend.getDistance(first.startPoint,line.startPoint)){
				first=newLines[i];
			}else{
				newLines[i]=null;
			}
		}
		newLines=[];
		line.reflexLine=first;
		line.renderLength=createjsExtend.getDistance(line.startPoint,first.startPoint);
		hitTest(first,mirrors);
	}
}

function setMirrors(mirrorArr){
	for(var i=0;i<mirrorArr.length;i++){
		var x=root["rotaMc"+(i+1)].x;
		var y=root["rotaMc"+(i+1)].y;
		var rota=root["rotaMc"+(i+1)].rotation*Math.PI/180;
		var w=Math.cos(rota)*130;
		var h=Math.sin(rota)*130;
		mirrorArr[i].startPoint={x:x+w,y:y+h};
		mirrorArr[i].endPoint={x:x-w,y:y-h};
	}
}

function segmentsIntr(a, b, c, d){ 
    var denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
    if (denominator==0) {  
        return false;  
    }     
    var x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
                + (b.y - a.y) * (d.x - c.x) * a.x   
                - (d.y - c.y) * (b.x - a.x) * c.x ) / denominator ;  
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


