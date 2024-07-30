import { AfterViewInit, Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { MDCDrawer } from '@material/drawer';
import { MDCTopAppBar } from '@material/top-app-bar';

// import {MDCMenu} from '@material/menu';

// import {MdcIconModule} from '@angular-mdc/web/icon';
// import {MdcMenuModule} from '@angular-mdc/web/menu';

// import {MDCRipple} from '@material/ripple';
// import { MDCList } from '@material/list';
import { VERSION } from '@angular/material/core';

// import { ComponentCommunicationService } from '../services/component-communication.service';
import { IContract } from '../models/contract'
import { getLocaleId } from '@angular/common';
import { MDCList, MDCListFoundation } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { MDCMenu, MDCMenuFoundation } from '@material/menu';
import { ContractService } from '../services/contract.service';

//import {ContractListComponent} from '../contract-list/contract-list.component';

@Component({
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss'],
	//standalone: true,
	// encapsulation: ViewEncapsulation.None
})
export class DrawerComponent implements OnInit, AfterViewInit {

	// @Output() contractIdEvent = new EventEmitter<string>();
    // @Output() loadContractsSubscriptionCompleteEvent = new EventEmitter<boolean>();
	
	version = VERSION;
	// contract: IContract;
	// contractId: string;
	// loadContractsSubscriptionComplete: boolean;

	// constructor(private componentCommunicationService: ComponentCommunicationService) { }
    constructor(private contractService: ContractService){}
	
	// loc = getLocaleId(this.locale);
    // constructor(@Inject(LOCALE_ID) public locale: string,){}

	siteLanguage = 'English';
	siteLocale: string;
	languageList = [
		{ code: 'en', label: 'English' },
		{ code: 'fr', label: 'Français' },
		{ code: 'ru', label: 'Russian' }
	];

	ngOnInit(): void {

		this.siteLocale = window.location.pathname.split('/')[1];
		this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale)?.label
		if (this.siteLanguage == undefined)
			this.siteLanguage = 'English'
		// else
		// this.siteLanguage = this.siteLanguage.label;

		// const list = new MDCList(document.querySelector('.mdc-list'));
		// list.wrapFocus = true;
		
		// const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
		// Instantiation
		// const topAppBarElement = document.querySelector('.mdc-top-app-bar');
		// const topAppBar = new MDCTopAppBar(topAppBarElement);	  

		// const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

		// const menu = new MDCMenu(document.querySelector('.mdc-menu'));
		// menu.open = true;
		// menu.setFixedPosition(true);
		// menu.setAbsolutePosition(100, 100);

		const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
		drawer.open = true;

		const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
		topAppBar.setScrollTarget(document.getElementById('main-content'));
		topAppBar.listen('MDCTopAppBar:nav', () => {
			drawer.open = !drawer.open;
		});

		// const list = MDCList.attachTo(document.querySelector('.mdc-list'));
		// const listEl = document.querySelector('.mdc-list');
		// listEl.addEventListener('MDCList:action', (event) => {
		// 	console.log(`Event ${JSON.stringify(event)}`)
		// });

		// list.wrapFocus = true;
		// list.setEnabled(1, true)
		// list.singleSelection = true;

		// const list = MDCList.attachTo(document.querySelector('.mdc-list'));
		// list.wrapFocus = true;		
		// list.singleSelection = true;
	
		// const menu = new MDCMenu(document.querySelector('.mdc-menu'));
		// menu.setSelectedIndex(0);

		// const list = new MDCList(document.getElementById('my-list'));
		// list.singleSelection = true;

		// const found = new MDCListFoundation();
		// found.setSingleSelection(true)
		// found.setSelectedIndex(1)

		// // const found = new MDCListAdapter();

		// const indx = list.selectedIndex

		//found.setDefaultFocusState(DefaultFocusState.LIST_ROOT)
		// found.setDefaultFocusState(default) .setSelectedIndex(0);
		// MDCListAdapter.focusItemAtIndex(index: Number)

		// const list = new MDCList(document.getElementById('my-list'));
		// // list.singleSelection = true;
		// list.wrapFocus = true;

		const listEl = document.querySelector('.mdc-drawer .mdc-list');
		// const mainContentEl = document.querySelector('.main-content');

		// const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
				
		listEl.addEventListener('click', (event) => {
			drawer.open = false;
			//Dismissible drawer
			// (<HTMLElement>mainContentEl.querySelector('input, button')).focus();

		// // 	//Modal drawer
		// // 	// drawer.open = false;
		});

		// document.body.addEventListener('MDCDrawer:closed', () => {
		// 	(<HTMLElement>mainContentEl.querySelector('input, button')).focus();
		// });


	}

	ngAfterViewInit(): void {
		//this.contractService.isSSL()
        this.contractService.isSSL().subscribe().unsubscribe
            // .pipe(
            //     // // tap(() => console.log('Contract details completed')),
            //     // map((array: ContractDetail[]) => array.map((item: ContractDetail) => ({
            //     //     ...item
            //     // }))),
            //     catchError(err => {
            //         console.log('Handling error locally and rethrowing it...', err)
            //         return throwError(err)
            //     }),
            //     //catchError(() => of([])),
            //     // tap(() => console.log('Contract details finalized')),
            //     //finalize(() => this.loadingSubject.next(false))
            // )
            // .subscribe()

		// const found = new MDCListFoundation();
		// // found.setSingleSelection(true)
		// found.setSelectedIndex(0)		
		// const list = new MDCList(document.getElementById('my-list'));
		// const list = MDCList.attachTo(document.querySelector('.mdc-list'));
		// list.wrapFocus = true;
		// // list.setEnabled(1, true)
		// list.singleSelection = true;

		// const listEle = document.getElementById('my-list');
		// const list = new mdc.list.MDCList(listEle);
		// list.singleSelection = true;



		// const found = new MDCListAdapter();

		// const indx = list.selectedIndex

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
