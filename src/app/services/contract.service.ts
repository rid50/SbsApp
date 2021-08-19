/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, finalize } from 'rxjs/operators'
import { IContract } from '../models/contract'
import { ContractDetail } from '../models/contract-detail'

@Injectable()
export class ContractService {

    contract: IContract;
    
    LoadContractsSubscriptionCompleteEvent = new EventEmitter();
    
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        //   Authorization: 'my-auth-token'
        })
      };

    constructor(private http: HttpClient, @Inject('BASE_API_URL') private apiUrl: string) { }

    // Notify ContractDetailList and ContractFormEntry components via 
    // ContractList's contractId and contract properties
    NotifyOfLoadContractsSubscriptionComplete(): void {
        this.LoadContractsSubscriptionCompleteEvent.emit();
    }


    setContract (contract: IContract) : void {
        // contract.contractValue = contract.contractValue.split(' ')[1]
        this.contract = contract;
        // this.contract.currency = contract.currency.split(' ')[0]
    }

    getContract (): IContract {
        return this.contract;
    }

    findContractById(contractId: number): Observable<IContract> {
        return this.http.get<IContract>(`${this.apiUrl}/api/contract/${contractId}`)
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
            (`${this.apiUrl}api/contract?id=${id_wildcard}&sort=${sortColumnName}&order=${sordOrder}&skip=${skip}&take=${take}`)
        // .pipe(
        //    catchError(err => {
        //         console.log('Handling error locally and rethrowing it...', err)
        //         return throwError(err)
        //     }),            
        // )
    }

    getContractDetails(id_wildcard = ''): Observable<ContractDetail[]> {
        return this.http.get<ContractDetail[]>
            (`${this.apiUrl}api/contractDetail?id=${id_wildcard}`)
        // .pipe(
        //    catchError(err => {
        //         console.log('Handling error locally and rethrowing it...', err)
        //         return throwError(err)
        //     }),            
        // )
    }

    updateContract(contract: IContract): Observable<IContract> {
        return this.http.put<IContract>
            (`${this.apiUrl}api/contract`, contract)
        // .pipe(
        //    catchError(err => {
        //         console.log('Handling error locally and rethrowing it...', err)
        //         return throwError(err)
        //     }),            
        // )
    }

    onDestroy(): void {
        this.LoadContractsSubscriptionCompleteEvent.complete()
        // console.log('Contract details onDestroy')
    }

}
