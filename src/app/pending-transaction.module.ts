import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkAccordionModule } from '@angular/cdk/accordion'; 
import { ScrollingModule } from '@angular/cdk/scrolling'; 

import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';
import { ContractAccordionComponent } from './contract-accordion/contract-accordion.component';
import { PurchaseRequisitionComponent } from './purchase-requisition/purchase-requisition.component';
import { PendingPurchaseRequisitionComponent } from './pending-purchase-requisition/pending-purchase-requisition.component';
import { PendingPurchaseRequisitionDetailComponent } from './pending-purchase-requisition-detail/pending-purchase-requisition-detail.component';

import { MaterialModule2 } from './material2.module';

@NgModule({
  declarations: [
    PendingTransactionComponent,
    ContractAccordionComponent,
    PurchaseRequisitionComponent,
    PendingPurchaseRequisitionComponent,
    PendingPurchaseRequisitionDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule2,
    CdkAccordionModule,
    ScrollingModule,
  ],
})
export class PendingTransactionModule { }
