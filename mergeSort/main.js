/*
* 归并排序数组[4,8,6,2,1,3,1,5,8,7,9,4,8]
* */


/*合并两个有序数列,在arr中left-mid和mid+1-right有序*/
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
        arr[left+i]=tempArr[i];/*注意这里是arr[left+i]，而不是arr[i]*/
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
