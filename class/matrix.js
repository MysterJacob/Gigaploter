class Matrix2x2{
	constructor(a,b,c,d){
		this.v1 = new Vector2(a,b);
		this.v2 = new Vector2(c,d);
	}
	mul_vector2(vector2){
		return new Vector2(
			this.v1.x * vector2.x + this.v2.x * vector2.y,
			this.v1.y * vector2.x + this.v2.y * vector2.y
		);
	}
	mul_matrix2x2(matrix2x2){
		var v1 = this.mul_vector2(matrix2x2.v1);
		var v2 = this.mul_vector2(matrix2x2.v2);
		return new Matrix2x2(
			v1.x,v1.y,
			v2.x,v2.y,
		)
	}
	get_determinant(){
		return this.v1.x * this.v2.y - this.v1.y * this.v2.x
	}
	get_inverse(){
		var determinant = this.get_determinant();
		return new Matrix2x2(
			this.v2.y * determinant,
			- this.v1.y * determinant,
			- this.v2.x * determinant,
			this.v1.x * determinant
		)
	}
}
class Matrix3x3{
	constructor(a,b,c,d,e,f,g,h,i){
		this.v1 = new Vector3(a,b,c);
		this.v2 = new Vector3(d,e,f);
		this.v3 = new Vector3(g,h,i);
	}
	mul_vector2(vector3){
		return new Vector3(
			this.v1.x * vector3.x + this.v2.x * vector3.y + this.v3.x * vector3.z,
			this.v1.y * vector3.x + this.v2.y * vector3.y + this.v3.y * vector3.z,
			this.v1.z * vector3.x + this.v2.z * vector3.y + this.v3.z * vector3.z,
		);
	}
}
