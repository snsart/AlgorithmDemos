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

var canvas, stage, root,isCut=false;

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
	console.log("init")
	var isdown=false,polygons=[],shapes=[];
	var polygon=[new Point(200,100),new Point(500,100),new Point(500,300),new Point(200,300)];
	polygons.push(polygon);
	render(shapes,polygons,"#ffffff");
	
	var line={
		startPoint:new Point(0,0),
		endPoint:new Point(0,0)
	}
	var lineShape=new createjs.Shape();
	root.addChild(lineShape);
	
	stage.addEventListener("stagemousedown",function(e){
		if(!isCut){
			return;
		}
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
		polygons=cupPolygons(line,polygons);
		render(shapes,polygons,"#ffffff");
		lineShape.graphics.clear();
		root.removeChild(lineShape);
	})
	
	root.cutBtn.addEventListener("click",function(e){
		isCut=!isCut;
		if(isCut){
			root.cutBtn.gotoAndStop(1)
		}else{
			root.cutBtn.gotoAndStop(0)
		}
	})	
}

function cupPolygons(line,polygons){
	var newpolygons=polygons.concat();
	for(var i=0;i<polygons.length;i++){
		var newPoly=cutPolygon(line,polygons[i]);
		if(newPoly!=null){
			newpolygons.splice(newpolygons.indexOf(polygons[i]),1);
			newpolygons.push(newPoly[0],newPoly[1]);
		}
	}
	return newpolygons;
}

function cutPolygon(line,polygon){
	var polygoncopy=polygon.concat();
	var crosses=[];
	for(var i=0,len=polygoncopy.length;i<len;i++){
		var nextIndex=i==(len-1)?0:(i+1);
		var side=[polygoncopy[i],polygoncopy[nextIndex]];
		var cross=segmentsIntr(side[0],side[1],line.startPoint,line.endPoint);
		if(cross){
			cross.index=i;
			crosses.push(cross);
		}
	}
	if(crosses.length<2){
		return null;
	}
	
	var polygon1=[],polygon2=[];
	for(var i=0,len=polygoncopy.length;i<len;i++){
		if(i==crosses[0].index){
			polygon1.push(polygoncopy[i]);
			polygon1.push(crosses[0],crosses[1]);
			polygon2.push(new Point(crosses[1].x,crosses[1].y),new Point(crosses[0].x,crosses[0].y));
		}else if(i<crosses[0].index||i>crosses[1].index){
			polygon1.push(polygoncopy[i]);
		}else{
			polygon2.push(polygoncopy[i]);
		}
	}
	/*切完后错位*/
	for(var i=0;i<polygon1.length;i++){
		polygon1[i].x-=5;
		polygon1[i].y-=5
	}
	
	for(var i=0;i<polygon2.length;i++){
		polygon2[i].x+=5;
		polygon2[i].y+=5
	}
	return [polygon1,polygon2];
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

function clear(shapes){
	for(var i=0;i<shapes.length;i++){
		root.removeChild(shapes[i]);
	}
	shapes=[];
}

function render(shapes,polygons,fillColor){
	clear(shapes);
	for(var i=0;i<polygons.length;i++){
		var shape=new createjs.Shape();
		shape.addDragAction(null,stage);
		
		shape.polygon=polygons[i];
		root.addChild(shape);
		shapes.push(shape);
		drawPolygon(shape,polygons[i],1,"#aaaaaa",fillColor);
		
		shape.mousedownHandler=function(){
			this.initX=this.x;
			this.initY=this.y;
		}
		
		shape.mouseupHandler=function(){
			for(var i=0;i<this.polygon.length;i++){
				this.polygon[i].x+=this.x-this.initX;
				this.polygon[i].y+=this.y-this.initY;
			}
		}
	}
}

function renderLine(shape,line){
	var g=shape.graphics;
	g.clear();
	g.setStrokeStyle(1,"round","round");
	g.beginStroke("#000000");
	g.moveTo(line.startPoint.x, line.startPoint.y);
	g.lineTo(line.endPoint.x, line.endPoint.y);
}

function drawPolygon(shape,points,thickness,strokeColor,fillColor) {
	if(points.length<3){
		throw new Error("至少需要三个点");
	}
	var g=shape.graphics;
	g.clear();
	g.setStrokeStyle(thickness,"round","round");
	g.beginStroke(strokeColor);
	g.beginFill(fillColor);
	
	g.moveTo(points[0].x, points[0].y);
	for(var i=1;i<points.length;i++){
		g.lineTo(points[i].x, points[i].y);
	}
	g.lineTo(points[0].x, points[0].y);
	g.endFill(); 
}

})()


