## [<<目录](../README.md)

## 求点到直线的最短距离及垂足

### 根据两点求直线方程

已知直线上两点为：(x1,x2),(y1,y2);
设方程为：Ax+By+C=0;

1. 求斜率：k=(y2-y1)/(x2-x1)；

2. 直线方程为： y-y1=k(x-x1)

换算得：kx-y+y1-kx1=0,即：
```
A=k
B=-1
C=y1-kx1=y1-(y2-y1)/(x2-x1)*x1
```

### 根据方程求距离和垂足

1. 点(x0,y0)到直线的距离公式为：
```
d=abs(Ax0+By0+C)/sqrt(A*A+B*B);
```

2. 设垂足为p,则：

```
p.x=(B*B*x0-A*B*y0-A*C)/(A*A+B*B)
p.y=(A*A*y0-A*B*x0-B*C)/(A*A+B*B) 
```

### 函数

输入点和线段，返回距离和垂足

```javascript

function getDistanceP2L(point,line){

	var x1=line.startPoint.x;
	var y1=line.startPoint.y;
	var x2=line.endPoint.x;
	var y2=line.endPoint.y;
	var x0=point.x;
	var y0=point.y;
	
	var k=x1==x2?10000:(y2-y1)/(x2-x1);//当x1=x2时，给斜率设一个较大值10000
	var a=k;
	var b=-1;
	var c=y1-k*x1;
	
	var d=Math.abs(a*x0+b*y0+c)/Math.sqrt(a*a+b*b);

	var px=(b*b*x0-a*b*y0-a*c)/(a*a+b*b);
	var py=(a*a*y0-a*b*x0-b*c)/(a*a+b*b); 
	var p=new Point(px,py);

	return [d,p];
}


```
