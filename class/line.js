class Line{
	constructor (coordinate_system,start_vec,end_vec,stroke_weight,color){
		this.coordinate_system = coordinate_system;
		this.start_vec = start_vec;
		this.end_vec = end_vec;
		this.stroke_weight = stroke_weight;
		this.color = color;

		coordinate_system.addObject(this);
	}
	draw(graphic){
		graphic.stroke(this.color);
		graphic.strokeWeight(this.stroke_weight);
		var start_pos = this.coordinate_system.get_screen_coordinates(this.start_vec,true);
		var end_pos = this.coordinate_system.get_screen_coordinates(this.end_vec,true);
		graphic.line(start_pos.x,start_pos.y,end_pos.x,end_pos.y);
	}
}