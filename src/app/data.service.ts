import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthenticationService} from './authentication.service';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { element } from 'protractor';

interface AccountSymmary{
    uid: string;
    referral_link : string;
    joining_date : number;
    name: string;
    first_investment_made : boolean;

    t_wallet_balance : number;

}



@Injectable()
export class DataService {
  public current_user : "gopal";


  
  constructor(

    private afAuth: AngularFireAuth,private router: Router,
  private afs : AngularFirestore,
  private authservice :  AuthenticationService
  ) {
    

  }

  /*********** ACCOUNT SUMMARY*************/
  get_accountsummary(uid){

    
 
    console.log('fetching account summary!');
    
    

  }


  /******************** */

/***********GET INVESTMENTS*************/
  
 get_investments(uid){

 
 }
 /******************* */




/*******************/
 get_referrals(uid){


 }
/************GET TRANSACTIONS***********/
get_transactions(uid){

}
/**************** */

/***********WALLET TRANSFER*************** */
transfer_to_wallet(amount,to_wallet){

}
/********************* */


/*******************WITHDRAWAL REQUEST******************** */

withdrawal_request(amount,uid){

}
/********************************/

/***********GET PROFILE INFO*********/
get_profile_info(){

}
/************************ */
}


