import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractResolver } from './services/contract.resolver';
import { ContractComponent } from './contract/contract.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'contracts', component: ContractComponent },
  { path: 'contracts/:id', component: ContractDetailComponent, resolve: { contract: ContractResolver} },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
