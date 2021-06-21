import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
	selector: 'categorias-list',
	templateUrl: '../views/categorias-list.html',
	providers: [CategoriaService]
})

export class CategoriasListComponent{
	public titulo: string;
	public message:string;
	public modal_flag = false;
	public categorias: Categoria[];
	public categoria: Categoria;

	key: string = "subcategorias";

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,  
		private _categoriaService: CategoriaService
	){
		this.titulo = 'Listado de Categorias';
		this.categoria = new Categoria(null,'', 0,'padre', 0, true);
	}

	ngOnInit(){
		
		this._categoriaService.getCategorias().subscribe(
			result => {
				
				if(result.code != 200){

					console.log(result);

				}else{

					this.categorias = result.Categories;

				}

			},
			error => {

				console.log(<any>error);

			}
		);

	}

	getCategories(){

        this._categoriaService.getCategorias().subscribe(
			result => {
				
				if(result.code != 200){

					console.log(result);

				}else{

					this.categorias = result.Categories;

				}

			},
			error => {

				console.log(<any>error);

			}
		);

    }

	openModal(){
		this.modal_flag = true;
	}

	addCategory(){

		this._categoriaService.addCategoria(this.categoria).subscribe(
            response => {
                if(response.code == 200){
                    this.message = response.message;
                }else{
                    console.log(response);
                }
            },
            error => {
                console.log(<any>error);
            }
        );

        this.getCategories();

	}

	closeModal(){

		this.modal_flag = false;
		this.reloadComponent();
	}

	reloadComponent() {
        let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([currentUrl]);
    }

}