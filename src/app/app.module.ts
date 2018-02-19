import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {AuthenticationService} from './authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { InvestmentsComponent } from './investments/investments.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WalletTransferComponent } from './wallet-transfer/wallet-transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

var config = {
  apiKey: "AIzaSyDZctYRBSTRhuIjDsPP-j7ide7LrlHjf4o",
  authDomain: "investment-3327a.firebaseapp.com",
  databaseURL: "https://investment-3327a.firebaseio.com",
  projectId: "investment-3327a",
  storageBucket: "investment-3327a.appspot.com",
  messagingSenderId: "242794674827"
};

@NgModule({
  declarations: [
    AppComponent,
    AccountSummaryComponent,
    InvestmentsComponent,
    ReferralsComponent,
    TransactionsComponent,
    WalletTransferComponent,
    WithdrawComponent,
    ProfileComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
  export class AppModule { }
