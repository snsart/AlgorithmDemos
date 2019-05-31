/*
 *@author jinhailiang
 *@date 2019.4.18
 * 
*/

(function(){
	

/*------------------------------类----------------------------*/

function Point(x,y){
	this.x=x;
	this.y=y;
}

/*---------------------------------------------------------------*/

var canvas, stage, root,isCut=toolList.selected.name=="index3"?true:false;;



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

toolList.eventHandler=function(){
	isCut=this.selected.name=="index3"?true:false;
}

toolList.update.clickhandler=function(){
	
}


function gameInit(){
	
	var isdown=false;

	
	var line={
		visible:false,
		startPoint:new Point(0,0),
		endPoint:new Point(0,0)
	}
	var lineShape=new createjs.Shape();
	root.addChild(lineShape);
	
	var verLine={
		visible:false,
		startPoint:root.p,
		endPoint:new Point(0,0)
	}
	var verLineShape=new createjs.Shape();
	root.addChild(verLineShape);
	
	stage.addEventListener("stagemousedown",function(e){
		if(!isCut){
			return;
		}
		line.visible=true;
		line.startPoint.x=stage.mouseX;
		line.startPoint.y=stage.mouseY;
		root.addChild(lineShape);
		isdown=true;
	})
	
	stage.addEventListener("stagemousemove",function(e){
		if(!isCut){
			return;
		}
		if(isdown){
			line.endPoint.x=stage.mouseX;
			line.endPoint.y=stage.mouseY;
			renderLine(lineShape,line);
		}
	})
	
	stage.addEventListener("stagemouseup",function(e){
		if(!isCut){
			return;
		}
		isdown=false;
		var distanceP2L=getDistanceP2L(root.p,line);
		verLine.endPoint=distanceP2L[1];
		renderLine(verLineShape,verLine);
		
		line.visible=false;
		
	})
}


function renderLine(shape,line){
	var g=shape.graphics;
	g.clear();
	g.setStrokeStyle(3,"round","round");
	g.beginStroke("#000000");
	g.moveTo(line.startPoint.x, line.startPoint.y);
	g.lineTo(line.endPoint.x, line.endPoint.y);
}

function getDistanceP2L(point,line){

	var x1=line.startPoint.x;
	var y1=line.startPoint.y;
	var x2=line.endPoint.x;
	var y2=line.endPoint.y;
	var x0=point.x;
	var y0=point.y;
	
	var k=x1==x2?10000:(y2-y1)/(x2-x1);//当x1=x2时，给斜率设一个较大值10000
	var a=k;
	var b=-1;
	var c=y1-k*x1;
	
	var d=Math.abs(a*x0+b*y0+c)/Math.sqrt(a*a+b*b);

	var px=(b*b*x0-a*b*y0-a*c)/(a*a+b*b);
	var py=(a*a*y0-a*b*x0-b*c)/(a*a+b*b); 
	var p=new Point(px,py);

	return [d,p];
}


})()


