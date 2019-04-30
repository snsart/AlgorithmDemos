## [<<Ŀ¼](../README.md)
## demo2-mergeSort
**��������**��
```javascript
function mergeArray(arr,left,mid,right){
    let tempArr=[];
    let l=left;
    let r=mid+1;
    while(l<=mid&&r<=right){
        if(arr[l]<arr[r]){
            tempArr.push(arr[l++]);
        }else{
            tempArr.push(arr[r++]);
        }
    }
    while (l<=mid){
        tempArr.push(arr[l++]);
    }
    while(r<=right){
        tempArr.push(arr[r++]);
    }
    for(let i=0;i<tempArr.length;i++){
        arr[left+i]=tempArr[i];/*ע��������arr[left+i]��������arr[i]*/
    }
}

function mergeSort(arr,left,right){
    if(left<right){
        let mid=Math.floor((left+right)/2);
        mergeSort(arr,left,mid);
        mergeSort(arr,mid+1,right);
        mergeArray(arr,left,mid,right);
    }
}

let arr=[4,8,6,2,1,3,1,5,8,7,9,4,8];
mergeSort(arr,0,arr.length-1);
console.log(arr);
```