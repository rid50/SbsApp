import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MDCDrawer } from '@material/drawer';
import { MDCTopAppBar } from '@material/top-app-bar';

import { ComponentCommunicationService } from '../services/component-communication.service';
import { Contract } from '../models/contract'

//import {ContractListComponent} from '../contract-list/contract-list.component';

@Component({
	selector: 'app-material-drawer',
	templateUrl: './material-drawer.component.html',
	styleUrls: ['./material-drawer.component.scss']
})
export class MaterialDrawerComponent implements OnInit {

	@Output() contractIdEvent = new EventEmitter<string>();
	
	contract: Contract;
	contractId: string;

	constructor(private componentCommunicationService: ComponentCommunicationService) { }


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

	getContractId($event: string): void {
		//this.contract = this.componentCommunicationService.getContract();
		//this.contractIdEvent.emit(this.contract.contractId);
		this.contractId = $event;
		//this.contractIdEvent.emit($event);

		//this.contractId = this.contract.contractId;
		//console.log('Event: ', $event)
		//console.log('ContractId: ', this.contract.contractId);

	}

}
