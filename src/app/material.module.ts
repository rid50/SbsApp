import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MdcTopAppBarModule} from '@angular-mdc/web/top-app-bar';
import {MdcDrawerModule} from '@angular-mdc/web/drawer';
import {MdcListModule} from '@angular-mdc/web/list';
import {MdcIconModule} from '@angular-mdc/web/icon';
import {MdcMenuModule} from '@angular-mdc/web/menu';
import {MdcTabBarModule} from '@angular-mdc/web/tab-bar';
//import {MdcTopAppBarActionItem} from "@angular-mdc/web/top-app-bar";

import { MaterialDrawerComponent } from './material-drawer/material-drawer.component';
import { AngularMdcDrawerComponent } from './angular-mdc-drawer/angular-mdc-drawer.component';

@NgModule({
  imports: [
    BrowserModule,
	MdcTopAppBarModule,
    MdcDrawerModule,
	MdcListModule,
	MdcIconModule,
	MdcMenuModule,
	MdcTabBarModule,
  ],
  exports: [
    AngularMdcDrawerComponent,
	MaterialDrawerComponent,
//	MdcTopAppBarModule,
//  MdcDrawerModule,
//	MdcListModule,
//	MdcIconModule,
//	MdcMenuModule,
//	MdcTabBarModule
  ],  
  declarations: [
    MaterialDrawerComponent,
    AngularMdcDrawerComponent,
  ]
})
export class MaterialModule {}