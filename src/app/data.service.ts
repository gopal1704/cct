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



interface InvestmentProcessData {
  payment_method: string;
  investment_amount: number;
  investment_scheme: string;

}
//////////////////////////////////

interface ProfileData{

  displayname : string;
  uid : string;
  email : string;
  profileupdated :boolean;
  referralid : string;
  dob : number;
  address : string;
  city: string;
  country : string;
  mobile : string;
  dateofjoining : number;
  gender : string;

}
interface AccountSymmaryData{
referralid : string;
joiningdate : number;
name: string ;
referal_link :string;
walletbalance : number;
walletpendingbalance : number;
totalspotearnings : number;
totalreferralearnings : number;
totalinvestment:number;

}
////////////////////////////////////

interface Investment{
  timestamp : number;
  amount : number;
  uid : string;
  scheme : string;
  referralid : string;
  

}
///////////////////////////////////

interface Transaction{

}

///////////////////////////////////
@Injectable()
export class DataService {
  public current_user = "gopal";
  public NewInvestmentProcessData: InvestmentProcessData ;




  constructor(
  
    private afAuth: AngularFireAuth, private router: Router,
    private afs: AngularFirestore,
    private authservice: AuthenticationService
  ) {
this.NewInvestmentProcessData ={
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
}


