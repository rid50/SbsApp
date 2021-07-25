import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

// import {MdcTopAppBarModule} from '@angular-mdc/web/top-app-bar';
// import {MdcDrawerModule} from '@angular-mdc/web/drawer';
// import {MdcListModule} from '@angular-mdc/web/list';
// import {MdcIconModule} from '@angular-mdc/web/icon';
// import {MdcMenuModule} from '@angular-mdc/web/menu';
// import {MdcTabBarModule} from '@angular-mdc/web/tab-bar';
// import {MdcTypographyModule} from '@angular-mdc/web/typography';
// import {MdcTopAppBarActionItem} from "@angular-mdc/web/top-app-bar";

import {ContractModule} from './contract.module';

//import { ContractComponent } from './contract/contract.component';

import { MaterialDrawerComponent } from './material-drawer/material-drawer.component';

//import { AngularMdcDrawerComponent } from './angular-mdc-drawer/angular-mdc-drawer.component';

// import { LOCALE_ID } from '@angular/core';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { environment } from '../environments/environment';

const materialModules = [
  // MdcTopAppBarModule,
  // MdcDrawerModule,
  // MdcListModule,
  // MdcIconModule,
  // MdcMenuModule,
  // MdcTabBarModule,
  // MdcTypographyModule
]

@NgModule({
  declarations: [
    MaterialDrawerComponent,
	//ContractComponent,
  ],  
  imports: [
    CommonModule,
    FlexLayoutModule,
    ContractModule,
    ...materialModules
  ],
  exports: [
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
  //   {provide: 'BASE_API_URL', useValue: environment.apiUrl},
  //   {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
  //   {provide: MAT_DATE_LOCALE, useValue: 'ru'},
  //   {provide: LOCALE_ID, useValue: 'ru'},    
  //   // {provide: DateAdapter, useClass: MomentDateAdapter,
  //   //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   // },
  //   //ContractService,
  //   //ContractResolver
  // ],  
})
export class MaterialModule {}