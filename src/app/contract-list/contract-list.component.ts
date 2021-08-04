import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import {NgForm} from '@angular/forms'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { catchError, map, skip, finalize } from 'rxjs/operators'

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//import { MatInputModule } from '@angular/material/input'

//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { Contract } from '../models/contract';
import { ContractService } from '../services/contract.service';
import { ComponentCommunicationService } from '../services/component-communication.service';
import { ContractDataSource } from '../services/contract.datasource';
import { NgForOf } from '@angular/common';
import { DateAdapter, MatRipple } from '@angular/material/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit, AfterViewInit {

    @Output() contractIdEvent = new EventEmitter<string>();

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    selectedRowIndex: number = -1

    contract: Contract;
    dataSource: ContractDataSource;


    //contract: Contract
    //contracts: Contract[]
    todaysDate: Date = new Date();

    // dataSource: ContractDataSource;
    //dataSource = new MatTableDataSource(this.contracts);

    // private loadingSubject = new BehaviorSubject<boolean>(false);

    // loading$ = this.loadingSubject.asObservable();

    // dataSource = new MatTableDataSource<Contract>()

    //displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'currency'];
    // displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'currency', 'edit', 'delete'];
    displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'edit', 'delete'];
    skip = 0;
    take = 0;

    editRow = false

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;
    // @ViewChild(MatRipple) ripple: MatRipple;


    // contactsCount = 0;
    length = 0;
    pageSize = 20;
    pageSizeOptions: number[] = [20, 40, 100];

    // MatPaginator Output
    // pageEvent: PageEvent;

    // setPageSizeOptions(setPageSizeOptionsInput: string): void{
    //     if (setPageSizeOptionsInput) {
    //         this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    //     }
    // }

    public handlePageEvent(e? : PageEvent): void {
        // this.pageEvent = e;
        // // this.length = this.contactsCount;
        // console.log(e);
        // console.log('sss--- ',this.length)
        // this.skip = e.pageIndex * e.pageSize;
        // this.pageSize = e.pageSize;
        // // this.take = e.pageSize;
        // this.loadContracts()
        // // this.iterator();
    }

    // launchRipple(): void {
    //     const rippleRef = this.ripple.launch({
    //         persistent: true,
    //         centered: true
    //     });

    //     // Fade out the ripple later.
    //     // rippleRef.fadeOut();
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private route: ActivatedRoute, private _adapter: DateAdapter<any>,
        private contractService: ContractService, private componentCommunicationService: ComponentCommunicationService) {
        //this._adapter.setLocale('de');
        //this._adapter.setLocale('en');
        //this._adapter.setLocale('fr');
        this._adapter.setLocale('ru-RU');
    }

    contactsCount = 0;
    getContactsCount(): number {
        if (this.contactsCount == 0)
            this.contactsCount = this.dataSource.contactsCount

        return this.contactsCount;            
    }

    ngOnInit(): void {
        this.take = this.pageSize;
        this.contract = this.route.snapshot.data['contract'];
        this.dataSource = new ContractDataSource(this.contractService);
        this.dataSource.loadContracts(this.skip, this.take)


        // this.loadContracts()
        // this.dataSource.sort = this.sort;
        //this.dataSource.sort = this.sort;

        // const contracts$ = this.contractService.findAllContracts()
        // // .pipe(tap (x => {
        // //     let y = x;
        // //     console.log(x)
        // // }))
        // .subscribe(
        //     // res => console.log('HTTP response', res),
        //     // err => console.log('HTTP Error', err),
        //     // () => console.log('HTTP request completed.')
        // );
    }

    ngAfterViewInit(): void {
        // this.length = this.dataSource.contactsCount
        // this.dataSource.paginator = this.paginator;
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // this.paginator.page
        // merge(this.sort.sortChange, this.paginator.page)        
        //     .pipe(
        //         // startWith(null),
        //         tap(() => {
        //             this.skip = this.paginator.pageIndex * this.paginator.pageSize
        //             this.take =  this.paginator.pageSize
    
        //             this.loadContracts()
        //         })
        //     )
        //     .subscribe();


        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.sort.sortChange.subscribe(() => { })

        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadContracts();
                })
            )
            .subscribe();

       // reset the paginator after sorting
       this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        // on sort or paginate events, load a new page
        merge(this.sort.sortChange, this.paginator.page)        
            .pipe(
                // startWith(null),
                tap(() => {
                    // this.skip = this.paginator.pageIndex * this.paginator.pageSize
                    // this.take =  this.paginator.pageSize
    
                    this.loadContracts()
                })
            )
            .subscribe();

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
    loadContracts() {
        this.skip = this.paginator.pageIndex * this.paginator.pageSize
        this.take =  this.paginator.pageSize

        this.dataSource.loadContracts(this.skip, this.take, this.input.nativeElement.value, this.sort.active, this.sort.direction)
        //this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction);

        // this.loadingSubject.next(true)
        // this.contractService.getContracts(this.skip, this.take)
        //     .pipe(
        //         // map((array: Contract[], index) => {
        //         //     // console.log(array[0])
        //         //     this.contactsCount = parseInt(array[0].contractValue, 10)
        //         //     this.length = this.contactsCount
        //         //     if (this.skip == 0 && index == 0)
        //         //         array.shift()
        //         //     // array.splice(0,1)
        //         //     return array;
        //         // }),
        //         map((array: Contract[]) => array.map((item: Contract) => ({
        //             ...item,
        //             contractValue: `${item.currency} ${item.contractValue}`
        //         }))),
        //         //tap(console.log),
        //         catchError(err => {
        //             console.log('Handling error locally and rethrowing it...', err)
        //             return throwError(err)
        //         }),
        //         //catchError(() => of([])),
        //         finalize(() => this.loadingSubject.next(false))
        //     )
        //     .subscribe(data => {
        //         this.dataSource.data = data;
        //         this.dataSource.paginator = this.paginator;
        //     })
        //.subscribe(contracts => this.contractSubject.next(contracts))

    }

    // filterValue : string;
    // applyFilter():void{
    //      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        // this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onRowClicked(row: Contract, index: number): void {
        this.selectedRowIndex = index;
        this.componentCommunicationService.setContract(row);
        this.contractIdEvent.emit(row.contractId);
        //this.ripple.launch(0, 0, { centered: true, persistent: true });

        // this.launchRipple();
        //console.log('Row clicked: ', row);
        //console.log (window.navigator.language)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    edit(element: Contract): void {
        this.editRow = !this.editRow;
        if (this.editRow)
            this.displayedColumns.splice(4, 0, 'currency')
        else
            this.displayedColumns.splice(4, 1)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    delete(id: string): void { console.log }
}

