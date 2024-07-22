import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';

//import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core'; 

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const materialModules = [
  MatProgressSpinnerModule,
  FlexLayoutModule,

  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSortModule,
  MatTableModule,
  MatButtonModule,
  MatRippleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  //MomentDateAdapter,
  MatMomentDateModule,
  
  
]

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
      ...materialModules
  ]
})
export class MaterialModule2 {}