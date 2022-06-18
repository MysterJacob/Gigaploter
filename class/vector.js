class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	lenght(){
		return Math.sqrt(
			this.x*this.x+this.y*this.y
		);
	}
	add(v2){
		return new Vector2(
			this.x + v2.x,
			this.y + v2.y
		);
	}
	sub(v2){
		return new Vector2(
			this.x - v2.x,
			this.y - v2.y
		);
	}
	mul(s){
		return new Vector2(
			this.x * s,
			this.y * s
		);
	}
	div(s){
		return this.mul(1/s);
	}
	normalize(){
		return this.div(this.lenght());
	}
}
class Vector3 extends Vector2{
	constructor(x,y,z){
		super(x,y);
		this.z = z;
	}
	lenght(){
		return Math.sqrt(
			this.x**2 + this.y**2 + this.y**2
		);
	}
	add(v2){
		return new Vector3(
			this.x + v2.x,
			this.y + v2.y,
			this.z + this.z
		);
	}
	sub(v2){
		return new Vector2(
			this.x - v2.x,
			this.y - v2.y,
			this.z - this.z
		);
	}
	mul(s){
		return new Vector2(
			this.x * s,
			this.y * s,
			this.z * s
		);
	}
	div(s){
		return this.mul(1/s);
	}
}
