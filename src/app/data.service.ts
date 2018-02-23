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
timestamp : 'a'

}

///////////////////////////////////
@Injectable()
export class DataService {
  public current_user = "gopal";
  public NewInvestmentProcessData: InvestmentProcessData;




  constructor(

    private afAuth: AngularFireAuth, private router: Router,
    private afs: AngularFirestore,
    private authservice: AuthenticationService
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


  create_investment(scheme, amount) {

  this.authservice.userAccountSummary.subscribe(
    (summary)=>{
      
     if(summary){
      var investment: Investment ={
        uid : summary.uid,
        referralid : summary.referralid,
        scheme : scheme,
        amount : amount,
        interest_rate : 9,
        timestamp :Date.now(),
        status : 'active'
        }
var Investment : AngularFirestoreCollection<Investment> ;
var ref = this.afs.collection('/investments');
var reftrans = this.afs.collection('/transactions');
console.log(ref);
ref.add(investment).then((v)=>{

  const usersummaryref :AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${summary.uid}`); //get the refrence for updating initial user data
  const getbal = usersummaryref.snapshotChanges();
  usersummaryref.update({
    totalinvestment : summary.totalinvestment+amount
  }).then(
(v)=>{

    reftrans.add({

    });
}

  );

 

});

}




     console.log(summary);
    }
  );

   

  }
  send_spotcomission() {

  }
  ////////////////////////////////////////////



}


