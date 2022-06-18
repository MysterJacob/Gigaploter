let main_graphic;

var system;
var mouse_power = 1;

function setup() {

	WIDTH = windowWidth;
	HEIGHT = windowHeight;
	createCanvas(WIDTH, HEIGHT);

	background('black');
	main_graphic = createGraphics(WIDTH, HEIGHT);
	// console.log(main_graphic.height);
	system = new coordinate_system(main_graphic, WIDTH, HEIGHT, 2, "#08032D");
	system.addTransformation(new Matrix2x2(1, 0, 0, 1));
	mouse_power = 1 / (system.step * system.scale);
	// var line = new Line(system, new Vector2(0, 0), new Vector2(0, 4), 2, "red");
	var plot = new function_plot(
		system,
		(x) => Math.sin(x),
		"yellow", 1,
		true
	);
	// var plot = new function_plot(
	// 	system,
	// 	(x) => x**2,
	// 	"red", 1,
	// 	true
	// );
	// var plot = new function_plot(
	// 	system,
	// 	(x) => x ** -2,
	// 	"green", 3,
	// 	true
	// );
	system.draw();

}


function draw() {
	background("#08032D");
	image(main_graphic, 0, 0);
	system.update(windowWidth, windowHeight);
}
let mx, my, locked;

function mousePressed() {
	mx = mouseX;
	my = mouseY;
	locked = true;
}

function mouseDragged() {

	if (locked) {
		let bx = mouseX - mx;
		let by = mouseY - my;
		system.move(new Vector2(bx * mouse_power, -by * mouse_power));
		mx = mouseX;
		my = mouseY;
	}
}

function mouseReleased() {
	locked = false;
}

function mouseWheel(event) {
	system.setScale(system.scale + -event.delta/500);
	mouse_power = 1 / (system.step * system.scale);

}