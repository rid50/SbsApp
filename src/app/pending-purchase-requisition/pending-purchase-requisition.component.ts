/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { PurchaseRequisition } from '../models/purchase-requisition';
// import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-pending-purchase-requisition',
  templateUrl: './pending-purchase-requisition.component.html',
  styleUrls: ['./pending-purchase-requisition.component.scss']
})
export class PendingPurchaseRequisitionComponent implements OnInit {

  @Input() pr: PurchaseRequisition;
  
  constructor() { }

  ngOnInit(): void {
  }

}
