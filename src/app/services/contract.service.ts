/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable, Inject} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable, of, throwError} from 'rxjs'
import {catchError, map, finalize} from 'rxjs/operators'
import {Contract} from '../models/contract'

@Injectable()
export class ContractService {

    constructor(private http: HttpClient, @Inject('BASE_API_URL') private apiUrl: string) {}

    findContractById (contractId: number): Observable<Contract> {
        return this.http.get<Contract>(`${this.apiUrl}/api/contract/${contractId}`)
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

    getContracts(id_wildcard = '', sortColumnName = '', sordOrder = '', 
        skip = 0, take = 0): Observable<Contract[]> {

            return this.http.get<Contract[]>
                (`${this.apiUrl}api/contract?id=${id_wildcard}&sort=${sortColumnName}&order=${sordOrder}&skip=${skip}&take=${take}`)
            // .pipe(
            //    catchError(err => {
            //         console.log('Handling error locally and rethrowing it...', err)
            //         return throwError(err)
            //     }),            
            // )
    }

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
