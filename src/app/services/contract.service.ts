/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, EventEmitter } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, finalize } from 'rxjs/operators'
import { IContract } from '../models/contract'
import { ContractDetail } from '../models/contract-detail'
import { PurchaseRequisition } from '../models/purchase-requisition'
import { BaseApiUrlService2 } from './BaseApiUrlService2'
import { BaseApiUrlService } from '../app.module'
//import { BaseApiUrlService } from './BaseApiUrlService'

//import * as $ from 'jquery';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//declare const $: any;

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

    // <img src="https://the_site/the_image" onerror="redirectToCertPage()">


    // get(url: string): void {
    //     $.ajax({
    //         method: 'GET',
    //         url: url,
    //         //async: true,
    //         //crossDomain: false,
    //         contentType: 'application/application/x-www-form-urlencoded',
    //         //dataType: 'json',
    //         // headers: {
    //         //     'Authorization': 'Token xxxprivatexxxxx'
    //         // },
    //         xhrFields: {
    //             withCredentials: true
    //         },            
    //         options: {
    //             useSSL: true
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             const dados = JSON.stringify(data);
    //             console.log(dados);
    //             //$("#IDDOCAMPO").val(data.AlgumaCoisa);
    //         },
    //         // error: function (xhr, status, error) {
    //         //     const data = $.getJSON(xhr.responseText);
    //         //     console.log(JSON.stringify(data));
    //         // }
    //     });
    // }

    // makeImageElement(url:string): void {
    //     const img = document.createElement('img');
    //     img.src = url
    //     img.onerror = (err) => {
    //         console.log('Ok: ' + JSON.stringify(err))
    //     }
    //     document.getElementById('body').appendChild(img);
    // }

    // isSSL(): void {this.makeImageElement(`${this.apiUrl.value}api/isSSL/`) }

    isSSL_ws(): void {
        if (this.apiUrl.value.indexOf('https://') === -1)
            return

        const url = this.apiUrl.value.replace('https://', 'wss://')
        const ws = new WebSocket(url + 'ws');
        //const ws = new WebSocket("ws://sbs-api.yaruss.co.uk/");

        ws.onopen = (event) => {
            ws.send('zz');
        };

        ws.onerror = (event) => {
            //console.error("WebSocket error observed:", event);
            ws.close()
            this.apiUrl.next(this.apiUrl.value.replace('https://', 'http://'))
        }

        ws.onmessage = (event) => {
            //console.log(event);
            ws.close()
        }
        
        // ws.onclose = function (e){
        //     if(ws.readyState == WebSocket.OPEN) {
        //         window.removeEventListener("unload", closeWebSocket);        
        //         //alert('connection closed');
        //     }
        // };

        // window.addEventListener("unload", closeWebSocket);

        // function closeWebSocket() {
        //     if(ws.readyState == WebSocket.OPEN) {
        //         ws.close();
        //     }
        // }
    }

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    getp(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('POST', url);
            req.setRequestHeader('Content-type', 'application/json;charset=utf-8');
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    alert(req.responseText);
                }
            }
            req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText))
            req.onerror = (e) => reject(Error(`Network Error: ${e}`))
            req.send('foo=bar&lorem=ipsum');
        });
    }

    isSSL_promise(): void {
        this.getp(`${this.apiUrl.value}api/isSSL/`)
        .then((data) => {
            console.log('Ok: ' + JSON.stringify(data))
        })
        .catch((err) => {
            console.log('Err: ' + JSON.stringify(err))
        });
    }

    isSSL(): Observable<never> {
        return this.http.get<never>(`${this.apiUrl.value}api/IsSSL/`)
        // .pipe(
        //    catchError(error => {
        //     console.log('IsSSL (HttpErrorResponse): ' + (error instanceof HttpErrorResponse));               
        //         // console.log('Handling error locally and rethrowing it...', err)
        //         return throwError(error)
        //     }),            
        // )        
    }

    findContractById(contractId: number): Observable<IContract> {
        return this.http.get<IContract>(`${this.apiUrl.value}api/contract/${contractId}`)
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
