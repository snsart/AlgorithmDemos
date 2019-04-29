(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 768,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.元件4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC9900").s().p("AhUDpQgJgFAEgPIAah5QACgZAhAbQBWiaiViJIBXgkQCnC2h4DIQAgARgXALIhqAwQgRAJgJAAIgEgBg");
	this.shape.setTransform(40.4,59.7,1,1,0,0,0,-8,23.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC9900").s().p("AjfBiQBNjqDpAIQAAglAUAPIBfBGQAVAPAAAIQABAKgQAEIh2AkQgXAJAHgpQixgBguDEg");
	this.shape_1.setTransform(45.2,9.3,1,1,0,0,0,22.7,-6.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC9900").s().p("AioAAQgfAUABgXIAJh2QABgZAGgFQAJgGAMALIBeBQQAVAOgoAQQBeCWC/hEIgJBeQg5AOgyAAQigAAhbiag");
	this.shape_2.setTransform(-1.2,31,1,1,0,0,0,-19,-15.2);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-2.1,0.3,59.9,61.4);


(lib.光源 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgqArQgSgSAAgZQAAgYASgSQASgSAYAAQAZAAASASQARASABAYQgBAZgRASQgSARgZABQgYgBgSgRg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-6.1,-6.1,12.2,12.2);


(lib.rotaBtn = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.元件4();
	this.instance.setTransform(0.6,-1,0.463,0.463,0,0,0,28.7,29.9);
	this.instance.filters = [new cjs.ColorFilter(0, 0, 0, 1, 255, 255, 255, 0)];
	this.instance.cache(-4,-2,64,65);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#77A944").s().p("AkcEdQh3h2AAinQAAimB3h2QB2h3CmABQCngBB2B3QB2B2AACmQAACnh2B2Qh2B3inAAQimAAh2h3g");
	this.shape.setTransform(0,0,0.463,0.463);

	this.addChild(this.shape,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-18.7,-18.6,37.4,37.4);


(lib.镜子 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#6666FF").ss(1,1,1).p("AAAoQIAAA9AAAmhIAAA9AAAjEIAAA+AAAhVIAAA9AAAkzIAAA+AAACHIAAA9AAAFkIAAA+AAAD2IAAA9AAAAYIAAA9AAAHUIAAA9");
	this.shape.setTransform(0,-53);

	this.rotaBtn = new lib.rotaBtn();
	this.rotaBtn.setTransform(163.6,8.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AUlgzIhUBnAPQgzIhTBnAR6gzIhTBnAJ8gzIhTBnAB+gzIhTBnAEogzIhTBnAHSgzIhTBnAMmgzIhTBnAjUgzIhTBnAgqgzIhTBnArSgzIhTBnAoogzIhTBnAl+gzIhTBnAwmgzIhUBnAt8gzIhTBnAzQgzIhUBn");
	this.shape_1.setTransform(0.4,5.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("A1thZMArbAAAIAACzMgrbAAAg");
	this.shape_2.setTransform(0,9.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("A1tBaIAAizMArbAAAIAACzg");
	this.shape_3.setTransform(0,9.1);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.rotaBtn,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-140,-106.9,322.4,134.1);


// stage content:
(lib.donghua = function() {
	this.initialize();

	// 图层 1
	this.rotaMc3 = new lib.镜子();
	this.rotaMc3.setTransform(490.5,572,1,1,-51.7,0,0,0.1,0.1);

	this.rotaMc2 = new lib.镜子();
	this.rotaMc2.setTransform(489.6,114.6,1,1,180,0,0,0.1,0.1);

	this.text = new cjs.Text("光源", "bold 20px 'Times New Roman'");
	this.text.textAlign = "center";
	this.text.lineHeight = 22;
	this.text.lineWidth = 64;
	this.text.setTransform(240.1,485.3);

	this.pot = new lib.光源();
	this.pot.setTransform(242,470);

	this.rotaMc1 = new lib.镜子();
	this.rotaMc1.setTransform(191.2,302,1,1,-121.6,0,0,0.1,0.1);

	this.addChild(this.rotaMc1,this.pot,this.text,this.rotaMc2,this.rotaMc3);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(598.8,471.6,542.5,605.6);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;