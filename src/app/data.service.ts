import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { element } from 'protractor';
import { scan } from 'rxjs/operator/scan';
import { FirebaseApp } from 'angularfire2';



interface InvestmentProcessData {
  payment_method: string;
  investment_amount: number;
  investment_scheme: string;
}
//////////////////////////////////

interface ProfileData {

  displayname: string;
  uid: string;
  email: string;
  profileupdated: boolean;
  referralid: string;
  dob: any;
  address: string;
  city: string;
  country: string;
  mobile: string;
  dateofjoining: any;
  gender: string;

}
interface AccountSymmaryData {
  uid: string;
  referralid: string;
  joiningdate: any;
  name: string;
  referal_link: string;
  walletbalance: number;
  walletpendingbalance: number;
  totalspotearnings: number;
  totalreferralearnings: number;
  totalinvestment: number;
}
////////////////////////////////////

interface Investment {
  timestamp: number;
  amount: number;
  uid: string;
  scheme: string;
  referralid: string;
  interest_rate: number;
  status: string;

}
///////////////////////////////////

interface Transaction {
  timestamp: number;
  uid: string;
  type: string;
  status: string;
  from: string;
  to: string;
  amount: number;
  debit: number;
  credit: number;
  narration: string;


}

///////////////////////////////////
@Injectable()
export class DataService {
  public current_user = "gopal";
  public NewInvestmentProcessData: InvestmentProcessData;

  public currentUserSummary;


  constructor(

    private afAuth: AngularFireAuth, private router: Router,
    private afs: AngularFirestore,
    private authservice: AuthenticationService,
    private f: FirebaseApp
  ) {
    this.NewInvestmentProcessData = {
      payment_method: '',
      investment_amount: 0,
      investment_scheme: ''

    };
  }

  /*********** ACCOUNT SUMMARY*************/
  get_accountsummary(uid) {



    console.log('fetching account summary!');



  }


  /******************** */

  /***********GET INVESTMENTS*************/

  get_investments(uid) {


  }
  /******************* */




  /*******************/
  get_referrals(uid) {


  }
  /************GET TRANSACTIONS***********/
  get_transactions(uid) {

  }
  /**************** */

  /***********WALLET TRANSFER*************** */
  transfer_to_wallet(amount, to_wallet) {

  }
  /********************* */


  /*******************WITHDRAWAL REQUEST******************** */

  withdrawal_request(amount, uid) {

  }
  /********************************/

  /***********GET PROFILE INFO*********/
  get_profile_info() {

  }
  /************************ */





  ////////////CREATE INVESTMENT //////////////////////////////////

  initalize() {

    this.authservice.userAccountSummary.subscribe(
      (summarydata) => {

        if (summarydata) {
          this.currentUserSummary = summarydata;
          ///////////////////////
        }
      }
    );
  }
  create_investment(scheme, amount) {
    var summary;


    ///////////////////// Investment Data 
    var investment: Investment = {
      uid: this.currentUserSummary.uid,
      referralid: this.currentUserSummary.referralid,
      scheme: scheme,
      amount: amount,
      interest_rate: 9,
      timestamp: Date.now(),
      status: 'active'
    }
    ////////////////////////////////////// Transaction Data

    var transaction_user : Transaction= {
      timestamp: Date.now(),
      uid: this.currentUserSummary.uid,
      type: 'DI',
      status: 'awaiting confirmation',
      from: '',
      to: '',
      amount: amount,
      debit: 0,
      credit: 0,
      narration: "Investment - SCO1 - Bitcoin Payment "


    }
    var transaction_referral : Transaction = {
      timestamp: Date.now(),
      uid: this.currentUserSummary.referralid,
      type: 'CSC',
      status: 'success',
      from: '',
      to: '',
      amount: amount,
      debit: 0,
      credit: amount*0.05,
      narration: "Credit referral comission 5 perc.  "
    }



    var Investment: AngularFirestoreCollection<Investment>;
    var ref = this.afs.collection('/investments');
    var reftrans = this.afs.collection('/transactions');

    console.log(ref);
    ref.add(investment).then((v) => {

      const usersummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.uid}`); //get the refrence for updating initial user data
      const referralsummaryref : AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.referralid}`);
      
     
     
      usersummaryref.update({
      
        totalinvestment: this.currentUserSummary.totalinvestment + amount
      
      }).then(
        (v) => {
          console.log("success");

          // reftrans.add({
          // });
        }

        );



    });

    //////












  }
  send_spotcomission() {

  }
  ////////////////////////////////////////////



}


