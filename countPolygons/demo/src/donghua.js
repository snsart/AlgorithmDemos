(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1000,
	height: 700,
	fps: 24,
	color: "#333333",
	manifest: []
};



// symbols:



(lib.Tag = function() {
	this.initialize();

	// 图层 1
	this.txt = new cjs.Text("A", "italic bold 20px 'Times New Roman'", "#FFFF00");
	this.txt.name = "txt";
	this.txt.lineHeight = 22;
	this.txt.lineWidth = 17;
	this.txt.setTransform(-5.7,-26.3);

	// 图层 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,2,1).p("AB9AAQAAAzglAlQglAlgzAAQgyAAglglQglglAAgzQAAgyAlglQAlgkAyAAQAzAAAlAkQAlAlAAAyg");
	this.shape.setTransform(0.3,-15.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D81803").s().p("AhXBYQglglABgzQgBgzAlgkQAlglAyAAQAzAAAlAlQAlAkAAAzQAAAzglAlQglAkgzABQgygBglgkg");
	this.shape_1.setTransform(0.3,-15.8);

	this.addChild(this.shape_1,this.shape,this.txt);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-13.2,-29.3,28.2,29.2);


// stage content:
(lib.donghua = function() {
	this.initialize();

	// 图层 2
	this.num = new cjs.Text("0", "37px 'Microsoft YaHei'", "#FFFFFF");
	this.num.name = "num";
	this.num.lineHeight = 39;
	this.num.lineWidth = 116;
	this.num.setTransform(851,80.2);

	this.text = new cjs.Text("三角形个数", "37px 'Microsoft YaHei Light'", "#FFFFFF");
	this.text.lineHeight = 39;
	this.text.lineWidth = 186;
	this.text.setTransform(644,80.2);

	this.addChild(this.text,this.num);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(1144,430.2,327,52.9);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;