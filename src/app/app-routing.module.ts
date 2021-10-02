import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractResolver } from './services/contract.resolver';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailListComponent } from './contract-detail-list/contract-detail-list.component';
import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';
import { MostWantedComponent } from './most-wanted/most-wanted.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'contract', component: ContractListComponent },
  { path: 'pending-transaction', component: PendingTransactionComponent },
  { path: 'most-wanted', component: MostWantedComponent },
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
