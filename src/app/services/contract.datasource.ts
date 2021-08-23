import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { Component, Inject, Injectable } from '@angular/core'
import { EventEmitter, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'
import { catchError, finalize, map, tap } from 'rxjs/operators'
import { isTemplateExpression } from 'typescript'
import { IContract } from '../models/contract'
import { ContractService } from './contract.service'

// @Component({
//     template: ''
// })
@Injectable()
export class ContractDataSource extends MatTableDataSource<IContract> {

    // @Output() loadContractsSubscriptionCompleteEvent = new EventEmitter<boolean>();


    contactsCount = 0;

    // private contractSubject = new BehaviorSubject<IContract[]>([]);

    /** Stream that emits when a new data array is set on the data source. */
    // private readonly _data: BehaviorSubject<IContract[]>;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();


    /** Array of data that should be rendered by the table, where each object represents one row. */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    // get data(): IContract[] { return this._data.value; }
    // set data(data: IContract[]) {
    //     this._data.next(data);
    //     // // Normally the `filteredData` is updated by the re-render
    //     // // subscription, but that won't happen if it's inactive.
    //     // if (!this._renderChangesSubscription) {
    //     //   this._filterData(data);
    //     // }
    // }

    constructor(private contractService: ContractService) {
        super();
        // this._data = new BehaviorSubject<IContract[]>([]);
    }


    // loadContracts(skip?:number, take?:number, id_wildcard?: string, sortColumnName?: string, sordOrder?:string,
    //     ): void {

    //     this.loadingSubject.next(true)

    //     this.contractService.getContracts(skip, take, id_wildcard, sortColumnName, sordOrder)
    //         .pipe(
    //             catchError(() => of([])),
    //             finalize(() => this.loadingSubject.next(false))
    //         )
    //         .subscribe(contracts => this.contractSubject.next(contracts))
    // }
    // getContactsCount(): number {return this.contactsCount}

    // loadContracts() {
    loadContracts(skip?: number, take?: number, id_wildcard?: string,
        sortColumnName?: string, sordOrder?: string,): void {

        //this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction);

        this.loadingSubject.next(true)
        this.contractService.getContracts(skip, take, id_wildcard, sortColumnName, sordOrder)
            .pipe(
                map((array: IContract[], index) => {
                    // console.log(array[0])
                    this.contactsCount = parseInt(array[0].contractValue, 10)
                    // this.length = this.contactsCount
                    // if (skip == 0 && index == 0)
                    if (skip == 0)
                        array.shift()
                    // array.splice(0,1)
                    return array;
                }),
                // tap((item)=> console.log(item)),
                map((array: IContract[]) => array.map((item: IContract) => ({
                    ...item,
                    // contractValue: `${item.currency} ${item.contractValue}`
                }))),
                //tap(console.log),
                catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err)
                    return throwError(err)
                }),
                //catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(contracts => {
                this.data = contracts



                // this.contractSubject.next(contracts)

                // setTimeout(_ => {
                //     // console.log('LoadContracts completed event fired')
                //     this.contractService.NotifyOfLoadContractsSubscriptionComplete()
                // }, 100)

                // this.dataSource.data = data;
                // this.dataSource.paginator = this.paginator;
            })
        //.subscribe(contracts => this.contractSubject.next(contracts))

    }

    updateContract(contractId: string, jsonPropertyValue?: Record<string, string>): void {
        if (contractId == undefined)
            return;

        this.loadingSubject.next(true)
        const contract = this.data.find(c => c.contractId == contractId)
        const contractProps = Object.getOwnPropertyNames(contract);

        for (const jsonProp in jsonPropertyValue) {
            // console.log(`name ${jsonProp} value ${jsonPropertyValue[jsonProp]}`)
            contractProps.forEach((contractProp) => {
                if (jsonProp == contractProp)
                    // console.log(`name: ${contractProp} value: ${contract[contractProp]}`);
                    contract[contractProp] = jsonPropertyValue[jsonProp]
            });
        }

        this.contractService.updateContract(contract)
            .pipe(
                //tap(console.log),
                catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err)
                    return throwError(err)
                }),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe()
    }

    // loadContracts(contractId: number,
    //     filter: string,
    //     sortDirection: string,
    //     pageIndex: number,
    //     pageSize: number) {

    //     this.loadingSubject.next(true)

    //     this.contractService.getContracts(contractId, filter, sortDirection, pageIndex, pageSize)
    //         .pipe(
    //             catchError(() => of([])),
    //             finalize(() => this.loadingSubject.next(false))
    //         )
    //         .subscribe(contract => this.contractSubject.next(contract))

    // }


    // connect(collectionViewer: CollectionViewer): Observable<IContract[]> {
    //     // console.log('Connecting data source')
    //     return this._data
    //         .asObservable()
    //         .pipe(
    //             // tap((item)=> console.log(item))
    //             map((contract: IContract[]) => contract.map((item: IContract) => ({
    //                 ...item,
    //                 contractValue: `${item.currency} ${item.contractValue}`
    //             })))
    //         )

    //     // return this._data.asObservable()
    //     // return this.contractSubject.asObservable()
    // }

    // disconnect(collectionViewer: CollectionViewer): void {
    //     // this.contractSubject.complete()
    //     this._data.complete()
    //     this.loadingSubject.complete()
    // }

}

