## 求两线段交点
a,b和c,d分别为第一条和第二条线段的起点和终点
**代码如下**：
```javascript
function segmentsIntr(a, b, c, d){ 
    var denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
    if (denominator==0) {  
        return false;  
    }     
    var x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
                + (b.y - a.y) * (d.x - c.x) * a.x   
                - (d.y - c.y) * (b.x - a.x) * c.x ) / denominator ;  
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
```