## �߶�

### ����
ͨ�����������յ�������һ���߶�

```javascript
function Line(start,end){ 
	this.startPoint=start;
	this.endPoint=end;
}

```
### ����
��ȡ�߶εĽǶ�
```javascript
Line.prototype.getRotation=function(){
	var start=this.startPoint,end=this.endPoint;
	return Math.atan2(end.y-start.y,end.x-start.x);
}
```