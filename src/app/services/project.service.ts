import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
	public url: string;

	constructor(
		private _http: HttpClient // cargo HttpClient como propiedad privada
	){
		this.url = Global.url; // obtengo de services/global.ts defino mi url 
	}


	//metodo de prueba
	testService(){
		return ' Probando el servicion de Angular.';
	}

	//Metodo para guardar un nuevo proyecto en nustra base de datos
	saveProject(project: Project): Observable<any>{
		let params = JSON.stringify(project); // recogemos todos los parametro que vamos a enviar necesitamos que sea JSON para que el api pueda procesarlo
		let headers = new HttpHeaders().set('Content-type','application/json'); // Establecer cabeceras como se va a enviar la informacion

		return this._http.post(this.url+'save-project', params, {headers: headers}); // uso post para crear mi proyecto en el backend (api)
	}

	//Metodo para cosumir de mi api todos los proyectos almacenados en la base de datos
	getProjects(): Observable<any>{
		let headers = new HttpHeaders().set('Content-type', 'application/json'); // Establecer cabeceras como se va a enviar la informacion

		return this._http.get(this.url+'projects', {headers: headers});
	}

	//Metodo para cosumir de mi api un proyecto con un id almacenado en la base de datos el cual queremos mostrar
	getProject(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-type', 'application/json'); // Establecer cabeceras como se va a enviar la informacion

		return this._http.get(this.url+'project/'+id, {headers: headers});
	}

	//Metodo para cosumir de mi api un proyecto con un id almacenado en la base de datos el cual eliminare en la app
	deleteProject(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-type', 'application/json'); // Establecer cabeceras como se va a enviar la informacion

		return this._http.delete(this.url+'project/'+id, {headers: headers});
	}

	//Metodo para cosumir de mi api un proyecto con mi proyecto almacenado en la base de datos el cual actualizare en la app
	updateProject(project): Observable<any>{
		let params = JSON.stringify(project); // recogemos todos los parametro que vamos a enviar necesitamos que sea JSON para que el api pueda procesarlo
		let headers = new HttpHeaders().set('Content-type', 'application/json'); // Establecer cabeceras como se va a enviar la informacion

		return this._http.put(this.url+'project/'+project._id, params, {headers: headers});
	}

}