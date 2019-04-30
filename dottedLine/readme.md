## 虚线

### 属性
用下面四个属性来描述虚线
1.起点
2.终点
3.节段数量
4.节段间隔

```javascript
function DottedLine(start,end,segnum,space){ 
	this.startPoint=start;
	this.endPoint=end;
	this.segmentsNum=segnum;
	this.space=spaceLength;
}

```
### 方法

获取虚线的角度
```javascript
DottedLine.prototype.getRotation=function(){
	var start=this.startPoint,end=this.endPoint;
	return Math.atan2(end.y-start.y,end.x-start.x);
}
```

获取组成虚线的每条线段
```javascript
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
}
```