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
var lines=[],crosses=[];


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
	getCrosses(lines);
	tagCross();
	console.log(crosses.length);
	var num=getNumOfTrangle();
	root.num.text=String(num);
}



function gameInit(){
	
	var isdown=false;
	
	var lineShape;
	
	stage.addEventListener("stagemousedown",function(e){
		if(!isCut){
			return;
		}
		
		lineShape=new createjs.Shape();
		lineShape.startPoint=new Point(stage.mouseX,stage.mouseY);
		root.addChild(lineShape);
		
		isdown=true;
	})
	
	stage.addEventListener("stagemousemove",function(e){
		if(!isCut){
			return;
		}
		if(isdown){
			lineShape.endPoint=new Point(stage.mouseX,stage.mouseY);
			renderLine(lineShape);
		}
	})
	
	stage.addEventListener("stagemouseup",function(e){
		if(!isCut){
			return;
		}
		isdown=false;
		lineShape.crosses=[];
		lines.push(lineShape);	
	})
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
        Math.round(x - a.x) * Math.round(x - b.x) <= 0 && Math.round(y - a.y) * Math.round(y - b.y) <= 0  
         && Math.round(x - c.x) * Math.round(x - d.x) <= 0 && Math.round(y - c.y) * Math.round(y - d.y) <= 0  
    ){  
        return {  
            x :  x,  
            y :  y  
        }  
    }   

    return false  
}

function getCrosses(lines){
	
	for(var i=0;i<lines.length-1;i++){
		for(var j=i+1;j<lines.length;j++){
			var cross=segmentsIntr(lines[i].startPoint,lines[i].endPoint,lines[j].startPoint,lines[j].endPoint);
			if(cross){
				lines[i].crosses.push(cross);
				lines[j].crosses.push(cross);
				crosses.push(cross);
			}
		}
	}
}

function tagCross(){
	var tags=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q"]
	for(var i=0;i<crosses.length;i++){
		crosses[i].tag=tags[i];
		var tag=createjsExtend.createLibMc("Tag");
		root.addChild(tag);
		tag.x=crosses[i].x;
		tag.y=crosses[i].y;
		tag.txt.text=tags[i];
	}
}



function getNumOfTrangle(){
	var num=0;
	for(var i=0;i<crosses.length-2;i++){
		for(var j=i+1;j<crosses.length-1;j++){
			for(var k=j+1;k<crosses.length;k++){
				var p1=crosses[i],p2=crosses[j],p3=crosses[k];
				if(isTrangle(p1,p2,p3)){
					console.log("三角形："+p1.tag+p2.tag+p3.tag);
					num++;
				}
			}
		}
	}
	return num;
}

function isTrangle(p1,p2,p3){
	var copyLines=lines.concat();
	var num=0;
	for(var i=copyLines.length-1;i>=0;i--){
		var crosses=copyLines[i].crosses;
		if(crosses.indexOf(p1)!=-1&&crosses.indexOf(p2)!=-1){
			num++;
			copyLines.splice(i,1);
			continue;
		}
		if(crosses.indexOf(p1)!=-1&&crosses.indexOf(p3)!=-1){
			num++;
			copyLines.splice(i,1);
			continue;
		}
		if(crosses.indexOf(p2)!=-1&&crosses.indexOf(p3)!=-1){
			num++;
			copyLines.splice(i,1);
			continue;
		}
	}
	
	if(num==3){
		return true;
	}
	return false;
}

function clear(shapes){
	for(var i=0;i<shapes.length;i++){
		root.removeChild(shapes[i]);
	}
	shapes=[];
}


function renderLine(shape){
	var g=shape.graphics;
	g.clear();
	g.setStrokeStyle(3,"round","round");
	g.beginStroke("#ffffff");
	g.moveTo(shape.startPoint.x, shape.startPoint.y);
	g.lineTo(shape.endPoint.x, shape.endPoint.y);
}



})()


