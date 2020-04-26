// Servicio para poder subir archivos al proyecto 

import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
	public url: string;

	constructor(){
		this.url = Global.url;  // obtengo de services/global.ts defino mi url 
	}

	// Metodo para hacer peticion ajax clasica en la cual adjunto un archivo para subir
	makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){ 
		return new Promise(function(resolve, reject){ //  Creo una promesa
			var formData:any = new FormData();  //simulamos un formulario clasico de tipo any para no tener ningun problema
			var xhr = new XMLHttpRequest();		// objeto de peticiones asincronas ajax

			for(var i = 0; i < files.length; i++){
				formData.append(name, files[i], files[i].name); 
			}

			xhr.onreadystatechange = function(){  // peticion ajax cuando halla algun cambio
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true); // peticion por POST a la url que esta declarada con el metodo AJAX(lo que hago en POSTMAN CUANDO REALIZO LAS PRUEBAS)
			xhr.send(formData); // envio todos los archivos que me han llegado - SUBO NUEVOS ARCHIVOS A MI BACKEND
		});
	}

}