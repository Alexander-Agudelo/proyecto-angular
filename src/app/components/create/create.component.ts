import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';			// importo mi modelo
import { ProjectService } from '../../services/project.service';  // importo servicio recuerda cargarlo en providers
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

	public title: string;
	public project: Project;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;
	public url: string;

	constructor(
		//creo las propiedasdes del servicio para poder inyectarlas
		private _projectService: ProjectService, 
		private _uploadService: UploadService
	) {
		this.title = 'Crear proyecto';
		this.project = new Project('','','','','',2020,'');
		this.url = Global.url; // obtengo de services/global.ts defino mi url 
	}

	ngOnInit(): void {
	}

	onSubmit(form){
		console.log(this.project);

		// entro a mi servicio ProjectService uso mi metodo saveProject y le envio el proyecto a guardar y uso subscribe para obtener los resultados
		this._projectService.saveProject(this.project).subscribe( 
			response => {
				if(response.project){
					
					// SUbir Imagen CON EL SERVIO UploadService y su metodo que he creado makeFileRequest voy a mi backend con la url que se envia
					// entro al backend/controllers/project.js y uso mi metodo uploadImage
					this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image')
					.then((result:any) => {
						
						this.save_project = result.project;

						this.status = 'success';						
						form.reset();
					});
					
				}else{
					this.status = 'failed';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;	
	}

}