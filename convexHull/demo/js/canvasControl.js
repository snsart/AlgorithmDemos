/*canvas控制工具栏*/
var canvas=document.getElementById("canvas");
canvas.initLeft=$("#canvas").css("left");
canvas.initTop=$("#canvas").css("top");


canvas.addEventListener("mousedown",function(e){
	console.log(12345);
})


$(".arrow").click(function(e){
	
	removeDragActionTo(canvas);
	$(canvas).css("cursor","default");
	$(".arrow").css("background-image","url(img/arrowdown.svg)");
	$(".hand").css("background-image","url(img/handup.svg)");
})

$(".hand").click(function(e){
	startDrag=true;
	addDragActionTo(canvas);
	
	$(canvas).css("cursor","move");
	$(".arrow").css("background-image","url(img/arrowup.svg)");
	$(".hand").css("background-image","url(img/handdown.svg)");
})

//放大

$(".enlarge").mousedown(function(e){
	$(canvas).animate({width:'+=1rem'},"fast");	
	$(".enlarge").css("background-image","url(img/enlargedown.svg)");
})

$(".enlarge").mouseup(function(e){
	$(".enlarge").css("background-image","url(img/enlarge.svg)");
})

//缩小
$(".reduce").mousedown(function(e){	
	$(canvas).animate({width:'-=1rem'},"fast");	
	$(".reduce").css("background-image","url(img/reducedown.svg)");
})

$(".reduce").mouseup(function(e){
	$(".reduce").css("background-image","url(img/reduce.svg)");
})

//复位
$(".initbtn").mousedown(function(e){
	
	$(canvas).css("left","auto");
	$(canvas).css("top","auto");
	$(canvas).css("width","40rem");
	
	$(".initbtn").css("background-image","url(img/initdown.svg)");
})

$(".initbtn").mouseup(function(e){
	$(".initbtn").css("background-image","url(img/init.svg)");
})


function addDragActionTo(canvas){
	canvas.addEventListener("mousedown",canvasDragHandler,true);
}

function removeDragActionTo(canvas){
	canvas.removeEventListener("mousedown",canvasDragHandler,true);
}

var currentCanvas;
function canvasDragHandler(e){
	currentCanvas=e.currentTarget;
	currentCanvas.mouseDown=true;
	
	currentCanvas.canvasOffsetTop=$(currentCanvas).css("top")=="auto"?0:parseInt($(currentCanvas).css("top"));
	currentCanvas.canvasOffsetLeft=$(currentCanvas).css("left")=="auto"?0:parseInt($(currentCanvas).css("left"));
	currentCanvas.downTop=e.clientY;
	currentCanvas.downLeft=e.clientX;
}

$("html").mousemove(function(e){
	if(currentCanvas!=null&&currentCanvas.mouseDown){	
		var y=e.clientY-currentCanvas.downTop+currentCanvas.canvasOffsetTop;
		var x=e.clientX-currentCanvas.downLeft+currentCanvas.canvasOffsetLeft;
		if(y<-100){
			y=-100;
		}
		$(currentCanvas).css("top",y);
		$(currentCanvas).css("left",x);
	}
});

$("html").mouseup(function(e){
	if(currentCanvas!=null){
		currentCanvas.mouseDown=false;
	}
});

