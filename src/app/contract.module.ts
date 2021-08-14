import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
//import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';

import { LOCALE_ID } from '@angular/core';
//import { registerLocaleData } from '@angular/common';
//import localeRu from '@angular/common/locales/ru';
import '@angular/common/locales/global/ru';
import '@angular/common/locales/global/fr';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core'; 

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//npm i @angular/material-moment-adapter
//npm i moment
import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'; 

import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailListComponent } from './contract-detail-list/contract-detail-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractFormEntryComponent } from './contract-form-entry/contract-form-entry.component';

import { ContractService } from './services/contract.service';
import { ContractResolver } from './services/contract.resolver';
import { ComponentCommunicationService } from './services/component-communication.service';

//import { HeaderComponent } from './navigation/header/header.component';
//import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

//import { MaterialModule } from './material.module';

//registerLocaleData(localeRu, 'RU');

const globalRippleConfig: RippleGlobalOptions = {
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

const DateFormat = {
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    ContractListComponent,
    ContractDetailListComponent,
    ContractDetailComponent,
    ContractFormEntryComponent,
    //HeaderComponent,
    //SidenavListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  
    //FlexLayoutModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    //BrowserModule,
    ContractListComponent,
    ContractDetailListComponent,
    ContractFormEntryComponent,
    //MatTabsModule,
    //MatToolbarModule,
    //MatSidenavModule
  ],
  // both the NativeDateAdapter and MomentDateAdapter allow ISO 8601 strings to be passed to the datepicker and automatically converted to the proper object type  
  providers: [
    MatDatepickerModule,
    {provide: 'BASE_API_URL', useValue: environment.apiUrl},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MAT_DATE_FORMATS, useValue: DateFormat},
    {provide: LOCALE_ID, useValue: 'ru'},
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig},  
    // {provide: DateAdapter, useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },
    ComponentCommunicationService,
    ContractService,
    ContractResolver
  ],
})
export class ContractModule { }
