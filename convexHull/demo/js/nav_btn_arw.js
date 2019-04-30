
var issend=true
var isOpen=false;

/*图片预加载，防止闪屏*/
(function preLoadImg(url){
	var img=new Image();
	img.src=url;
})("img/title3_2.png");


$(".demon_Btn").click(function(e){
	if(isOpen){
		$(".animaContrl").css("display","none");
		$(".title-end").css("background-image","url(img/title3.png)");
	}else{
		$(".animaContrl").css("display","block");
		$(".title-end").css("background-image","url(img/title3_2.png)");
	}
	isOpen=!isOpen;
	
	/*if(issend){
		//type:'解析动画1',fseasons:"春季",grade:"五年级",name:"第九讲",
		post_fen_shu('BC例1',"暑期","三年级","第一讲");
		issend=false
	}*/
})



//////////埋点方法
var post_fen_shu=function(Ptype,Pfseasons,pgrade,pname){
	$.ajax({
	  type: 'POST',
	  url: "http://game.speiyou.com/index/index3/user",
	  data:{type:Ptype,fseasons:Pfseasons,grade:pgrade,name:pname,n:1}, 
	  //返回数据的格式  
	  datatype: "jsonp",//"xml", "html", "script", "json", "jsonp", "text".
	  processData: false, 
	  success:function(status){
	  	console.log("成功："+status);
	  }
	});
}