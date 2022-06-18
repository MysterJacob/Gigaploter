class coordinate_system{
	
	#transformations
	constructor(graphic,width,height,scale,bg_color){
		this.graphic = graphic;

		this.step = 30;
		this.pixel_correction = 0//this.step / 2;

		this.#transformations = []
		this.objects = []

		this.offset_vector = new Vector2(
			width / (this.step * 2 * scale) ,
			-height / (this.step * 2 * scale) ,
		);
		this.scale = scale;

		this.bg_color = bg_color;


		// TODO
		this.transformation_matrix = new Matrix2x2(1,0,0,1);
		this.transformation_matrix_inv = this.transformation_matrix.get_inverse();
		
		this.view_frustrum = new Matrix2x2(1,0,0,1);
		this.#recalculate_transformations();
		this.#setSize(width,height); 
	}

	#setSize(width,height){
		this.width = width;
		this.height = height;
		this.half_width = 0//-Math.floor(width / 4);
		this.half_height = 0//-Math.floor(height / 4);
		// this.graphic.size(width,height)
	}
	move(move_vector){
		this.offset_vector = this.offset_vector.add(move_vector);
		this.#recalculate_view_frustrum();
		this.draw();
	}
	setScale(scale){
		
		// var grid_size = Math.max(1,-Math.floor(Math.log2(this.scale)) * 10);
		scale = parseFloat(Math.min(Math.max(0.1,scale),20));
		let frustrum_before = new Vector2(this.width,this.height);
		frustrum_before = frustrum_before.div(this.scale);

		// offset.x = -offset.x
		let frustrum_now = new Vector2(this.width,this.height);
		frustrum_now = frustrum_now.div(scale);

		let offset = frustrum_before
		.div(2)
		.sub(frustrum_now.div(2))
		.div(this.step);

		// console.log(
		// 	frustrum_before,
		// 	frustrum_now,
		// 	scale,
		// 	this.scale,
		// 	offset
		// )

		offset.x = -offset.x;
		this.scale = scale;
		this.move(offset);

		

		// this.#recalculate_view_frustrum();
		// this.draw();
	}
	addObject(object){
		this.objects.push(object);
		this.draw();
	}
	update(width,height){
		var height_changed = this.height != height || this.width != width;
		if(height_changed){
			this.#setSize(width,height);
			this.draw();
			// console.log("HEIGHT CHANGED!")
		}
	}
	draw(){
		this.graphic.background(this.bg_color);
		this.drawGrid();
		for(let i =0;i < this.objects.length;i++){
			this.objects[i].draw(this.graphic);
		}
	}
	
	drawGrid(){
		var frustrum_start = this.view_frustrum.v1;
		var frustrum_stop = this.view_frustrum.v2;
		// Step count based on scale of coordinate system
		let h = -0.5
		var step =  this.grid_size_chg;
		// console.log(step);
		// console.log(this.scale);
		// var step = 1;
		// Aling to hit (0,0)


		

		frustrum_start = new Vector2(
			frustrum_start.x - frustrum_start.x % step,
			frustrum_start.y - frustrum_start.y % step
		);
		frustrum_stop = new Vector2(
			frustrum_stop.x + frustrum_stop.x % step,
			frustrum_stop.y + frustrum_stop.y % step
		);		
		this.graphic.strokeWeight(1);
		this.graphic.stroke("gray");
		for(let x = frustrum_start.x; x <= frustrum_stop.x; x+=step){
			var t1 = this.get_screen_coordinates(new Vector2(x,0),true);
			var t2 = this.get_screen_coordinates(new Vector2(x,0),true);
			if(Math.round(x*100)/100 == 0){
				this.graphic.strokeWeight(2);
				this.graphic.stroke("white");
			}else{
				// Draw digits
				this.graphic.fill("white");
				this.graphic.textAlign(CENTER);
				this.graphic.text(
					Math.round(x*100)/100,
					t1.x,
					t1.y + 15
				);

				this.graphic.strokeWeight(1);
				this.graphic.stroke("gray");
			}
			

			
			this.graphic.line(t1.x,0,t2.x,this.height);
			
		}
		for(let y = frustrum_start.y; y <= frustrum_stop.y; y+=step){
			var t1 = this.get_screen_coordinates(new Vector2(0,y),true);
			var t2 = this.get_screen_coordinates(new Vector2(0,y),true);


			if(Math.round(y*100)/100 == 0){
				this.graphic.strokeWeight(2);
				this.graphic.stroke("white");
			}else{
				// Draw digits
				
				this.graphic.fill("white");
				this.graphic.text(
					Math.round(y*100)/100,
					t1.x - 15,
					t1.y
				);

				this.graphic.strokeWeight(1);
				this.graphic.stroke("gray");
			}
			
			this.graphic.line(0,t1.y,this.width,t2.y);		
		}

		var vec = this.get_screen_coordinates(new Vector2(0,0),true);
		// console.log(vec);
		this.graphic.stroke("red");
		this.graphic.strokeWeight(5);
		this.graphic.point(vec.x,vec.y);

	}
	//Transform unit coordinates to "real" screen coordinates with matrix globaltransformations
	get_screen_coordinates(vec,apply_transformations){
		if(apply_transformations && this.#transformations.length > 0){
			vec = this.transformation_matrix.mul_vector2(vec);
		}
		vec = vec.add(this.offset_vector);
		vec = vec.mul(this.scale);
		// console.log(this.offset_vector);


		

		var screen_x = (vec.x) * this.step + this.pixel_correction;
		var screen_y = -(vec.y) * this.step + this.pixel_correction;


		// console.log(vec);
		
		return new Vector2(screen_x,screen_y);

	}
	// Transform pixel coordinates to system coordiantes
	get_pixel_coordinates(vec,apply_transformations){
		
		vec = new Vector2(
			(vec.x - this.pixel_correction) / this.step,
			-(vec.y - this.pixel_correction) / this.step
		)
		
		
		vec = vec.div(this.scale);
		vec = vec.sub(this.offset_vector);
		if(apply_transformations && this.#transformations.length > 0){
			vec = this.transformation_matrix_inv.mul_vector2(vec);
		}
		return vec
	}


	#recalculate_transformations(){
		this.transformation_matrix = new Matrix2x2(1,0,0,1);

		for(let i = 0;i < this.#transformations.length;i++){
			var transformation = this.#transformations[i];
			this.transformation_matrix = 
			this.transformation_matrix.mul_matrix2x2(
				transformation
			);
		}
		this.transformation_matrix_inv = this.transformation_matrix.get_inverse();
		// console.log("Inverse");
		// console.log(this.transformation_matrix_inv);

		
		// console.log(vec)
		
		this.#recalculate_view_frustrum();

	}
	#recalculate_view_frustrum(){
		var p = 1;
		this.grid_size_chg = 0//Math.max(0.5,-Math.floor(Math.log2(this.scale)));// Math.max(0.5,20 - (Math.floor(-p * this.scale ** 1.6) / -p));

		if(this.scale < 0.3){
			this.grid_size_chg = 20;
		}else if(this.scale < 1){
			this.grid_size_chg = 10;
		}else if(this.scale < 8){
			this.grid_size_chg = 1;
		}else if(this.scale <= 20){
			this.grid_size_chg = 0.1;
		}



		var correction = this.grid_size_chg;
		// console.log(
			// this.scale,
			// correction
		// );
		var top_left = this.get_pixel_coordinates(new Vector2(0,0),true);
		var top_right = this.get_pixel_coordinates(new Vector2(width,0),true);
		var bottom_left = this.get_pixel_coordinates(new Vector2(0,height),true);
		var bottom_right = this.get_pixel_coordinates(new Vector2(width,height),true);
		

		var frustrum_top_left = new Vector2(
			Math.min(top_left.x,top_right.x,bottom_left.x,bottom_right.x) - correction,
			Math.min(top_left.y,top_right.y,bottom_left.y,bottom_right.y) - correction,
		);
		var frustrum_bottom_right = new Vector2(
			Math.max(top_left.x,top_right.x,bottom_left.x,bottom_right.x) + correction,
			Math.max(top_left.y,top_right.y,bottom_left.y,bottom_right.y) + correction,
		);

		this.view_frustrum = new Matrix2x2(
			frustrum_top_left.x,frustrum_top_left.y,
			frustrum_bottom_right.x,frustrum_bottom_right.y
		);
	}
	setTransformations(transformations) {
		this.#transformations = transformations;
		this.#recalculate_transformations();
	}
	addTransformation(transformation){
		this.#transformations.push(transformation);
		this.#recalculate_transformations();
		this.draw();

	}
	getTransformations(){
		return this.#transformations;
	}
}