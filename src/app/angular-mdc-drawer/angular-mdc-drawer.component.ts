import { Component, OnInit } from '@angular/core';


 
//import {MDCDrawer} from "@material/drawer";
//import {MdcTopAppBarModule} from '@angular-mdc/web/top-app-bar';
//import {MDCTopAppBar} from '@material/top-app-bar';

@Component({
  selector: 'app-angular-mdc-drawer',
  templateUrl: './angular-mdc-drawer.component.html',
  styleUrls: ['./angular-mdc-drawer.component.scss']
})
export class AngularMdcDrawerComponent implements OnInit {

	destinations = [
	  { label: 'Inbox', icon: 'inbox', activated: true },
	  { label: 'Star', icon: 'star', activated: false },
	  { label: 'Sent Mail', icon: 'send', activated: false },
	  { label: 'Drafts', icon: 'drafts', activated: false }
	];
	
tabs = [
  { label: 'Flights', icon: 'airplanemode_active' },
  { label: 'Hotel', icon: 'hotel' },
  { label: 'Favorites', icon: 'favorite' }
];

links = [
  { label: 'Inbox', icon: 'inbox' },
  { label: 'Star', icon: 'star' },
  { label: 'Sent Mail', icon: 'send' },
  { label: 'Drafts', icon: 'drafts' }
];	
  constructor() { }

  ngOnInit(): void {
	  
	// const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
		  
	// const listEl = document.querySelector('.mdc-drawer .mdc-list');
	// const mainContentEl = document.querySelector('.main-content');

	// listEl.addEventListener('click', (event) => {
	  // drawer.open = false;
	// });

	// document.body.addEventListener('MDCDrawer:closed', () => {
	  // (<HTMLElement>mainContentEl.querySelector('input, button')).focus();
	// });
	
	//const topAppBarElement = document.querySelector('.mdc-top-app-bar');
	//const topAppBar = new MDCTopAppBar(topAppBarElement);	
	//const mdcTopAppBar = new MdcTopAppBarModule(topAppBarElement);	
  }

}
