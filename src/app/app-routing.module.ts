import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { InvestmentsComponent } from './investments/investments.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WalletTransferComponent } from './wallet-transfer/wallet-transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// path: '', redirectTo: '/heroes', pathMatch: 'full'
const routes: Routes = [
  {path : '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'home',component : HomeComponent },
  {path: 'login', component :LoginComponent },

 {path: 'dashboard', component :DashboardComponent,
children :[
  { path : 'accountsummary' , component : AccountSummaryComponent },
  { path : 'investments' , component : InvestmentsComponent},
  { path: 'referrals',component :ReferralsComponent },
  {  path: 'transactions', component : TransactionsComponent },
   {  path: 'wallettransfer', component : WalletTransferComponent },
   {  path: 'withdraw', component : WithdrawComponent },
   {  path: 'profile', component : ProfileComponent }

]

}
,

//  {},
//  {},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
