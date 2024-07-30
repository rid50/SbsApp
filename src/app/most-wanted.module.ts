import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostWantedComponent } from './most-wanted/most-wanted.component';
import { CriminalListComponent } from './criminal-list/criminal-list.component';
import { BiometricsComponent } from './biometrics/biometrics.component';
// import { PendingPurchaseRequisitionComponent } from './pending-purchase-requisition/pending-purchase-requisition.component';

import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    MostWantedComponent,
    CriminalListComponent,
    BiometricsComponent,
    // PendingPurchaseRequisitionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    //MaterialModule2,
  ],  
})
export class MostWantedModule { }
