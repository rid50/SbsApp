/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

import { IContract } from '../models/contract';
import { ComponentCommunicationService } from '../services/component-communication.service';

//import { DataSource } from '@angular/cdk/collections'

//import { ComponentCommunicationService } from '../services/component-communication.service';
//import { Contract } from '../models/contract'

@Component({
  selector: 'app-contract-form-entry',
  templateUrl: './contract-form-entry.component.html',
  styleUrls: ['./contract-form-entry.component.scss']
})
export class ContractFormEntryComponent implements OnChanges {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() contractId: string;
  //@Input('dataSource') dataSource: DataSource<Contract>;

  //dataSource: DataSource<Contract>;

  contract!: IContract;

  todaysDate: Date = new Date();

  // hideDateEntryFormField = this.contract == undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private _adapter: DateAdapter<any>, private componentCommunicationService: ComponentCommunicationService) {
    this._adapter.setLocale('ru-RU');
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      // if (changedProp.isFirstChange()) {
      //   console.log(`Initial value of ${propName} set to ${to}`);
      // } else {
      //   const from = JSON.stringify(changedProp.previousValue);
      //   console.log(`${propName} changed from ${from} to ${to}`);
      // }

      if (to != undefined)
        this.contract = this.componentCommunicationService.getContract();
    }
  }
  // getContractId(): void {
  // 	this.contract = this.componentCommunicationService.getContract();
  // 	//this.contractIdEvent.emit(this.contract.contractId);
  // 	//this.contractIdEvent.emit($event);

  // 	//this.contractId = this.contract.contractId;
  // 	//console.log('Event: ', $event)
  // 	//console.log('ContractId: ', this.contract.contractId);

  // }
}
