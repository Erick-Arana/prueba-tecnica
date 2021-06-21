import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Categoria } from '../models/categoria';
import { GLOBAL } from './global';

@Injectable()
export class CategoriaService{
	public url: string;

	constructor(
		public _http: HttpClient

		){

		this.url = GLOBAL.url;
	}

	getCategorias(): Observable<any>{
		return this._http.get(this.url+'/categorias/leer');
	}

	addCategoria(categoria: Categoria): Observable<any>{
		let json = JSON.stringify(categoria);
		let params = json;
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'/categorias/crear', params, {headers: headers});

	}

	updateCategoria(id, categoria: Categoria): Observable<any>{
		let json = JSON.stringify(categoria);
		let params = json;
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'/categorias/actualizar/'+id, params, {headers: headers});
	}

	deleteCategoria(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.delete(this.url+'/categorias/borrar/'+id, {headers: headers});
	}

	updatePadre(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'/categorias/actualizar_padre/'+id, {headers: headers});
	}
	
}