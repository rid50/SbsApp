/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
//import { strings } from '@material/drawer';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

import { PurchaseRequisition } from '../models/purchase-requisition';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-purchase-requisition',
  templateUrl: './purchase-requisition.component.html',
  styleUrls: ['./purchase-requisition.component.scss']
})
export class PurchaseRequisitionComponent implements OnInit {

  // @Input() recordsCount = 5
  @Output() onRecordsCount = new EventEmitter();
  // @Output() onRecordSelected = new EventEmitter();
  
  // contractId: string;
  // purchaseRequisition: PurchaseRequisition

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  selectedRowIndex: number = -1

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  dataSource = new MatTableDataSource<PurchaseRequisition>()

  displayedColumns = ['contractId'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.loadPurchaseRequisition()
    this.dataSource.sort = this.sort;
  }

  loadPurchaseRequisition(): void {
    //this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction);

    this.loadingSubject.next(true)
    // console.log('Contract details started')
    this.contractService.getPurchaseRequisition()
        .pipe(
            // tap(() => console.log('Contract details completed')),
            map((array: PurchaseRequisition[]) => array.map((item: PurchaseRequisition) => ({
                ...item,
                // contractId: `${item.contractId} (${item.dateEntry})`
            }))),
            catchError(err => {
                console.log('Handling error locally and rethrowing it...', err)
                return throwError(err)
            }),
            //catchError(() => of([])),
            // tap(() => console.log('Contract details finalized')),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(data => {
          this.dataSource.data = data
          this.onRecordsCount.emit(this.dataSource.data.length)
        })
    //.subscribe(contracts => this.contractSubject.next(contracts))

}

  onRowClicked(row: PurchaseRequisition, index: number): void {
    // console.log(`Table rows:\n${JSON.stringify(row)}`)
    this.selectedRowIndex = index;
    // const contractId = row.contractId;
    const purchaseRequisition = this.dataSource.data.find(c => c.contractId == row.contractId)
    this.contractService.NotifyOfPurchaseRequisitionSelection(purchaseRequisition)
  }
}
