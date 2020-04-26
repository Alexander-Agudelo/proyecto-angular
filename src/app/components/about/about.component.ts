import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	public title: string;
	public subtitle: string;
	public email: string;

  constructor() {
  	this.title = 'Alexander Agudelo';
  	this.subtitle = 'Ingeniero mecatronico - Desarrollador web JavaScrip MeanStack';
  	this.email = 'Ing.AlexAgudelo@gmail.com'
  }

  ngOnInit(): void {
  }

}
