import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { MatDatepickerModule } from '@angular/material/datepicker';

// import { LOCALE_ID } from '@angular/core';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

//import { ContractService } from './services/contract.service';
//import { ContractResolver } from './services/contract.resolver';

//import { FormsModule, ReactiveFormsModule} from '@angular/forms';

//import { environment } from '../environments/environment';

import { ContractModule } from './contract.module';
import { MaterialModule } from './material.module';

//registerLocaleData(localeRu, 'RU');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //MatDatepickerModule,
    //MatNativeDateModule,
    //FormsModule,
    ContractModule,
    //MaterialModule,
  ],
  exports: [
    //FormsModule,  
	//ReactiveFormsModule
    //BrowserModule,
    //ContractComponent,
    //MatTabsModule,
    //MatToolbarModule,
    //MatSidenavModule
  ],
  // both the NativeDateAdapter and MomentDateAdapter allow ISO 8601 strings to be passed to the datepicker and automatically converted to the proper object type  
  // providers: [
  //   MatDatepickerModule, 
  //   {provide: 'BASE_API_URL', useValue: environment.apiUrl},
  //   {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
  //   {provide: MAT_DATE_LOCALE, useValue: 'ru'},
  //   {provide: LOCALE_ID, useValue: 'ru'},    
  //   // {provide: DateAdapter, useClass: MomentDateAdapter,
  //   //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   // },
  //   ContractService,
  //   //ContractResolver
  // ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
