import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',  // reutilizo la vista del componente create
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]

})
export class EditComponent implements OnInit {

	public title: string;
	public project: Project;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;
	public url: string;

	constructor(
		//creo las propiedasdes del servicio para poder inyectarlas
		private _projectService: ProjectService,
		private _uploadService: UploadService,
	  	private _router: Router,
	  	private _route: ActivatedRoute
	) {
		this.title = 'Editar proyecto';
		this.url = Global.url;
	}

	ngOnInit(){
  	this._route.params.subscribe(params => { //recoger mis parametro que llega por la url, uso subscribe para recoger la rta
  		let id = params.id;

  		this.getProject(id);
	  	});
	}

	// entro a mi servicio ProjectService uso mi metodo getProject para hacer la peticion del 
    // proyecto con su id que voy a mostrar , uso subscribe para recoger la rta que me envia el api
  	getProject(id){
  		this._projectService.getProject(id).subscribe(
	  		response => {
	  			this.project = response.project;
	  		},
	  		error => {
	  			console.log(<any>error);
	  		}

  		)

  	}

  	onSubmit(form){
  		this._projectService.updateProject(this.project).subscribe(
  			response => {
	  			if(response.project){
					
					// SUbir Imagen 
					if(this.filesToUpload){
						// SUbir Imagen CON EL SERVIO UploadService y su metodo que he creado makeFileRequest voy a mi backend con la url que se envia
						// entro al backend/controllers/project.js y uso mi metodo uploadImage
						this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image')
						.then((result:any) => {
							
							this.save_project = result.project;

							this.status = 'success';						
						});
					}else{
							this.save_project = response.project;
							this.status = 'success';
					}
					
					
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
