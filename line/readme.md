## [<<目录](../README.md)
## 线段

### 属性
通过给定起点和终点来定义一条线段

```javascript
function Line(start,end){ 
	this.startPoint=start;
	this.endPoint=end;
}

```
### 方法
获取线段的角度
```javascript
Line.prototype.getRotation=function(){
	var start=this.startPoint,end=this.endPoint;
	return Math.atan2(end.y-start.y,end.x-start.x);
}
```