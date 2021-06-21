import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Categoria } from '../models/categoria';
import { cpuUsage } from 'process';

@Component({
    selector: 'tree-view',
    templateUrl: '../views/tree-view.html'
})

export class TreeViewComponent {
    
    public modal_flag = false;
    public method:string;
    public operation:string;
    public categorias: Categoria[];
    public categoria: Categoria;
    public id_padre: number;
    public message:string;
    public warning:string;

    @Input('data') items: Array<Object>;
    @Input('key') key: string;
    
    constructor(
		private _route: ActivatedRoute,
		private _router: Router, 
        private _categoriaService: CategoriaService,
    ) {
        this.categoria = new Categoria(0,'', 0,'',0,true);
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

    addSub(item){

        this.modal_flag = true;
        this.method = 'create';
        this.operation = 'Creacion de Subcategorias';

        this.categoria = new Categoria(null, this.categoria.nombre, item.id, 'hijo', item.id, false);

    }

    editCategory(item){
        
        this.modal_flag = true;
        this.method = 'edit';
        this.operation = 'Edicion de Categorias y Subcategorias';
        this.categoria = new Categoria(item.id, item.nombre, null, 'hijo', null, false);
    }

    deleteCategory(item){
        
        this.modal_flag = true;
        this.method = 'delete';
        this.operation = 'Deseas eliminar la categoria seleccionada';
        this.categoria = item;
    }

    closeModal(){

		this.modal_flag = false;
		this.reloadComponent();
	}

    //Requests to services
    updateParent(id){

        this.id_padre = id;

        this._categoriaService.updatePadre(this.id_padre).subscribe(
            response => {
                if(response.code == 200){
                    
                }else{
                    console.log(response);
                }
            },
            error => {
                console.log(<any>error);
            }
        );

    }

    createSubcategory(){
        
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
        
        console.log();
        this.updateParent(this.categoria.id_categoria);
        this.getCategories();
    
    }

    editSubcategory(){

        this._categoriaService.updateCategoria(this.categoria.id, this.categoria).subscribe(
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

    }

    deleteSubcategory(){

        this._categoriaService.deleteCategoria(this.categoria.id).subscribe(
            response => {
                if(response.code == 200){
                    this.message = response.message;
                }else{
                    this.warning = response.message;
                }
            },
            error => {
                console.log(<any>error);
            }
        );

    }

    reloadComponent() {
        let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([currentUrl]);
    }

}