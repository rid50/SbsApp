import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

//import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
//import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
//import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
//import { MatInputModule as MatInputModule } from '@angular/material/input';

//import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

//import { MatDatepickerModule } from '@angular/material/datepicker';
//import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';

//import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

// import {MdcTopAppBarModule} from '@angular-mdc/web/top-app-bar';
// import {MdcDrawerModule} from '@angular-mdc/web/drawer';
// import {MdcListModule} from '@angular-mdc/web/list';
// import {MdcIconModule} from '@angular-mdc/web/icon';
// import {MdcMenuModule} from '@angular-mdc/web/menu';
// import {MdcTabBarModule} from '@angular-mdc/web/tab-bar';
// import {MdcTypographyModule} from '@angular-mdc/web/typography';
// import {MdcTopAppBarActionItem} from "@angular-mdc/web/top-app-bar";

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


import {ContractModule} from './contract.module';

//import { ContractComponent } from './contract/contract.component';

import { MaterialDrawerComponent } from './material-drawer/material-drawer.component';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppRoutingModule } from './app-routing.module';
import { PendingTransactionModule } from './pending-transaction.module';
import { MostWantedModule } from './most-wanted.module';
//import { AngularMdcDrawerComponent } from './angular-mdc-drawer/angular-mdc-drawer.component';

// import { LOCALE_ID } from '@angular/core';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { environment } from '../environments/environment';
// export const APP_DATE_FORMATS =
// {
//    parse: {
//        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
//    },
//    display: {
//        dateInput: 'input',
//        monthYearLabel: 'inputMonth',
//        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//        monthYearA11yLabel: {year: 'numeric', month: 'long'},
//    }
// }

const materialModules = [
  // MdcTopAppBarModule,
  // MdcDrawerModule,
  // MdcListModule,
  // MdcIconModule,
  // MdcMenuModule,
  // MdcTabBarModule,
  // MdcTypographyModule

  // MatFormFieldModule,
  // MatInputModule,
  MatMenuModule,
  MatIconModule,
  // MatDatepickerModule,
  // MatNativeDateModule,
  // MatMomentDateModule  
]

@NgModule({
  declarations: [
    MaterialDrawerComponent,      // <router-outlet/>
	
    //ContractComponent,
  ],  
  imports: [
    AppRoutingModule,    
    CommonModule,
    FlexLayoutModule,
    
    
    //ContractModule,
    //PendingTransactionModule,
    //MostWantedModule,
    ...materialModules
  ],
  exports: [
    MaterialDrawerComponent,
    //ContractModule,
    PendingTransactionModule,
    MostWantedModule,
  
    //...materialModules
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    // FlexLayoutModule
    //MaterialDrawerComponent,
    //ContractComponent,
//	MdcTopAppBarModule,
//  MdcDrawerModule,
//	MdcListModule,
//	MdcIconModule,
//	MdcMenuModule,
//	MdcTabBarModule
  ],
  // providers: [
  //   // MatDatepickerModule,
  //   // {provide: DateAdapter, useClass: NativeDateAdapter},
  //   {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  //   // {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  // //   {provide: 'BASE_API_URL', useValue: environment.apiUrl},
  //   {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
  //   // {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
  //   {provide: MAT_DATE_LOCALE, useValue: 'ru'},
  // //   {provide: LOCALE_ID, useValue: 'ru'},    
  //   {provide: DateAdapter, useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },
  // //   //ContractService,
  // //   //ContractResolver
  // ],  
})
export class MaterialModule {}