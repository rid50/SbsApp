import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractResolver } from './services/contract.resolver';
import { ContractComponent } from './contract/contract.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { MaterialDrawerComponent } from './material-drawer/material-drawer.component'

const routes: Routes = [
  { path: '', redirectTo: '/drawer', pathMatch: 'full' },  
  //{ path: '', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'drawer', component: MaterialDrawerComponent },  
  { path: 'contracts', component: ContractComponent },
  { path: 'contracts/:id', component: ContractDetailComponent, resolve: { contract: ContractResolver} },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
