import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule, PlatformLocation } from '@angular/common';
import { FormsModule} from '@angular/forms';

//import { MaterialModule2 } from './material2.module';

// import { AppModule } from './app.module';

import { environment } from '../environments/environment';

import { LOCALE_ID } from '@angular/core';
//import { registerLocaleData } from '@angular/common';
//import localeRu from '@angular/common/locales/ru';
import '@angular/common/locales/global/ru';
import '@angular/common/locales/global/fr';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule as MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';

import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule as MatTableModule } from '@angular/material/table';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core'; 

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//npm i @angular/material-moment-adapter
//npm i moment
import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'; 

import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailListComponent } from './contract-detail-list/contract-detail-list.component';
// import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractFormEntryComponent } from './contract-form-entry/contract-form-entry.component';

import { ContractService } from './services/contract.service';
import { ContractResolver } from './services/contract.resolver';
// import { ComponentCommunicationService } from './services/component-communication.service';
import { ContractDataSource } from './services/contract.datasource';
import { LocaleService } from './services/localeService.service';

import { MyDateFormatPipe } from './services/date-format-pipe.service'
import { AppModule } from './app.module';
//import { BaseApiUrlService } from './services/BaseApiUrlService';
//import { HeaderComponent } from './navigation/header/header.component';
//import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

//import { MaterialModule } from './material.module';

//registerLocaleData(localeRu, 'RU');

import { MaterialModule } from './material.module';

const globalRippleConfig: RippleGlobalOptions = {
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

const DateFormat = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },  
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  declarations: [
    ContractListComponent,
    ContractDetailListComponent,
    // ContractDetailComponent,
    ContractFormEntryComponent,
    //MyDateFormatPipe
    //HeaderComponent,
    //SidenavListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  
    //FlexLayoutModule,
    MaterialModule,

    //MatTabsModule,
    //MatToolbarModule,
    //MatListModule,
    //MatMenuModule,
    //MatSidenavModule,
    //MatCardModule,
    //MatSortModule,
    //MatTableModule,
    //MatButtonModule,
    //MatFormFieldModule,
    //MatInputModule,
    //MatSelectModule,
    //MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatPaginatorModule,
    //MatProgressSpinnerModule,
    //MatIconModule,
    //AppModule,
  ],
  exports: [
    //MaterialModule2,

    //BrowserModule,

    // ContractListComponent,
    //ContractDetailListComponent,
    //ContractFormEntryComponent,

    //MatTabsModule,
    //MatToolbarModule,
    //MatSidenavModule
  ],
  // both the NativeDateAdapter and MomentDateAdapter allow ISO 8601 strings to be passed to the datepicker and automatically converted to the proper object type  
  providers: [
    MatDatepickerModule,
    //{provide: 'BASE_API_URL', useValue: environment.apiUrl},
    
    // {provide: LOCALE_ID, useValue: 'en'},

    {provide: APP_BASE_HREF, useFactory: getBaseHref, deps: [PlatformLocation]},

    {provide: LOCALE_ID, deps: [LocaleService],
      useFactory: (localeService: { locale: string; }) => localeService.locale},

    {provide: MAT_DATE_FORMATS, deps: [LocaleService],
      useFactory: (localeService: { dateFormat: string; }) => localeService.dateFormat},

    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // {provide: MAT_DATE_FORMATS, useValue: DateFormat},

    // {provide: MAT_DATE_LOCALE, useValue: 'en-US'},
    // {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},

    // {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    
    {provide: DateAdapter, useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig},

    // {provide: DateAdapter, useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },
    // ComponentCommunicationService,
    LocaleService,
    //BaseApiUrlService,
    ContractService,
    ContractResolver,
    ContractDataSource
  ],
})
export class ContractModule { }
