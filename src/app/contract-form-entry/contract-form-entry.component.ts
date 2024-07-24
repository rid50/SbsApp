/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ViewChildren, ElementRef, QueryList, Inject, LOCALE_ID } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { throwError } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';

// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatSelectModule} from '@angular/material/select';
// import {MatInputModule} from '@angular/material/input';

import * as _moment from 'moment';

import { IContract } from '../models/contract';
import { ContractDataSource } from '../services/contract.datasource';
// import { ComponentCommunicationService } from '../services/component-communication.service';
import { ContractService } from '../services/contract.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { getLocaleId } from '@angular/common';

//import { DataSource } from '@angular/cdk/collections'

//import { ComponentCommunicationService } from '../services/component-communication.service';
//import { Contract } from '../models/contract'

class Contract implements IContract {
  contractId: string
  contractName: string;
  dateEntry: string;
  contractValue: string;
  currency: string;
}

@Component({
  selector: 'app-contract-form-entry',
  templateUrl: './contract-form-entry.component.html',
  styleUrls: ['./contract-form-entry.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractFormEntryComponent implements OnInit, AfterViewInit, OnChanges {

  // @Input() contractId: string;
  //@Input('dataSource') dataSource: DataSource<Contract>;

  //dataSource: DataSource<Contract>;

  @Input() contract: IContract;

  todaysDate: Date = new Date();

  selected = ''

  @ViewChildren(MatInput, { read: ElementRef }) inputs: QueryList<ElementRef>;

  // hideDateEntryFormField = this.contract == undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(LOCALE_ID) public locale: string, private _adapter: DateAdapter<any>,
    private dataSource: ContractDataSource) {
    // this._adapter.setLocale('fr');
    // this._adapter.setLocale('ru-RU');
  }

  // loc = getLocaleId(this.locale);


  ngOnInit(): void {
    this.contract = new Contract();
    // this.contract.contractName = 'ku'
  }

  ngAfterViewInit(): void {
    // const inpu = this.inputs.toArray()

    this.inputs.changes.subscribe((changes): void => {
      // console.log('Table content changed')
      for (const propName in changes) {
        const changedProp = changes[propName];
        const to = JSON.stringify(changedProp.currentValue);
        // if (changedProp.isFirstChange()) {
        //   console.log(`Initial value of ${propName} set to ${to}`);
        // } else {
        //   const from = JSON.stringify(changedProp.previousValue);
        //   console.log(`${propName} changed from ${from} to ${to}`);
        // }

        // console.log(propName)
        // const inpu = this.inputs.toArray()

        // console.log(`Contract:\n${contr}`)
        // if (to != undefined) {
        // this.contractId = this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n')[0]
        // this.contract = this.dataSource.data.find(c => c.contractId == this.contractId)
        // break;
        // console.log(`ContractId before:\n${this.contractId}`)
        // }
      }
    });
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

      if (to != undefined) {
        // this.contract = this.contractService.getContract();
        // this.contract.contractName = 'kuku'
        this.selected = this.contract.currency;
        // this.selected = this.contract.currency.replace(/\s+/g, '_');
      }
    }
  }

  onSelectionChange(value: string): void {
    this.dataSource.updateContract(this.contract.contractId, { 'currency': value })    
    // console.log(value);
    //this.contract.contractName = 'kukuk' + value
    // const contract = this.dataSource.data.find(c => c.contractId == this.contract.contractId)
    // contract['currency'] = value
    // console.log(`onSelectionChange=${value}`)
    // this.contract.contractName += ' a-9'


    // this.dataSource.data = this.dataSource.data.filter((value,key)=>{
    //   if(value.contractId == this.contract.contractId){
    //     // value.contractName = 'aa';
    //     // this.contract.contractName += ' a-9'
    //   }
    //   return true;
    // });

    // const words = ['spray', 'limit', 'exuberant', 'destruction', 'elite', 'present']

    // const modifiedWords = words.filter((word, index, arr) => {
    //   arr[index + 1] += ' aa'
    //   return true
    //   // arr[index+1] +=' extra'
    //   // return word.length < 6
    // })
    // console.log(modifiedWords)

    // this.dataSource.updateContract(this.contract.contractId, { 'currency': value })
  }

  // setDatepicker(value: string): void {
  //   // this.contract.dateEntry = new Date(value)
  //   console.log(`setDatepicker ${value}`);
  //   // this.contract.dateEntry = _moment.utc(value, 'DD.MM.YYYY').format()
  // }

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>): void {
  //   console.log(`${type}: ${event.value}`);
  // }

  change(event: MatDatepickerInputEvent<Date>): void {
    // change(event: Event): void {
    console.log(`change ${JSON.stringify(event)}`);
  }

  ngModelChange(event: MatDatepickerInputEvent<Date>): void {
  // change(event: Event): void {
    console.log(`ngModelChange ${JSON.stringify(event)}`);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // dateChange(event: MatDatepickerInputEvent<Date>): void {
  dateChange(event: MatDatepickerInputEvent<Date>): void {
      // console.log(`dateChange event ${event}`);
      // console.log(`dateChange value ${event.value}`);
      if (event.value != null)
        this.dataSource.updateContract(this.contract.contractId)
  }

  onBlurEvent(event: Event): void {
    // console.log(`value ${(event.target as HTMLInputElement).value}`);
    // console.log(`textContent ${(event.target as HTMLInputElement).textContent}`);

    this.dataSource.updateContract(this.contract.contractId)
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
