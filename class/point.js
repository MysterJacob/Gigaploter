
class Point{
	//#updated_tm;
	constructor(coordinate_system,pos,radius,point_color){
		this.coordinate_system = coordinate_system;
		this.pos = pos;
		this.transformed_pos = pos;
		//this.#updated_tm = []
		this.radius = radius;
		this.color = color(point_color);
		this.graphic = coordinate_system.graphic;
		this.coordinate_system.addObject(this);
	}
	setPosition(pos){
		this.pos = pos;
		this.coordinate_system.draw();
	}
	draw() {
		//this.#calculate_transformed_pos();

		

		var screen_pos = 
		this.coordinate_system.get_screen_coordinates(
			this.pos,true
		);
		this.color.setAlpha(255);
		this.graphic.stroke(this.color);
		this.graphic.strokeWeight(this.radius);
		this.graphic.point(
			screen_pos.x,
			screen_pos.y 
		);

		this.color.setAlpha(127);
		this.graphic.strokeWeight(this.radius*3.14);
		this.graphic.stroke(color(this.color,0));
		this.graphic.point(
			screen_pos.x,
			screen_pos.y 
		);


	}
}