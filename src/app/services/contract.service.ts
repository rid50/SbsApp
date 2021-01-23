import {Injectable, Inject} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Contract} from "../models/contract";

@Injectable()
export class ContractService {

    //constructor(private http:HttpClient) {}
    constructor(private http:HttpClient, @Inject('BASE_API_URL') private apiUrl:string) {}
    findContractById(contractId: number): Observable<Contract> {
        return this.http.get<Contract>(`${this.apiUrl}/api/contracts/${contractId}`);
    }

    findAllContracts(): Observable<Contract[]> {
		//console.log( `AAAAAAAA: ${this.apiUrl}`)
        return this.http.get('${this.baseUrl}/api/contracts')
            .pipe(
                map(res => res['payload'])
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
        contractId:number, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<Contract[]> {

        return this.http.get('${this.apiUrl}api/contracts', {
            params: new HttpParams()
                .set('contractId', contractId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

}