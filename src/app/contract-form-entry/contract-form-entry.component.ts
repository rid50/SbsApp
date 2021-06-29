/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input } from '@angular/core';

import { DataSource } from '@angular/cdk/collections'

import { ComponentCommunicationService } from '../services/component-communication.service'
import { Contract } from '../models/contract'

@Component({
  selector: 'app-contract-form-entry',
  templateUrl: './contract-form-entry.component.html',
  styleUrls: ['./contract-form-entry.component.scss']
})
export class ContractFormEntryComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //@Input() id!: any;
  //@Input('dataSource') dataSource: DataSource<Contract>;

  constructor(componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit(): void {
  }

}
