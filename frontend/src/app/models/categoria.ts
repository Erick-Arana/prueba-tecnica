export class Categoria{
	constructor(
		public id: number,
		public nombre: string,
		public id_categoria: number,
		public tipo: string,
		public parent_id: number,
		public is_parent: boolean,
    ){}
}