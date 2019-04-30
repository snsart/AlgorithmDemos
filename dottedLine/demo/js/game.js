/*
 *@author jinhailiang
 *@date 2019.4.30
 * 
*/

function DottedLine(start={x:0,y:0},end={x:100,y:200},segmentsNum=20,spaceLength=10){ 
	this.startPoint=start;
	this.endPoint=end;
	this.segmentsNum=segmentsNum;
	this.spaceLength=spaceLength;
}

DottedLine.prototype.getRotation=function(){
	var start=this.startPoint,end=this.endPoint;
	return Math.atan2(end.y-start.y,end.x-start.x);
};

DottedLine.prototype.getSegments=function(){
	var segments=[];
	var end=this.endPoint,start=this.startPoint,segmentsNum=this.segmentsNum,spaceLength=this.spaceLength;
	var lineLength=Math.sqrt((end.x-start.x)*(end.x-start.x)+(end.y-start.y)*(end.y-start.y));
	var dxg=end.x-start.x;
	var dyg=end.y-start.y;
	var segmentsLength=lineLength-spaceLength*(segmentsNum-1);
	var segmentLength=segmentsLength/segmentsNum;
	//每一段空间在x和y轴方向上的投影长度
	var spacedx=dxg*spaceLength/lineLength;
	var spacedy=dyg*spaceLength/lineLength;
	//每一节在x和y轴方向上的投影长度
	var segmentdx=dxg*segmentLength/lineLength;
	var segmentdy=dyg*segmentLength/lineLength;
	var dx=spacedx+segmentdx,dy=spacedy+segmentdy;
	for(var i=0,x=start.x,y=start.y;i<segmentsNum;i++,x+=dx,y+=dy){
		segments.push({startPoint:{x:x,y:y},endPoint:{x:x+segmentdx,y:y+segmentdy}});
	}
	return segments;
};




(function(){
	
var close=true;
$(".demon_Btn").click(function(e){
	if(close){
		updateHandler();
	}
	close=!close;
})


var canvas, stage, root;
var shape;

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
function updateHandler(){
	
}

function gameInit(){
	shape=new createjs.Shape();
	root.addChild(shape);
	
	var dottedLine=new DottedLine();
	dottedLine.spaceLength=10;
	dottedLine.segmentsNum=10;
	var segments=dottedLine.getSegments();
	render(segments);
}

function render(lines){
	var g=shape.graphics;
	g.setStrokeStyle(3);
 	g.beginStroke("#ff0000");
 	for(var i=0;i<lines.length;i++){
 		g.moveTo(lines[i].startPoint.x,lines[i].startPoint.y);
		g.lineTo(lines[i].endPoint.x,lines[i].endPoint.y);
 	}
	
}

})()


