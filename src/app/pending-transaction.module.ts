import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkAccordionModule } from '@angular/cdk/accordion'; 
import { ScrollingModule } from '@angular/cdk/scrolling'; 

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';
import { ContractAccordionComponent } from './contract-accordion/contract-accordion.component';
import { PurchaseRequisitionComponent } from './purchase-requisition/purchase-requisition.component';



@NgModule({
  declarations: [
    PendingTransactionComponent,
    ContractAccordionComponent,
    PurchaseRequisitionComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CdkAccordionModule,
    ScrollingModule,
    MatTableModule,
    MatSortModule
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
