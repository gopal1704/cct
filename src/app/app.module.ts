import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {AuthenticationService} from './authentication.service';
import { DataService } from './data.service';
import { LoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule, AngularFireStorage} from 'angularfire2/storage';
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
import { SignupComponent } from './signup/signup.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { InvestmentschemesComponent } from './investmentschemes/investmentschemes.component';
import { PaywithbitcoinComponent } from './paywithbitcoin/paywithbitcoin.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import {HttpClientModule} from '@angular/common/http';
import { WallettransferotpComponent } from './wallettransferotp/wallettransferotp.component';
import { InvestfromwalletComponent } from './investfromwallet/investfromwallet.component';
import { AdminwithdrawalComponent } from './adminwithdrawal/adminwithdrawal.component';
import { UploadproofComponent } from './uploadproof/uploadproof.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { PlanComponent } from './plan/plan.component';
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
    HomeComponent,
    SignupComponent,
    UpdateprofileComponent,
    InvestmentschemesComponent,
    PaywithbitcoinComponent,
    PaymentmethodComponent,
    WallettransferotpComponent,
    InvestfromwalletComponent,
    AdminwithdrawalComponent,
    UploadproofComponent,
    EditprofileComponent,
    PlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,DataService],
  bootstrap: [AppComponent]
})
  export class AppModule { }
