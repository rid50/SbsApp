import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, ViewContainerRef, ViewChildren, QueryList, TemplateRef, ComponentRef, ContentChildren, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import {NgForm} from '@angular/forms'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { catchError, map, skip, finalize } from 'rxjs/operators'

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCell, MatCellDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';

//import { MatInputModule } from '@angular/material/input'

//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { IContract } from '../models/contract';
import { ContractService } from '../services/contract.service';
import { ComponentCommunicationService } from '../services/component-communication.service';
import { ContractDataSource } from '../services/contract.datasource';
import { NgForOf } from '@angular/common';
import { DateAdapter, MatRipple } from '@angular/material/core';
import { isNgTemplate } from '@angular/compiler';
import { MatInput } from '@angular/material/input';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { CdkColumnDef, CdkRowDef } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';

class Contract implements IContract {
    constructor(...rest:string[]){
        this.contractId = rest[0]
        this.contractName = rest[1]
        this.dateEntry = rest[2]
        this.contractValue = rest[3].split(' ')[1]
        this.currency = rest[3].split(' ')[0]
    }

    contractId: string
    contractName:string;
    dateEntry: string;
    contractValue: string;
    currency: string;
}

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit, AfterViewInit {

    // @Input() loadContractsSubscriptionComplete: boolean;
 
    // ngOnChanges(changes: SimpleChanges): void {
    //     if (this.selectedRowIndex != -1) {
    //         const rowT = this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n')[0];
    //         // const rowT = await this.tableRows.toArray()[this.selectedRowIndex].nativeElement
    //         console.log(`Table rows:\n${rowT} - ${this.selectedRowIndex}`)
    //     }
    // }    

    @Output() contractIdEvent = new EventEmitter<string>();

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    selectedRowIndex: number = -1

    // contract: Contract;
    dataSource: ContractDataSource;


    // contract: Contract
    //contracts: Contract[]
    todaysDate: Date = new Date();

    // dataSource: ContractDataSource;
    //dataSource = new MatTableDataSource(this.contracts);

    // private loadingSubject = new BehaviorSubject<boolean>(false);

    // loading$ = this.loadingSubject.asObservable();

    // dataSource2 = new MatTableDataSource<Contract>()

    //displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'currency'];
    // displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'currency', 'edit', 'delete'];
    displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'edit', 'delete'];
    // skip = 0;
    // take = 0;

    editRow = false

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    // @ViewChild(MatRow, { static: false }) tableRows: MatRow;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @ViewChildren(CdkColumnDef) private _columnDef: QueryList<CdkColumnDef>;
    @ViewChildren(MatCell, { read: ElementRef }) private _cellDef: QueryList<ElementRef>;

    // @ViewChildren(MatRow) tableRows: QueryList<MatRowDef<Contract>>;
    // @ViewChild('dt', { static: true }) dt;

    // @ViewChildren(MatRow) contr: QueryList<MatRow>;
    @ViewChildren(MatRow, { read: ElementRef }) tableRows: QueryList<ElementRef>;
    // @ViewChildren(MatRow, { read: ViewContainerRef  }) tableRows: QueryList<ViewContainerRef>;
    
    // @ViewChildren('matrow', { read: ViewContainerRef }) tableRows: QueryList<ViewContainerRef>;

    // @ViewChild(MatCell, {read: ViewContainerRef}) tableRows: QueryList<MatCell>;

    // @ViewChildren('tableRows', {read: ViewContainerRef}) tableRows: ViewContainerRef;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // @ViewChildren('tableRows', {read: ViewContainerRef}) tableRows: QueryList<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // @ViewChildren(MatCell, {read: ViewContainerRef}) tableRows: QueryList<any>;
    // @ViewChildren(MatInput) tableRows: QueryList<MatInput>
    // @ViewChild(MatTable, {read:ElementRef}) tableRows
    // @ViewChild(MatRipple) ripple: MatRipple;


    // contactsCount = 0;
    // length = 0;
    pageSize = 20;
    // pageSizeOptions: number[] = [20, 40, 100];

    // MatPaginator Output
    // pageEvent: PageEvent;

    // setPageSizeOptions(setPageSizeOptionsInput: string): void{
    //     if (setPageSizeOptionsInput) {
    //         this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    //     }
    // }

    // public handlePageEvent(e? : PageEvent): void {
    //     // this.pageEvent = e;
    //     // // this.length = this.contactsCount;
    //     // console.log(e);
    //     // console.log('sss--- ',this.length)
    //     // this.skip = e.pageIndex * e.pageSize;
    //     // this.pageSize = e.pageSize;
    //     // // this.take = e.pageSize;
    //     // this.loadContracts()
    //     // // this.iterator();
    // }

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

    // initialSelection = [{contractId: '13/9107972/COM', contractName: 'Data Migration', contractValue: '76200', currency: 'KD', dateEntry: '1999-12-31 00:00:00Z'}];
    // allowMultiSelect = false;
    // selection = new SelectionModel<Contract>(this.allowMultiSelect, this.initialSelection);
    // selection = new SelectionModel<Contract>(false, null);
        
    ngOnInit(): void {
        this.contractService.LoadContractsSubscriptionCompleteEvent.subscribe(_ => {
            if (this.selectedRowIndex != -1) {
                const selectedRow = this.tableRows.toArray()[this.selectedRowIndex]
                if (selectedRow == undefined) {
                    this.selectedRowIndex = this.tableRows.toArray().length - 1;
                }
                    // contractId = contractId.nativeElement.innerText.split('\n')[0];




                    // const rowT = this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n')[0];
                    // const rowT = await this.tableRows.toArray()[this.selectedRowIndex].nativeElement
                // } else {
                //     contractId = this.tableRows.toArray()[this.tableRows.toArray().length - 1].nativeElement.innerText.split('\n')[0]
                    
                //     this.selectedRowIndex = this.tableRows.toArray().length - 1;
                //     // this.dataSource2.data.forEach(row => this.selection.select(row));
                //     // this.selection.select(row)
                // }

                const row:string = this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n')
                const contract: IContract = new Contract(...row)
                // const i =5

                this.componentCommunicationService.setContract(contract);
                this.contractIdEvent.emit(contract.contractId);      

                // console.log(`Contract:\n${contract.contractId}`)
                // console.log(`Table rows:\n${contract.contractId} - ${this.selectedRowIndex}`)
            }
        })

        // this.take = this.pageSize;
        // this.contract = this.route.snapshot.data['contract'];
        this.dataSource = new ContractDataSource(this.contractService);
        this.dataSource.loadContracts(0, this.pageSize)

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
        // console.log(`After\n tableRow: ${this.tableRows}`)
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

                    // if (this.selectedRowIndex != -1) {
                    //     const rowT = await this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n')[0];
                    // // const rowT = await this.tableRows.toArray()[this.selectedRowIndex].nativeElement
                    //     console.log(`Table rows:\n${rowT} - ${this.selectedRowIndex}`)
                    // }
                    // this.componentCommunicationService.setContract(row);
                    // this.contractIdEvent.emit(row.contractId);                    
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
        // const skip = this.paginator.pageIndex * this.paginator.pageSize
        // const take = this.paginator.pageSize

        this.dataSource.loadContracts(
            this.paginator.pageIndex * this.paginator.pageSize, 
            this.paginator.pageSize, 
            this.input.nativeElement.value, this.sort.active, this.sort.direction
        )

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
        // console.log(`Table rows:\n${row}`)
        this.selectedRowIndex = index;
        this.componentCommunicationService.setContract(row);
        this.contractIdEvent.emit(row.contractId);

        // const col = {cdkColumnDef: 'contractId'} 

        // const col = new CdkColumnDef('ccc')
        // const rowT = this.tableRows.first;
        // const colD = this._columnDef.name
        // const rowT = this.tableRows.toArray()[this.selectedRowIndex]
        // const rowT = this.tableRows.toArray()[this.selectedRowIndex].extractCellTemplate(this._columnDef);
        // const rowT = this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n');
        // const rowT = this.tableRows.first.nativeElement.innerText;
        // const rowT = this.tableRows.get(1);

        // const rowT: string = this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n')[0];        
        // const contrT: MatTable<Contract> = this.contr.toArray()[this.selectedRowIndex]    
        // const contrT = this.contr.get(0)
        // this.contr.forEach(instance => console.log(instance))
        // console.log(`Column name:\n${this._columnDef.name}`)

        // this._columnDef.forEach(instance => console.log(instance))
        // const col = this._columnDef.length
        // console.log(`Contract:\n${col}`)

        // this._cellDef.forEach(instance => console.log(instance.nativeElement))
        // const cell = this._cellDef.length
        // console.log(`Contract:\n${cell}`)

        // const rowT:string[] = this.tableRows.toArray()[this.selectedRowIndex].nativeElement.innerText.split('\n')
        // // this.tableRows.forEach(instance => console.log(instance.nativeElement.innerText.split('\n')))
        // // this.tableRows.forEach(instance => console.log(instance))
        // const contract: Contract = new ContractCl(...rowT)
        // console.log(`Table rows:\n${rowT}`)
        // console.log(`Contract:\n${contract.contractId}`)

        // console.log('row ', row)
        // console.log('this.row', this.tableRows)
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

function MaInput(MaInput: any) {
    throw new Error('Function not implemented.');
}

function ColumnDirective(ColumnDirective: any) {
    throw new Error('Function not implemented.');
}

function Column(Column: any) {
    throw new Error('Function not implemented.');
}

