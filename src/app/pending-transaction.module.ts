import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkAccordionModule } from '@angular/cdk/accordion'; 
import { ScrollingModule } from '@angular/cdk/scrolling'; 

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';
import { ContractAccordionComponent } from './contract-accordion/contract-accordion.component';
import { PurchaseRequisitionComponent } from './purchase-requisition/purchase-requisition.component';
import { PendingPurchaseRequisitionComponent } from './pending-purchase-requisition/pending-purchase-requisition.component';
import { PendingPurchaseRequisitionDetailComponent } from './pending-purchase-requisition-detail/pending-purchase-requisition-detail.component';



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
    FlexLayoutModule,
    CdkAccordionModule,
    ScrollingModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    // ContractAccordionComponent
    //BrowserModule,

    // ContractListComponent,
    //ContractDetailListComponent,
    //ContractFormEntryComponent,

    //MatTabsModule,
    //MatToolbarModule,
    //MatSidenavModule
  ],  
})
export class PendingTransactionModule { }
