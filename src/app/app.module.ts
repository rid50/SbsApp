import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
//import { registerLocaleData } from '@angular/common';
//import localeRu from '@angular/common/locales/ru';
import '@angular/common/locales/global/ru';
import '@angular/common/locales/global/fr';

import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
//npm i @angular/material-moment-adapter
//npm i moment
import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'; 

import { environment } from '../environments/environment';
import { ContractComponent } from './contract/contract.component';
import { ContractService } from './services/contract.service';
import { ContractResolver } from './services/contract.resolver';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

//registerLocaleData(localeRu, 'RU');

@NgModule({
  declarations: [
    AppComponent,
    ContractComponent,
    ContractDetailComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
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
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  // both the NativeDateAdapter and MomentDateAdapter allow ISO 8601 strings to be passed to the datepicker and automatically converted to the proper object type  
  providers: [
    {provide: 'BASE_API_URL', useValue: environment.apiUrl},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {provide: LOCALE_ID, useValue: 'ru'},    
    // {provide: DateAdapter, useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },
    ContractService,
    ContractResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
