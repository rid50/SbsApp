import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractResolver } from './services/contract.resolver';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailListComponent } from './contract-detail-list/contract-detail-list.component';
import { MaterialDrawerComponent } from './material-drawer/material-drawer.component'

const routes: Routes = [
  { path: '', redirectTo: '/drawer', pathMatch: 'full' },  
  //{ path: '', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'drawer', component: MaterialDrawerComponent },  
  //{ path: 'contracts', component: ContractListComponent },
  { path: 'contracts/:id', component: ContractDetailListComponent, resolve: { contract: ContractResolver} },
  { path: '**', component: MaterialDrawerComponent }
  //{ path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
