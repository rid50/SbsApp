import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { MDCDrawer } from '@material/drawer';
import { MDCTopAppBar } from '@material/top-app-bar';
// import {MDCRipple} from '@material/ripple';
// import { MDCList } from '@material/list';
import { VERSION } from '@angular/material/core';

// import { ComponentCommunicationService } from '../services/component-communication.service';
import { IContract } from '../models/contract'

//import {ContractListComponent} from '../contract-list/contract-list.component';

@Component({
	selector: 'app-material-drawer',
	templateUrl: './material-drawer.component.html',
	styleUrls: ['./material-drawer.component.scss'],

	// encapsulation: ViewEncapsulation.None
})
export class MaterialDrawerComponent implements OnInit {

	// @Output() contractIdEvent = new EventEmitter<string>();
    // @Output() loadContractsSubscriptionCompleteEvent = new EventEmitter<boolean>();
	
	version = VERSION;
	// contract: IContract;
	// contractId: string;
	// loadContractsSubscriptionComplete: boolean;

	// constructor(private componentCommunicationService: ComponentCommunicationService) { }

	ngOnInit(): void {

		// const list = new MDCList(document.querySelector('.mdc-list'));
		// list.wrapFocus = true;
		
		// const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
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

	// getContractId($event: string): void {
	// 	this.contractId = $event;
	// 	//console.log('Event: ', $event)
	// 	//console.log('ContractId: ', this.contract.contractId);

	// }

	// sendSignalOfLoadContractsSubscriptionComplete($event: boolean): void {
	// 	//this.contract = this.componentCommunicationService.getContract();
	// 	//this.contractIdEvent.emit(this.contract.contractId);
	// 	this.loadContractsSubscriptionComplete = $event;
	// 	//this.contractIdEvent.emit($event);

	// 	//this.contractId = this.contract.contractId;
	// 	//console.log('Event: ', $event)
	// 	//console.log('ContractId: ', this.contract.contractId);

	// }

}
