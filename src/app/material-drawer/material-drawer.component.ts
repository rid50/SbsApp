import { Component, OnInit } from '@angular/core';

import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";

@Component({
  selector: 'app-material-drawer',
  templateUrl: './material-drawer.component.html',
  styleUrls: ['./material-drawer.component.scss']
})
export class MaterialDrawerComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

	// Instantiation
	// const topAppBarElement = document.querySelector('.mdc-top-app-bar');
	// const topAppBar = new MDCTopAppBar(topAppBarElement);	  
	  
	// const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
		  
	const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
	drawer.open = true;

	const listEl = document.querySelector('.mdc-drawer .mdc-list');
	const mainContentEl = document.querySelector('.main-content');

	listEl.addEventListener('click', (event) => {
		//Dismissible drawer
		(<HTMLElement>mainContentEl.querySelector('input, button')).focus();

		//Modal drawer
		// drawer.open = false;
	});

	document.body.addEventListener('MDCDrawer:closed', () => {
	  (<HTMLElement>mainContentEl.querySelector('input, button')).focus();
	});

	const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
	topAppBar.setScrollTarget(document.getElementById('main-content'));
	topAppBar.listen('MDCTopAppBar:nav', () => {
	  drawer.open = !drawer.open;
	});	
  }
}
