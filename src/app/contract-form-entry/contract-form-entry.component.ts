/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { IContract } from '../models/contract';
import { ContractDataSource } from '../services/contract.datasource';
// import { ComponentCommunicationService } from '../services/component-communication.service';
import { ContractService } from '../services/contract.service';

//import { DataSource } from '@angular/cdk/collections'

//import { ComponentCommunicationService } from '../services/component-communication.service';
//import { Contract } from '../models/contract'

class Contract implements IContract {
    contractId: string
    contractName:string;
    dateEntry: string;
    contractValue: string;
    currency: string;
}

@Component({
  selector: 'app-contract-form-entry',
  templateUrl: './contract-form-entry.component.html',
  styleUrls: ['./contract-form-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,  
})
export class ContractFormEntryComponent implements OnInit, OnChanges {

    @Input() contractId: string;
    //@Input('dataSource') dataSource: DataSource<Contract>;

    //dataSource: DataSource<Contract>;

    @Input() contract: Contract;

    todaysDate: Date = new Date();

    selected = ''
    // hideDateEntryFormField = this.contract == undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private _adapter: DateAdapter<any>,
      private dataSource: ContractDataSource, private contractService: ContractService) {
      this._adapter.setLocale('ru-RU');
    }
    
    ngOnInit(): void {
      this.contract = new Contract();
      this.contract.contractName = 'ku'
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

        if (to != undefined ) {
          // this.contract = this.contractService.getContract();
          // this.contract.contractName = 'kuku'
          this.selected = this.contract.currency;
          // this.selected = this.contract.currency.replace(/\s+/g, '_');
        }
      }
    }

    onSelectionChange(value: string): void {
      // console.log(value);
      //this.contract.contractName = 'kukuk' + value
      const contract = this.dataSource.data.find(c => c.contractId == this.contract.contractId)
      this.dataSource.updateContract(this.contract.contractId, { 'currency': value })
    }

    //   updateContract(contractId: string, json: Record<string, string>): void {
    //     // this.loadingSubject.next(true)
    //     // const contract = this.data.find(c => c.contractId == contractId)

    //     const propNames = Object.getOwnPropertyNames(this.contract);
    //     propNames.forEach((propName) => {
    //             console.log(`name: ${propName} value: ${this.contract[propName]}`);
    //         }
    //     );

    //     for(const prop in this.contract) {
    //         console.log(`name ${prop} value ${this.contract[prop]}`)
    //     }

    //     //this.contract.
    //     this.contractService.updateContract(this.contract)
    //     .pipe(
    //         //tap(console.log),
    //         catchError(err => {
    //             console.log('Handling error locally and rethrowing it...', err)
    //             return throwError(err)
    //         }),
    //         // finalize(() => this.loadingSubject.next(false))
    //     )
    //     .subscribe()
    // }  
    // getContractId(): void {
    // 	this.contract = this.componentCommunicationService.getContract();
    // 	//this.contractIdEvent.emit(this.contract.contractId);
    // 	//this.contractIdEvent.emit($event);

    // 	//this.contractId = this.contract.contractId;
    // 	//console.log('Event: ', $event)
    // 	//console.log('ContractId: ', this.contract.contractId);

    // }
}
