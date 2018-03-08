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
import 'rxjs/add/operator/take'
import { element } from 'protractor';
import { scan } from 'rxjs/operator/scan';
import { FirebaseApp } from 'angularfire2';
import { take } from 'rxjs/operator/take';



interface InvestmentProcessData {
  payment_method: string;
  investment_amount: number;
  investment_scheme: string;
}
//////////////////////////////////

interface ProfileData {
  title : string;
  isdcode : string;
  displayname: string;
  lastname: string;
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
  duration : number

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
  public WalletTransferData : any;
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

    this.WalletTransferData ={
      
    }
  }

  /*********** ACCOUNT SUMMARY*************/
  get_accountsummary(uid) {



    console.log('fetching account summary!');



  }


  /*********************/

  /***********GET INVESTMENTS*************/

  get_investments(uid) {

    var investmentscollection = this.afs.collection('investments', ref => {
      return ref.where('uid', '==', uid);
    });
    return investmentscollection.valueChanges();
  }
  /******************* */




  /*******************/
  get_referrals(uid) {

    var accountsummarycollection = this.afs.collection('accountsummary', ref => {
      return ref.where('referralid', '==', uid);
    });
    return accountsummarycollection.valueChanges();

   




  }
  /************GET TRANSACTIONS***********/
  get_transactions(uid) {

    var transactionscollection = this.afs.collection('transactions', ref => {
      return ref.where('uid', '==', uid).orderBy('timestamp','desc');
    });
    return transactionscollection.valueChanges();
  }
  /**************** */

  /***********WALLET TRANSFER*************** */
  transfer_to_wallet(amount, to_wallet) {
    
    var reftrans = this.afs.collection('/transactions');
    const toaccountsummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${to_wallet}`);
    const fromaccountsummaryref :AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.uid}`);

    var transaction_to: Transaction = {
      timestamp: Date.now(),
      uid: to_wallet,
      type: 'CWT',
      status: 'success',
      from: this.currentUserSummary.uid,
      to: to_wallet,
      amount: 0,
      debit: 0,
      credit: amount,
      narration: `Credit Wallet Transfer  from : ${this.currentUserSummary.name} ${this.currentUserSummary.uid}`
    };         

    var transaction_from: Transaction = {
      timestamp: Date.now(),
      uid: this.currentUserSummary.uid,
      type: 'CWT',
      status: 'success',
      from: this.currentUserSummary.uid,
      to: to_wallet,
      amount: 0,
      debit: amount,
      credit: 0,
      narration: `Debit Wallet Transfer to : ${to_wallet}`
    };         

    reftrans.add(transaction_from).then(()=>{
      reftrans.add(transaction_to).then(()=>{
        
//UPDATE SUMMARY DATA
this.afs.doc<AccountSymmaryData>(`accountsummary/${to_wallet}`).valueChanges().take(1).subscribe((v) => {

  toaccountsummaryref.update({
    walletbalance: v.walletbalance + parseInt(amount)
  }).then(()=>{

    this.afs.doc<AccountSymmaryData>(`accountsummary/${this.currentUserSummary.uid}`).valueChanges().take(1).subscribe((v)=>{

fromaccountsummaryref.update({
      walletbalance: v.walletbalance - parseInt(amount)

    });
    });

    // fromaccountsummaryref.update({
    //   walletbalance: v.walletbalance - amount

    // });





  });

});




      });
    });














  }
  /********************* */


  /*******************WITHDRAWAL REQUEST******************** */

  withdrawal_request(amount,accounttype,accountdetails) {
    var ref = this.afs.collection('/withdrawalrequest');
    ref.add({
      uid : this.currentUserSummary.uid,
      amount : amount,
      accounttype: accounttype,
      accountdetails : accountdetails
    })
    ;




  }
  /********************************/

  /***********GET PROFILE INFO*********/
  get_profile_info() {
    var itemdoc = this.afs.doc<any>(`users/${this.currentUserSummary.uid}`);
    return itemdoc;

    
    }
  /************************ */


  /********************send monthly referral comission  */

  send_monthly_bonus() {
    //0dSTEjOfLwNmGh8OOaIT

    var transaction_referral: Transaction = {
      timestamp: Date.now(),
      uid: this.currentUserSummary.referralid,
      type: 'CSC',
      status: 'success',
      from: this.currentUserSummary.uid,
      to: this.currentUserSummary.referralid,
      amount: 0,
      debit: 0,
      credit: 1000 * 0.03,
      narration: "Credit 3 percent monthly returns  "
    };
    var reftrans = this.afs.collection('/transactions');
    const referralsummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.referralid}`);


    reftrans.add(transaction_referral).then((a) => {

      reftrans.add(transaction_referral).then((v) => {


        this.afs.doc<AccountSymmaryData>(`accountsummary/${this.currentUserSummary.referralid}`).valueChanges().take(1).subscribe((v) => {
          var walbal = v.walletpendingbalance + 1000 * 0.05;

          referralsummaryref.update({
            walletpendingbalance: v.walletpendingbalance + 1000 * 0.03,
            totalreferralearnings : v.totalreferralearnings+ 1000 * 0.03
          });

        });


      });

    });



  }


  send_maturity_credit() {

  }
  /************* */

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
  create_investment(scheme: string, amount: number, btc: number) {
    var summary;


    ///////////////////// Investment Data 
    var investment: Investment = {
      uid: this.currentUserSummary.uid,
      referralid: this.currentUserSummary.referralid,
      scheme: scheme,
      amount: amount,
      interest_rate: 9,
      timestamp: Date.now(),
      status: 'active',
      duration :90
    }
    ////////////////////////////////////// Transaction Data

    var transaction_user: Transaction = {
      timestamp: Date.now(),
      uid: this.currentUserSummary.uid,
      type: 'DI',
      status: 'awaiting confirmation',
      from: '',
      to: '',
      amount: amount,
      debit: 0,
      credit: 0,
      narration: `Investment - SCO1 - Bitcoin Payment Amount : ${amount}  BTC : ${btc}`
      

    }
    var transaction_referral: Transaction = {
      timestamp: Date.now(),
      uid: this.currentUserSummary.referralid,
      type: 'CSC',
      status: 'success',
      from: '',
      to: '',
      amount: 0,
      debit: 0,
      credit: amount * 0.05,
      narration: "Credit referral comission 5 perc.  "
    }



    var Investment: AngularFirestoreCollection<Investment>;
    var ref = this.afs.collection('/investments');
    var reftrans = this.afs.collection('/transactions');

    console.log(ref);
    ref.add(investment).then((v) => {

      const usersummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.uid}`); //get the refrence for updating initial user data
      const referralsummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.referralid}`);



      usersummaryref.update({

        totalinvestment: this.currentUserSummary.totalinvestment + amount

      }).then(
        (v) => {
          console.log("success");

          reftrans.add(transaction_user).then((a) => {
            reftrans.add(transaction_referral).then((v) => {
              this.afs.doc<AccountSymmaryData>(`accountsummary/${this.currentUserSummary.referralid}`).valueChanges().take(1).subscribe((v) => {
                var pendingwalbal = v.walletpendingbalance + amount * 0.05;
                var _totalstopearnings = v.totalspotearnings + amount *0.05;
                referralsummaryref.update({
                  walletpendingbalance: pendingwalbal,
                  totalspotearnings : _totalstopearnings
                });

              });


            });

          }
          );


        }

        );



    });

    //////












  }




  ////////////////////////////////from wallet////////////


  create_investmentwallet(scheme: string, amount: number, btc: number) {
    var summary;


    ///////////////////// Investment Data 
    var investment: Investment = {
      uid: this.currentUserSummary.uid,
      referralid: this.currentUserSummary.referralid,
      scheme: scheme,
      amount: amount,
      interest_rate: 24,
      timestamp: Date.now(),
      status: 'active',
      duration :90
    }
    ////////////////////////////////////// Transaction Data

    var transaction_user: Transaction = {
      timestamp: Date.now(),
      uid: this.currentUserSummary.uid,
      type: 'DI',
      status: 'success',
      from: '',
      to: '',
      amount: amount,
      debit: 0,
      credit: 0,
      narration: `Investment - SCO1 - Wallet Payment Amount : ${amount}`
      

    }
    var transaction_referral: Transaction = {
      timestamp: Date.now(),
      uid: this.currentUserSummary.referralid,
      type: 'CSC',
      status: 'success',
      from: '',
      to: '',
      amount: 0,
      debit: 0,
      credit: amount * 0.05,
      narration: "Credit referral comission 5 perc.  "
    }



    var Investment: AngularFirestoreCollection<Investment>;
    var ref = this.afs.collection('/investments');
    var reftrans = this.afs.collection('/transactions');

    console.log(ref);
    ref.add(investment).then((v) => {

      const usersummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.uid}`); //get the refrence for updating initial user data
      const referralsummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${this.currentUserSummary.referralid}`);



      usersummaryref.update({

        totalinvestment: this.currentUserSummary.totalinvestment + amount,
        walletbalance : this.currentUserSummary.walletbalance - amount
      }).then(
        (v) => {
          console.log("success");

          reftrans.add(transaction_user).then((a) => {
            reftrans.add(transaction_referral).then((v) => {
              this.afs.doc<AccountSymmaryData>(`accountsummary/${this.currentUserSummary.referralid}`).valueChanges().take(1).subscribe((v) => {
                var pendingwalbal = v.walletpendingbalance + amount * 0.05;
                var _totalstopearnings = v.totalspotearnings + amount *0.05;
                referralsummaryref.update({
                  walletpendingbalance: pendingwalbal,
                  totalspotearnings : _totalstopearnings
                });

              });


            });

          }
          );


        }

        );



    });

    //////












  }

  ////////////////////
  send_spotcomission() {

  }
  ////////////////////////////////////////////



}


