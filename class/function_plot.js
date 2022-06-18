class function_plot {
	constructor(coordinate_system, fx, color, stroke_weight, enchance) {

		this.coordinate_system = coordinate_system;
		this.mathematical_function = fx;
		this.r = stroke_weight;
		this.color = color;
		this.enchance = enchance;

		this.coordinate_system.addObject(this);
	}
	draw(graphic) {

		let last = NaN;
		graphic.stroke(this.color);
		graphic.strokeWeight(this.r);
		let drawNext = true
		for (let x = -graphic.width; x < graphic.width; x++) {
			
			if(!drawNext){drawNext = true;continue};
			
			var unit_x = this.coordinate_system.get_pixel_coordinates(new Vector2(x, 0), false).x;

			let fy = this.mathematical_function(unit_x);
			if(fy >= this.coordinate_system.view_frustrum.v2.y || fy <= this.coordinate_system.view_frustrum.v1.y){
				drawNext = false;
			}
			
			var vec  = this.coordinate_system.get_screen_coordinates(new Vector2(unit_x, fy),true);
			// var vec = new Vector2(x, fy);

			// console.log(`f(${vec.x})=${vec.y}`)

			if(last && this.enchance){
				graphic.line(last.x,last.y,vec.x,vec.y);
			}else{
				graphic.point(vec.x, vec.y);
			}
			last = vec;

		}
	}
}