import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PurchaseRequisition } from '../models/purchase-requisition';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrls: ['./pending-transaction.component.scss']
})
export class PendingTransactionComponent implements OnInit {
  pr: PurchaseRequisition
  contractId: string

  constructor(private contractService: ContractService) {}
  
  ngOnInit(): void {
    this.contractService.purchaseRequisitionSelectionEvent.subscribe((event: PurchaseRequisition) => {
      // console.log(event)
      this.pr = event
      this.contractId = this.pr.contractId
    }) 
  }

  // onRecordSelected($event: PurchaseRequisition): void {
  //   this.pr = $event
  //   console.log($event)
  // }
}
