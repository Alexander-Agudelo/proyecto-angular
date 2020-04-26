//Importar modulos del router de angular 
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';


const appRoutes: Routes = [
	{path: '', component: AboutComponent},
	{path: 'sobre-mi', component: AboutComponent},
	{path: 'proyectos', component: ProjectsComponent},
	{path: 'crear-proyectos', component: CreateComponent},
	{path: 'contacto', component: ContactComponent},
	{path: 'proyecto/:id', component: DetailComponent},
	{path: 'editar-proyecto/:id', component: EditComponent},
	{path: '**', component: ErrorComponent}
];

// Exportar el modulo 
export const appRoutingProviders: any[] = []; // exportar el servicio de rutas
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); // carga nuestra configuracion de rutas en el router de angular