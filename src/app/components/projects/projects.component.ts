import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
	public projects: Project[];
	public url: string;

  constructor(
      //creo las propiedasdes del servicio para poder inyectarlas
  		private _projectService: ProjectService
  	) { 
  	this.url = Global.url;
  }

  ngOnInit(): void {
  	this.getProjects(); // Metodo OnInit se ejecuta al cargar el componente abro esta pestana y en ese momento ejecuta getProjects()
  }

  getProjects(){
    // entro a mi servicio ProjectService uso mi metodo getProjects para hacer la peticion de los 
    // proyectos uso subscribe para recoger la rta que me envia el api
  	this._projectService.getProjects().subscribe(
  		response => {
  			if(response.projects){
  				this.projects = response.projects; // guardo el valor de esta propiedad
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

}
