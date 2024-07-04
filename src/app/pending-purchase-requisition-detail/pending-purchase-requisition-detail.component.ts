import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import {NgForm} from '@angular/forms'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay, pluck, skip } from 'rxjs/operators';
import { catchError, map, finalize } from 'rxjs/operators'

//import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
//import { MatInputModule } from '@angular/material/input'

//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ContractDetail } from '../models/contract-detail';
import { ContractService } from '../services/contract.service';
import { ContractDataSource } from '../services/contract.datasource';
import { NgForOf } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { isNgTemplate } from '@angular/compiler';
import { PurchaseRequisition } from '../models/purchase-requisition';

@Component({
  selector: 'app-pending-purchase-requisition-detail',
  templateUrl: './pending-purchase-requisition-detail.component.html',
  styleUrls: ['./pending-purchase-requisition-detail.component.scss']
})
export class PendingPurchaseRequisitionDetailComponent {
  @Input() contractId: string;

  // contractDetail: ContractDetail;
  //dataSource: ContractDataSource;


  //contract: Contract
  //contracts: Contract[]
  // todaysDate: Date = new Date();

  //dataSource: ContractDataSource;
  //dataSource = new MatTableDataSource(this.contracts);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  dataSource = new MatTableDataSource<PurchaseRequisition>()

  displayedColumns = ['itemId', 'partNo', 'partNoDescription', 'sumQuantity', 'unitPrice', 'totalPrice'];

  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('input', { static: true }) input: ElementRef;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private contractService: ContractService) { }

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
        this.loadPendingPRDetails(this.contractId)
        this.dataSource.sort = this.sort;
      }
    }
  }

  // ngAfterViewInit(): void {
  //   //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //   // eslint-disable-next-line @typescript-eslint/no-empty-function
  //   this.sort.sortChange.subscribe(() => { })

  //   // fromEvent(this.input.nativeElement, 'keyup')
  //   //     .pipe(
  //   //         debounceTime(150),
  //   //         distinctUntilChanged(),
  //   //         tap(() => {
  //   //             //this.paginator.pageIndex = 0;

  //   //             this.loadContracts();
  //   //         })
  //   //     )
  //   //     .subscribe();

  //   //merge(this.sort.sortChange, this.paginator.page)
  //   //merge(this.sort.sortChange)
  //   // this.sort.sortChange
  //   //     .pipe(
  //   //         //tap((x) => console.log(x)),
  //   //         //tap(() => this.dataSource.loadContracts(null, '', '')),
  //   //         tap(() => this.loadContracts())
  //   //     )
  //   //     .subscribe();

  // }

  //    loadContracts() {
  //        this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction, this.skip, this.take);
  //    }

  loadPendingPRDetails(id: string): void {
    //this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction);

    this.loadingSubject.next(true)
    // console.log('Contract details started')
    this.contractService.getPendingPRDetails(id)
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((obj:any)=>obj.rows),
        map((array: PurchaseRequisition[]) => array.map((item: PurchaseRequisition) => ({
          ...item
        }))),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err)
          return throwError(err)
        }),
        //catchError(() => of([])),
        // tap(() => console.log('Contract details finalized')),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(data => this.dataSource.data = data)
      //.subscribe(data => console.log(`data: ${JSON.stringify(data)}`))

  }

  // filterValue : string;
  // applyFilter():void{
  //      this.dataSource.filter = this.filterValue.trim().toLowerCase();
  // }

  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

}
