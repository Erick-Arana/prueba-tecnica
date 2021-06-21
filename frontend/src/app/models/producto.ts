export class Producto{
	constructor(
		public id: number,
		public nombre: string,
		public categoria: string,
		public id_categoria: number,
		public stock: number
	){}
}