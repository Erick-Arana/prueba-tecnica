import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
	selector: 'productos-list',
	templateUrl: '../views/productos-list.html',
	providers: [ProductoService]
})
export class ProductosListComponent{
	public titulo: string;
	public message:string;
	public modal_flag = false;
	public productos: Producto[];
	public producto: Producto;
	public categories: [];
	public method:string;
	public operation:string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,  
		private _productoService: ProductoService
	){
		this.titulo = 'Listado de Productos';
		this.producto = new Producto(null,'','',0,0);
	}

	ngOnInit(){

		this._productoService.getProductos().subscribe(

			result => {
				
				if(result.code != 200){
					console.log(result);

				}else{
					this.productos = result.Products;
				}

			},
			error => {
				console.log(<any>error);

			}

		);

		this._productoService.getCategoriasHijas().subscribe(

			result => {
				
				if(result.code != 200){
					console.log(result);

				}else{
					this.categories = result.Hijas;
				}

			},
			error => {
				console.log(<any>error);

			}

		);
	}

	getProducts(){

        this._productoService.getProductos().subscribe(
			result => {
				
				if(result.code != 200){

					console.log(result);

				}else{

					this.productos = result.Products;

				}

			},
			error => {

				console.log(<any>error);

			}
		);

    }

	openModal(method){
		this.operation = 'Crear producto';
		this.method = method;
		this.modal_flag = true;
	}

	selected(option){
		this.producto.categoria = option;
		console.log(this.producto.categoria);
	}

	editModal(item){

		this.operation = 'Editar producto';
		this.method = 'edit';
		this.modal_flag = true;
		this.producto = new Producto(item.id, item.nombre, item.categoria, item.id_categoria, item.stock);

		console.log(item);
	}

	deleteModal(item){

		this.operation = 'Deseas eliminar el producto seleccionado';
		this.method = 'delete';
		this.modal_flag = true;
		this.producto = item;

	}

	addProduct(){

		this._productoService.addProducto(this.producto).subscribe(
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

        this.getProducts();

	}

	editProduct(){

		this._productoService.updateProduct(this.producto.id, this.producto).subscribe(
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

	deleteProduct(){

		this._productoService.deleteCategoria(this.producto.id).subscribe(
            response => {
                if(response.code == 200){
                    this.message = response.message;
                }else{
                }
            },
            error => {
                console.log(<any>error);
            }
        );

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