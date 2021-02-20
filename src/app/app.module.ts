import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

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

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    ContractComponent,
    ContractDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
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
  // both the NativeDateAdapter and MomentDateAdapter allow ISO 8601 strings to be passed to the datepicker and automatically converted to the proper object type  
  providers: [
    {provide: 'BASE_API_URL', useValue: environment.apiUrl},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: LOCALE_ID, useValue: 'ru-RU'},    
    // {provide: DateAdapter, useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },
    ContractService,
    ContractResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
