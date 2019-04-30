(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 450,
	fps: 24,
	color: "#999999",
	manifest: []
};



// symbols:



(lib.元件1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgsAtQgUgSABgbQgBgZAUgUQASgSAagBQAbABASASQATAUAAAZQABAbgUASQgSAUgbgBQgaABgSgUg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-6.5,-6.5,13,13);


// stage content:
(lib.donghua1 = function() {
	this.initialize();

	// 图层 1
	this.mc2 = new lib.元件1();
	this.mc2.setTransform(363.5,284.5);

	this.mc10 = new lib.元件1();
	this.mc10.setTransform(540.5,393.5);

	this.mc4 = new lib.元件1();
	this.mc4.setTransform(495.5,189.5);

	this.mc7 = new lib.元件1();
	this.mc7.setTransform(737.5,90.5);

	this.mc9 = new lib.元件1();
	this.mc9.setTransform(638.5,243.5);

	this.mc1 = new lib.元件1();
	this.mc1.setTransform(279.5,230.5);

	this.mc8 = new lib.元件1();
	this.mc8.setTransform(724.5,235.5);

	this.mc6 = new lib.元件1();
	this.mc6.setTransform(458.5,284.5);

	this.mc5 = new lib.元件1();
	this.mc5.setTransform(578.5,90.5);

	this.mc3 = new lib.元件1();
	this.mc3.setTransform(410.5,107.5);

	this.addChild(this.mc3,this.mc5,this.mc6,this.mc8,this.mc1,this.mc9,this.mc7,this.mc4,this.mc10,this.mc2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(785,309,471,316);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;