(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1000,
	height: 700,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.元件1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 图层 1
	this.text = new cjs.Text("分离", "24px 'FZDaHei-B02'");
	this.text.lineHeight = 26;
	this.text.lineWidth = 56;
	this.text.setTransform(-30,-15.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ak1jVIJrAAQAyAAAAAyIAAFHQAAAygyAAIprAAQgyAAAAgyIAAlHQAAgyAyAAg");
	this.shape.setTransform(0,-2.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("Ak0DWQgzAAAAgyIAAlHQAAgyAzAAIJpAAQAyAAABAyIAAFHQgBAygyAAg");
	this.shape_1.setTransform(0,-2.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(3,1,1).p("Ak1jVIJrAAQAyAAAAAyIAAFHQAAAygyAAIprAAQgyAAAAgyIAAlHQAAgyAyAAg");
	this.shape_2.setTransform(0,-2.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).to({state:[{t:this.shape_1},{t:this.shape_2},{t:this.text}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-25.1,74,45);


// stage content:
(lib.donghua = function() {
	this.initialize();

	// 图层 1
	this.cutBtn = new lib.元件1();
	this.cutBtn.setTransform(914,417.1);

	this.addChild(this.cutBtn);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(1377.5,742.5,73,43.9);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;