## 打乱数组
**代码如下**：
```javascript
/*
* 打乱数组[1,2,3,4,5,6,7,8,9,10,11,12,13]
* */
var arr=[1,2,3,4,5,6,7,8,9,10,11,12,13];
shuffle(arr);
console.log(arr);
function shuffle(arr){
	for(var i=arr.length-1;i>0;i--){
		var j=Math.floor(Math.random()*i);
		if(j!=i){
			var temp=arr[i];
			arr[i]=arr[j];
			arr[j]=temp;
		}
	}
}
```