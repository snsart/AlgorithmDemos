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



(lib.元件1 = function() {
	this.initialize();

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

	this.addChild(this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-37,-25.1,74,45);


// stage content:
(lib.donghua = function() {
	this.initialize();

	// 图层 1
	this.breakBtn = new lib.元件1();
	this.breakBtn.setTransform(921,716.1);

	this.addChild(this.breakBtn);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(1396.5,1075.5,73,43.9);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;