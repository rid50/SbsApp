import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';

//import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { MatTableDataSource } from '@angular/material/table';

import { Contract } from '../models/contract';
import { ContractService } from '../services/contract.service';
import { ContractDataSource } from '../services/contract.datasource';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
    contract: Contract;

    dataSource: ContractDataSource;

    displayedColumns = ['contractId', 'contractName', 'dateEntry', 'contractValue', 'currency'];

    //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute, private contractService: ContractService) {
    }

    ngOnInit(): void {
        //this.contract = this.route.snapshot.data["contact"];
        this.dataSource = new ContractDataSource(this.contractService);

        this.dataSource.loadContracts()

        //this.dataSource.sort = this.sort;

        // const contracts$ = this.contractService.findAllContracts()
        // // .pipe(tap (x => {
        // //     let y = x;
        // //     console.log(x)
        // // }))
        // .subscribe(
        //     // res => console.log('HTTP response', res),
        //     // err => console.log('HTTP Error', err),
        //     // () => console.log('HTTP request completed.')
        // );
    }

    ngAfterViewInit(): void {
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.sort.sortChange.subscribe(() => {})

        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    //this.paginator.pageIndex = 0;

                    this.loadContracts();
                })
            )
            .subscribe();

        //merge(this.sort.sortChange, this.paginator.page)
        //merge(this.sort.sortChange)
        this.sort.sortChange            
            .pipe(
                //tap((x) => console.log(x)),
                //tap(() => this.dataSource.loadContracts(null, '', '')),
                tap(() => this.loadContracts())                
            )
            .subscribe();

    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    loadContracts() {
        this.dataSource.loadContracts(this.input.nativeElement.value, this.sort.active, this.sort.direction);
    }

    // applyFilter(event: Event): void {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     //this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    onRowClicked(row: unknown): void {
        console.log('Row clicked: ', row);
    }    
}

