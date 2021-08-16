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

    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // return this.http.post('your_url', this.body, { headers, responseType: 'text' })
    //   .subscribe(data => console.log(data));

    // console.log('createProduct ' + JSON.stringify(product));
    // return this.request('post', `${baseUrl}/product`, product);

    // findAllCourseLessons(courseId:number): Observable<Lesson[]> {
    // return this.http.get('${this.apiUrl}/api/lessons', {
    // params: new HttpParams()
    // .set('courseId', courseId.toString())
    // .set('pageNumber', "0")
    // .set('pageSize', "1000")
    // }).pipe(
    // map(res =>  res["payload"])
    // );
    // }

    // getContracts(
    //     contractId: number, filter = '', sortOrder = 'asc',
    //     pageNumber = 0, pageSize = 3): Observable<Contract[]> {

    //     return this.http.get<Contract[]>('${this.apiUrl}api/contract', {
    //         params: new HttpParams()
    //             .set('contractId', contractId.toString())
    //             .set('filter', filter)
    //             .set('sortOrder', sortOrder)
    //             .set('pageNumber', pageNumber.toString())
    //             .set('pageSize', pageSize.toString())
    //     })
    // .pipe(
    //     // tslint:disable-next-line: no-string-literal
    //     map(res =>  res['payload'])
    // )
    //}

}
