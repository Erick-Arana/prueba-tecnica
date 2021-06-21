import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../models/producto';
import { GLOBAL } from './global';

@Injectable()
export class ProductoService{
	public url: string;

	constructor(
		public _http: HttpClient

		){
			
		this.url = GLOBAL.url;
	}

	getProductos(): Observable<any>{
		return this._http.get(this.url+'/productos/leer');
	}

	addProducto(producto: Producto): Observable<any>{
		let json = JSON.stringify(producto);
		let params = json;
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'/productos/crear', params, {headers: headers});
	}
	
	updateProduct(id, producto: Producto): Observable<any>{
		let json = JSON.stringify(producto);
		let params = json;
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'/productos/actualizar/'+id, params, {headers: headers});
	}

	deleteCategoria(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.delete(this.url+'/productos/borrar/'+id, {headers: headers});
	}

	getCategoriasHijas(): Observable<any>{
		return this._http.get(this.url+'/categorias/leer_hijos');
	}

}