import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router'; // lamo estos servicios para poder obtener por la url mi id 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public project : Project;
  public url: string;
  public confirm: boolean;
  
  constructor(

    //creo las propiedasdes del servicio para poder inyectarlas
  	private _projectService: ProjectService,
  	private _router: Router,
  	private _route: ActivatedRoute
  ) {
  	this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(): void {
  	this._route.params.subscribe(params => { //recoger mis parametro que llega por la url, uso subscribe para recoger la rta
  		let id = params.id;

  		this.getProject(id);
  	});
  }

  getProject(id){
    // entro a mi servicio ProjectService uso mi metodo getProject para hacer la peticion del 
    // proyecto con su id que voy a mostrar , uso subscribe para recoger la rta que me envia el api
  	this._projectService.getProject(id).subscribe(
  		response => {
  			this.project = response.project;
  		},
  		error => {
  			console.log(<any>error);
  		}

  	)

  }

  deleteProject(id){
    // entro a mi servicio ProjectService uso mi metodo getProject para hacer la peticion del 
    // proyecto con su id que voy a eliminar , uso subscribe para recoger la rta que me envia el api
  	this._projectService.deleteProject(id).subscribe(
  		response => {
  			if(response.project){
  				this._router.navigate(['/proyectos']);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  // Metodo para mostar los botones de confirmacion para eliminar mi proyecto
  setConfirm(confirm){
    this.confirm = confirm;
  }

}
