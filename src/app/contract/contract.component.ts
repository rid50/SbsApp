import {Component, ElementRef, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {merge, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {Contract} from '../models/contract';
import {ContractService} from '../services/contract.service';
import {ContractDataSource} from '../services/contract.datasource';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  contract: Contract;

    dataSource: ContractDataSource;

    displayedColumns = ['id', 'contractName', 'dateEntry', 'contractValue', 'currency'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,
                private contractService: ContractService) {

    }

    ngOnInit() {
        const contracts$ = this.contractService.findAllContracts();
    }

    // ngAfterViewInit() {
        // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        // fromEvent(this.input.nativeElement,'keyup')
            // .pipe(
                // debounceTime(150),
                // distinctUntilChanged(),
                // tap(() => {
                    // this.paginator.pageIndex = 0;

                    // this.loadContractsPage();
                // })
            // )
            // .subscribe();

        // merge(this.sort.sortChange, this.paginator.page)
        // .pipe(
            // tap(() => this.loadContractsPage())
        // )
        // .subscribe();

    // }
	
    // loadContractsPage() {
        // this.dataSource.loadContracts(
            // this.contract.id,
            // this.input.nativeElement.value,
            // this.sort.direction,
            // this.paginator.pageIndex,
            // this.paginator.pageSize);
    // }
}

