import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, catchError, finalize} from 'rxjs/operators';
import {Contract} from '../models/contract';

@Injectable()
export class ContractService {

    constructor(private http: HttpClient, @Inject('BASE_API_URL') private apiUrl: string) {}
    findContractById(contractId: number): Observable<Contract> {
        return this.http.get<Contract>(`${this.apiUrl}/api/contract/${contractId}`);
    }

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

    findAllContracts(): Observable<Contract[]> {
        console.log( `AAAAAAAA: ${this.apiUrl}`)
        return this.http.get<Contract[]>(`${this.apiUrl}api/contract`)
            .pipe(
               catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err);
                    return throwError(err);
                }),            
            );
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

    findContracts(
        contractId: number, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3): Observable<Contract[]> {

        return this.http.get('${this.apiUrl}api/contract', {
            params: new HttpParams()
                .set('contractId', contractId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            // tslint:disable-next-line: no-string-literal
            map(res =>  res['payload'])
        );
    }

}
