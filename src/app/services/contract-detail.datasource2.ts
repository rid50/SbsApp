import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {IContract} from '../models/contract';
import {ContractService} from './contract.service';

export class ContractDetailDataSource2 implements DataSource<IContract> {

    private contractSubject = new BehaviorSubject<IContract[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private contractService: ContractService) {

    }

    // loadContracts(contractId:number,
    //             filter:string,
    //             sortDirection:string,
    //             pageIndex:number,
    //             pageSize:number) {

    //     this.loadingSubject.next(true);

    //     this.contractService.findContracts(contractId, filter, sortDirection,
    //         pageIndex, pageSize).pipe(
    //             catchError(() => of([])),
    //             finalize(() => this.loadingSubject.next(false))
    //         )
    //         .subscribe(contract => this.contractSubject.next(contract));

    // }

    connect(collectionViewer: CollectionViewer): Observable<IContract[]> {
        console.log('Connecting data source');
        return this.contractSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.contractSubject.complete();
        this.loadingSubject.complete();
    }

}

