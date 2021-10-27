/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, finalize } from 'rxjs/operators'
import { IContract } from '../models/contract'
import { ContractDetail } from '../models/contract-detail'
import { PurchaseRequisition } from '../models/purchase-requisition'
import { BaseApiUrlService2 } from './BaseApiUrlService2'
import { BaseApiUrlService } from '../app.module'
//import { BaseApiUrlService } from './BaseApiUrlService'

@Injectable()
export class ContractService {

    // contract: IContract;

    // apiUrl: string

    RenderRows = new EventEmitter();

    // LoadContractsSubscriptionCompleteEvent = new EventEmitter();
    purchaseRequisitionSelectionEvent = new EventEmitter()

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
            //   Authorization: 'my-auth-token'
        })
    };

    //constructor(private http: HttpClient, private apiUrl: BaseApiUrlService) { }
    constructor(private http: HttpClient, @Inject(BaseApiUrlService) private apiUrl: BehaviorSubject<string>) { }
    //constructor(private http: HttpClient, @Inject('BASE_API_URL') private apiUrl: string) { }      
    // constructor(private http: HttpClient, @Inject(BaseApiUrlService) public baseApiUrlService: BaseApiUrlService) {
    //     this.apiUrl = baseApiUrlService.baseApiUrl
    // }

    RefreshTable(): void {
        this.RenderRows.emit();
    }

    // Notify ContractDetailList and ContractFormEntry components via 
    // ContractList's contractId and contract properties
    // NotifyOfLoadContractsSubscriptionComplete(): void {
    //     this.LoadContractsSubscriptionCompleteEvent.emit();
    // }

    NotifyOfPurchaseRequisitionSelection(pr: PurchaseRequisition): void {
        this.purchaseRequisitionSelectionEvent.emit(pr);
    }

    // setContract (contract: IContract) : void {
    //     // contract.contractValue = contract.contractValue.split(' ')[1]
    //     this.contract = contract;
    //     // this.contract.currency = contract.currency.split(' ')[0]
    // }

    // getContract (): IContract {
    //     return this.contract;
    // }

    findContractById(contractId: number): Observable<IContract> {
        return this.http.get<IContract>(`${this.apiUrl.value}/api/contract/${contractId}`)
    }
    //t?id=&sortColumnName=contractid&sortOrder=desc

    // findAllContracts(): Observable<any> {
    //     return this.http.get(`${this.apiUrl}/api/courses`)
    //         .pipe(
    //             map(res => res['payload']),
    //             catchError(err => {
    //                 console.log('Handling error locally and rethrowing it...', err);
    //                 return throwError(err);
    //             }),
    //             finalize(() => console.log("first finalize() block executed")),
    //             catchError(err => {
    //                 console.log('caught rethrown error, providing fallback value');
    //                 return of([]);
    //             }),
    //             finalize(() => console.log("second finalize() block executed"))
    //         );
    // }

    getContracts(skip = 0, take = 0, id_wildcard = '', sortColumnName = '', sordOrder = '',
    ): Observable<IContract[]> {

        return this.http.get<IContract[]>
            (`${this.apiUrl.value}api/contract?id=${id_wildcard}&sort=${sortColumnName}&order=${sordOrder}&skip=${skip}&take=${take}`)
        // .pipe(
        //    catchError(err => {
        //         console.log('Handling error locally and rethrowing it...', err)
        //         return throwError(err)
        //     }),            
        // )
    }

    getContractDetails(id_wildcard = ''): Observable<ContractDetail[]> {
        return this.http.get<ContractDetail[]>
            (`${this.apiUrl.value}api/contractDetail?id=${id_wildcard}`)
        // .pipe(
        //    catchError(err => {
        //         console.log('Handling error locally and rethrowing it...', err)
        //         return throwError(err)
        //     }),            
        // )
    }

    updateContract(contract: IContract): Observable<IContract> {
        return this.http.put<IContract>
            (`${this.apiUrl.value}api/contract`, contract)
        // .pipe(
        //    catchError(err => {
        //         console.log('Handling error locally and rethrowing it...', err)
        //         return throwError(err)
        //     }),            
        // )
    }

    getPurchaseRequisition(): Observable<PurchaseRequisition[]> {
        return this.http.get<PurchaseRequisition[]>
            (`${this.apiUrl.value}api/pendingTransactions`)
    }

    getPendingPRDetails(id_wildcard = ''): Observable<PurchaseRequisition[]> {
        id_wildcard = encodeURIComponent(id_wildcard);
        return this.http.get<PurchaseRequisition[]>
            (`${this.apiUrl.value}api/pendingTransactions/ById?contract_id=${id_wildcard}`)
    }

    onDestroy(): void {
        this.purchaseRequisitionSelectionEvent.complete()
        // console.log('Contract details onDestroy')
    }

}
