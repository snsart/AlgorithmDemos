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

function Point(x,y){
	this.x=x;
	this.y=y;
}

/*---------------------------------------------------------------*/

var canvas, stage, root;

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
	var isdown=false,polygons=[],shapes=[];
	var polygon=[new Point(100,100),new Point(150,200),new Point(150,250),new Point(50,250),new Point(50,200)];
	polygons.push(polygon);
	render(shapes,polygons,"#666666");
	
	var line={
		startPoint:new Point(0,0),
		endPoint:new Point(0,0)
	}
	var shape=new createjs.Shape();
	root.addChild(shape);
	
	stage.addEventListener("stagemousedown",function(e){
		line.startPoint.x=stage.mouseX;
		line.startPoint.y=stage.mouseY;
		root.addChild(shape);
		isdown=true;
	})
	
	stage.addEventListener("stagemousemove",function(e){
		if(isdown){
			line.endPoint.x=stage.mouseX;
			line.endPoint.y=stage.mouseY;
			renderLine(shape,line);
		}
	})
	
	stage.addEventListener("stagemouseup",function(e){
		isdown=false;
		polygons=cupPolygons(line,polygons);
		render(shapes,polygons,"#666666");
	})
	
	root.breakBtn.addEventListener("click",function(e){
		for(var i=0;i<shapes.length;i++){
			shapes[i].x=Math.random()*300;
			shapes[i].y=Math.random()*300;
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
			polygon2.push(crosses[1],crosses[0]);
		}else if(i<crosses[0].index||i>crosses[1].index){
			polygon1.push(polygoncopy[i]);
		}else{
			polygon2.push(polygoncopy[i]);
		}
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
		root.addChild(shape);
		shapes.push(shape);
		drawPolygon(shape,polygons[i],3,"#000000",fillColor);
	}
}

function renderLine(shape,line){
	var g=shape.graphics;
	g.clear();
	g.setStrokeStyle(3,"round","round");
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


