/**
 * 功能：每个切片特有的js，配置加载的js和css。
 * 适用范围:小学数学
 * @thinlong
 * v2.0
 * 2016.11.7
 * 
 */

/*
 * 全学科公共文件
 * --必加--
 * js/jquery.min.js
 * css/preload.min.css
 * js/preload.min.js
 * 
 * --选加-- 
 * --createjs相关--
 * js/preloadjs-0.6.1.min.js
 * js/easeljs-0.8.1.min.js
 * js/tweenjs-0.6.1.min.js
 * js/movieclip-0.8.1.min.js
 * 
 * --其他--
 * 视具体情况而定
 */
var myPublicFiles = [
	'js/jquery.min.js',
	'css/preload.min.css',
	'js/preload.min.js',
	'js/easeljs-0.8.1.min.js',
	'js/tweenjs-0.6.1.min.js',
	'js/movieclip-0.8.1.min.js',
	'js/preloadjs-0.6.1.min.js',
	'js/animaCreateJs.js',
];

/**
 * 学科(小学数学)通用文件
 * --必加--
 * css/primary_math.css
 * js/primary_math.js
 */
var myCommonFiles = [
	
];

/**
 * 课件私有文件
 */
var myPrivateFiles = [
	
	/*'js/soundjs-0.6.2.min.js',
	'js/mysound.js',*/
	'js/highMath.js',
	
	'js/arrayUtils.js',
	'js/createjsExtendmin.js',
	
   	'js/donghua1.js',//动画素材,程序提供
   	'js/game.js',//交互程序，程序提供
   
	'js/nav_btn_arw.js',
	'js/canvasControl.js',
];

var loader = new h5_loader();
loader.addPublicFiles(myPublicFiles)
loader.addCommonFiles(myCommonFiles);
loader.addPrivateFiles(myPrivateFiles);
loader.load();