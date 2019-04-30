## [<<Ŀ¼](../README.md)
## ����

### ����
�������ĸ���������������
1.���
2.�յ�
3.�ڶ�����
4.�ڶμ��

```javascript
function DottedLine(start,end,segnum,space){ 
	this.startPoint=start;
	this.endPoint=end;
	this.segmentsNum=segnum;
	this.space=spaceLength;
}

```
### ����

��ȡ���ߵĽǶ�
```javascript
DottedLine.prototype.getRotation=function(){
	var start=this.startPoint,end=this.endPoint;
	return Math.atan2(end.y-start.y,end.x-start.x);
}
```

��ȡ������ߵ�ÿ���߶�
```javascript
DottedLine.prototype.getSegments=function(){
	var segments=[];
	var end=this.endPoint,start=this.startPoint,segmentsNum=this.segmentsNum,spaceLength=this.spaceLength;
	var lineLength=Math.sqrt((end.x-start.x)*(end.x-start.x)+(end.y-start.y)*(end.y-start.y));
	var dxg=end.x-start.x;
	var dyg=end.y-start.y;
	var segmentsLength=lineLength-spaceLength*(segmentsNum-1);
	var segmentLength=segmentsLength/segmentsNum;
	//ÿһ�οռ���x��y�᷽���ϵ�ͶӰ����
	var spacedx=dxg*spaceLength/lineLength;
	var spacedy=dyg*spaceLength/lineLength;
	//ÿһ����x��y�᷽���ϵ�ͶӰ����
	var segmentdx=dxg*segmentLength/lineLength;
	var segmentdy=dyg*segmentLength/lineLength;
	var dx=spacedx+segmentdx,dy=spacedy+segmentdy;
	for(var i=0,x=start.x,y=start.y;i<segmentsNum;i++,x+=dx,y+=dy){
		segments.push({startPoint:{x:x,y:y},endPoint:{x:x+segmentdx,y:y+segmentdy}});
	}
	return segments;
}
```