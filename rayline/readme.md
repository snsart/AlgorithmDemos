## [<<目录](../README.md)
## 射线

###属性

描述一条射线需要两个基本的属性，即射线的起始点和方向。当射线照射到镜子上时，会反射出另一条射线，因此需要一个属性来存储反射出来的射线，用属性reflexLine存储反射出来的射线。当射线在多个镜子之间来回反射时会通过reflexLine属性形成一条射线链。属性描述如下：

1. 起始点(startPoint):Point
2. 方向角度(direction):number
3. 反射线(reflexLine):Rayline

```javascript
function Rayline(){
	this.startPoint=new Point(0,0);
	this.direction=0;
	this.reflexLine=null;
}

```

###方法

射线上的方法
1. 得到射线上距离起始点为len长度的点
getPoint(len);
2. 检测射线是否照射到线段(镜子)上，若照射到则返回照射点，否则返回null，检测长度为len。
hitLine(len，line);

js代码实现如下：

```javascript
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
  @len 射线的长度，这里指射线的检测范围，一般要大于舞台
  @line 检测的线段，射线照射到线段上发生反射
  return：当射在线段上时，返回交叉点，否则返回false
 */

Rayline.prototype.hitLine=function(len，line){
	var rayStart=this.startPoint;
	var rayEnd=this.getPoint(len);
	var cross;
	
	var lineStart=line.startPoint;
	var lineEnd=line.endPoint;
	cross=segmentsIntr(rayStart, rayEnd, lineStart, lineEnd)//求两条线段的交点
	
	if(cross){
		var angle=line.getRotation();
		this.reflexLine=new Rayline();
		this.reflexLine.startPoint=cross;
		this.reflexLine.direction=2*angle-this.direction;
	}
	return cross;
}
```
segmentsIntr函数求两条线段的交点。算法见：[求两线段交点](../segmentsIntr/readme.md)<br>
