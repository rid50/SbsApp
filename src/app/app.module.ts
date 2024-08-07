import { ErrorHandler, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'; 
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ToastrModule } from 'ngx-toastr';

import { HttpInterceptorService } from './services/HttpInterceptorService';
import { ErrorHandlerService } from './services/ErrorHandlerService';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
/*
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { LOCALE_ID } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { ContractService } from './services/contract.service';
import { ContractResolver } from './services/contract.resolver';
*/
//import { FormsModule, ReactiveFormsModule} from '@angular/forms';

//import { environment } from '../environments/environment';

//import { ContractModule } from './contract.module';
import { MaterialModule } from './material.module';
//import { BaseApiUrlService } from './services/BaseApiUrlService';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ContractService } from './services/contract.service';
import { LoadingDialogService } from './services/loading-dialog.service';

import { DatabaseSchemaComponent } from './database-schema/database-schema.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { ErrorDialogService } from './services/error-dialog.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

//import { BaseApiUrlService2 } from './services/BaseApiUrlService2';

//registerLocaleData(localeRu, 'RU');

export const BaseApiUrlService = new InjectionToken<string>('BaseApiUrlService')

@NgModule({
  declarations: [
    AppComponent,
    DatabaseSchemaComponent,
    LoadingDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //FlexLayoutModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    //MatDatepickerModule,
    //MatNativeDateModule,
    //FormsModule,
    //ContractModule,
    MaterialModule,
  ],
  exports: [
    // FlexLayoutModule
    //FormsModule,  
    //ReactiveFormsModule,
    //BrowserModule,
    //ContractComponent,
    //MatTabsModule,
    //MatToolbarModule,
    //MatSidenavModule
  ],
  //both the NativeDateAdapter and MomentDateAdapter allow ISO 8601 strings to be passed to the datepicker and automatically converted to the proper object type  
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    { provide: BaseApiUrlService, useValue: new BehaviorSubject(environment.apiUrl)},
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    LoadingDialogService,
    ErrorDialogService
    //BaseApiUrlService2,
    //MatDatepickerModule, 
    //{provide: 'BASE_API_URL', useValue: environment.apiUrl},
    //{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    //{provide: MAT_DATE_LOCALE, useValue: 'ru'},
    //{provide: LOCALE_ID, useValue: 'ru'},    
    // // {provide: DateAdapter, useClass: MomentDateAdapter,
    // //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // // },
    //ContractService,
    //ContractResolver
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
