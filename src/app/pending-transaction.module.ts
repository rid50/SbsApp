import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkAccordionModule } from '@angular/cdk/accordion'; 

import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';
import { ContractAccordionComponent } from './contract-accordion/contract-accordion.component';



@NgModule({
  declarations: [
    PendingTransactionComponent,
    ContractAccordionComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CdkAccordionModule
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
