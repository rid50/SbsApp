import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import {NgForm} from '@angular/forms'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { catchError, map, finalize } from 'rxjs/operators'

//import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { MatInputModule } from '@angular/material/input'

//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ContractDetail } from '../models/contract-detail';
import { ContractService } from '../services/contract.service';
import { ContractDataSource } from '../services/contract.datasource';
import { NgForOf } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'app-contract-detail-list',
    templateUrl: './contract-detail-list.component.html',
    styleUrls: ['./contract-detail-list.component.scss']
})
export class ContractDetailListComponent {
    @Input() contractId: string;

    contractDetail: ContractDetail;
    //dataSource: ContractDataSource;


    //contract: Contract
    //contracts: Contract[]
    todaysDate: Date = new Date();

    //dataSource: ContractDataSource;
    //dataSource = new MatTableDataSource(this.contracts);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$ = this.loadingSubject.asObservable();

    dataSource = new MatTableDataSource<ContractDetail>()

    //displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'currency'];
    displayedColumns = ['supplierId', 'partNo', 'itemId', 'unitPrice', 'costPrice', 'currency'];

    //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private route: ActivatedRoute, private contractService: ContractService) {
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
                this.loadContractDetails(this.contractId)
                this.dataSource.sort = this.sort;
            }
        }
    }

    // ngOnInit(): void {
    //     //this.contract = this.route.snapshot.data["contact"];
    //     //this.dataSource = new ContractDataSource(this.contractService);
    //     //this.loadContracts()

    //     //this.dataSource.loadContracts()
    //     //this.loadContractDetails('13/910-7972/COM')
    //     this.loadContractDetails(this.contractId)
    //     this.dataSource.sort = this.sort;
    //     //this.dataSource.sort = this.sort;

    //     // const contracts$ = this.contractService.findAllContracts()
    //     // // .pipe(tap (x => {
    //     // //     let y = x;
    //     // //     console.log(x)
    //     // // }))
    //     // .subscribe(
    //     //     // res => console.log('HTTP response', res),
    //     //     // err => console.log('HTTP Error', err),
    //     //     // () => console.log('HTTP request completed.')
    //     // );
    // }

    ngAfterViewInit(): void {
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.sort.sortChange.subscribe(() => { })

        // fromEvent(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         debounceTime(150),
        //         distinctUntilChanged(),
        //         tap(() => {
        //             //this.paginator.pageIndex = 0;

        //             this.loadContracts();
        //         })
        //     )
        //     .subscribe();

        //merge(this.sort.sortChange, this.paginator.page)
        //merge(this.sort.sortChange)
        // this.sort.sortChange
        //     .pipe(
        //         //tap((x) => console.log(x)),
        //         //tap(() => this.dataSource.loadContracts(null, '', '')),
        //         tap(() => this.loadContracts())
        //     )
        //     .subscribe();

    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //    loadContracts() {
    //        this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction, this.skip, this.take);
    //    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    loadContractDetails(id: string) {
        //this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction);

        this.loadingSubject.next(true)
        this.contractService.getContractDetails(id)
            .pipe(
                map((array: ContractDetail[]) => array.map((item: ContractDetail) => ({
                    ...item
                }))),
                //tap(console.log),
                catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err)
                    return throwError(err)
                }),
                //catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(data => this.dataSource.data = data)
        //.subscribe(contracts => this.contractSubject.next(contracts))

    }

    // filterValue : string;
    // applyFilter():void{
    //      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onRowClicked(row: unknown): void {
        //console.log('Row clicked: ', row);
        console.log(window.navigator.language)
    }
}

