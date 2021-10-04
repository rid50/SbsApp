import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card'; 

import { MostWantedComponent } from './most-wanted/most-wanted.component';
import { CriminalListComponent } from './criminal-list/criminal-list.component';
import { BiometricsComponent } from './biometrics/biometrics.component';
// import { PendingPurchaseRequisitionComponent } from './pending-purchase-requisition/pending-purchase-requisition.component';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    MostWantedComponent,
    CriminalListComponent,
    BiometricsComponent,
    // PendingPurchaseRequisitionComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    //MatFormFieldModule,
    //MatInputModule,

  ]
})
export class MostWantedModule { }
