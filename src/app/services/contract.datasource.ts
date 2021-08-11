import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { Component } from '@angular/core'
import { EventEmitter, Output } from '@angular/core'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
import { IContract } from '../models/contract'
import { ContractService } from './contract.service'

// @Component({
//     template: ''
// })
export class ContractDataSource implements DataSource<IContract> {

    // @Output() loadContractsSubscriptionCompleteEvent = new EventEmitter<boolean>();


    contactsCount = 0;

    private contractSubject = new BehaviorSubject<IContract[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private contractService: ContractService) { }


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
    loadContracts(skip?:number, take?:number, id_wildcard?: string, 
        sortColumnName?: string, sordOrder?:string, ): void {

        //this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction);

        this.loadingSubject.next(true)
        this.contractService.getContracts(skip, take, id_wildcard, sortColumnName, sordOrder)
            .pipe(
                map((array: IContract[], index) => {
                    // console.log(array[0])
                    this.contactsCount = parseInt(array[0].contractValue, 10)
                    // this.length = this.contactsCount
                    if (skip == 0 && index == 0)
                        array.shift()
                    // array.splice(0,1)
                    return array;
                }),
                map((array: IContract[]) => array.map((item: IContract) => ({
                    ...item,
                    contractValue: `${item.currency} ${item.contractValue}`
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
                this.contractSubject.next(contracts)
                setTimeout(_=>{
                    this.contractService.NotifyOfLoadContractsSubscriptionComplete()
                }, 100)

                // this.dataSource.data = data;
                // this.dataSource.paginator = this.paginator;
            })
        //.subscribe(contracts => this.contractSubject.next(contracts))

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


    connect(collectionViewer: CollectionViewer): Observable<IContract[]> {
        // console.log('Connecting data source')
        return this.contractSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.contractSubject.complete()
        this.loadingSubject.complete()
    }

}

