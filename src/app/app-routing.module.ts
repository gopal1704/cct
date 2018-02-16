import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { InvestmentsComponent } from './investments/investments.component';

const routes: Routes = [
{ path : 'accountsummary' , component : AccountSummaryComponent },
{ path : 'investments' , component : InvestmentsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
