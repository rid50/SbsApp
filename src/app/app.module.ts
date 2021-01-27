import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from '../environments/environment';
import { ContractComponent } from './contract/contract.component';
import { ContractService } from './services/contract.service';
import { ContractResolver } from './services/contract.resolver';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';

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
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: 'BASE_API_URL', useValue: environment.apiUrl},
    ContractService,
    ContractResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
