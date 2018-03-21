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
import { SignupComponent } from './signup/signup.component';
import { InvestmentschemesComponent } from './investmentschemes/investmentschemes.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { PaywithbitcoinComponent } from './paywithbitcoin/paywithbitcoin.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { WallettransferotpComponent } from './wallettransferotp/wallettransferotp.component';
import { InvestfromwalletComponent } from './investfromwallet/investfromwallet.component';
import { AdminwithdrawalComponent } from './adminwithdrawal/adminwithdrawal.component';
import { UploadproofComponent } from './uploadproof/uploadproof.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

import { PlanComponent } from './plan/plan.component';

// path: '', redirectTo: '/heroes', pathMatch: 'full'
const routes: Routes = [
  {path : '', redirectTo: '/login', pathMatch: 'full' },
  { path : 'home',component : HomeComponent },
  {path: 'login', component :LoginComponent },
{path :'signup/:id', component: SignupComponent},
{path :'signup', component: SignupComponent},
{path : 'updateprofile' ,  component :UpdateprofileComponent },
 {path: 'dashboard', component :DashboardComponent,
children :[
  {path : '', redirectTo: '/dashboard/accountsummary', pathMatch: 'full' },

  { path : 'accountsummary' , component : AccountSummaryComponent },
  { path : 'investments' , component : InvestmentsComponent},
  { path: 'referrals',component :ReferralsComponent },
  {  path: 'transactions', component : TransactionsComponent },
   {  path: 'wallettransfer', component : WalletTransferComponent },
   {  path: 'withdraw', component : WithdrawComponent },
   {  path: 'profile', component : ProfileComponent },
   {  path: 'investmentschemes', component : InvestmentschemesComponent },
   {path : 'paymentmethod' , component : PaymentmethodComponent},
   {path : 'paywithbitcoin', component : PaywithbitcoinComponent},
   {path: 'wallettransferotp' , component : WallettransferotpComponent},
   {path: 'investfromwallet' , component : InvestfromwalletComponent},
   {path: 'adminwithdraw' , component : AdminwithdrawalComponent},
   {path:'uploadproof',component : UploadproofComponent},
{path : 'editprofile' , component : EditprofileComponent},
{path : 'plan' , component : PlanComponent}

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
