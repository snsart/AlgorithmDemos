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



(lib.元件2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgwAxQgVgVAAgcQAAgbAVgVQAVgVAbAAQAcAAAVAVQAVAVAAAbQAAAcgVAVQgVAVgcAAQgbAAgVgVg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-7,-7,14,14);


// stage content:
(lib.donghua = function() {
	this.initialize();

	// 图层 2
	this.text = new cjs.Text("任意画一条线自动生成点到直线的垂线", "37px 'Microsoft YaHei Light'", "#666666");
	this.text.lineHeight = 39;
	this.text.lineWidth = 806;
	this.text.setTransform(7,12.7);

	this.p = new lib.元件2();
	this.p.setTransform(483,319);

	this.addChild(this.p,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(507,362.7,810,313.3);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;