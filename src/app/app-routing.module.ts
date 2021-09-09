import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractResolver } from './services/contract.resolver';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailListComponent } from './contract-detail-list/contract-detail-list.component';
import { MaterialDrawerComponent } from './material-drawer/material-drawer.component'
import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'contract', component: ContractListComponent },
  { path: 'pending-transaction', component: PendingTransactionComponent },
  { path: '', redirectTo: '/contract', pathMatch: 'full' }, 
  //{ path: 'contracts', component: ContractListComponent },
  { path: 'contracts/:id', component: ContractDetailListComponent, resolve: { contract: ContractResolver} },
  // { path: '**', component: ContractListComponent }
  { path: '**', redirectTo: '/contract' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
